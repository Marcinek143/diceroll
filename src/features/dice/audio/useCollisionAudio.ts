"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TRAY } from "../physics/config";

const KEY = "diceroll.sound.v1";
const MASTER_VOLUME = .68;
const MIN_IMPACT_FORCE = 14;
const IMPACT_SPACING_MS = 55;
const SAMPLE_PATHS = Array.from({ length: 6 }, (_, index) => `/audio/dice-impact-${index + 1}.wav`);

export function useCollisionAudio() {
  const [enabled, setEnabled] = useState(true);
  const context = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const samples = useRef<AudioBuffer[]>([]);
  const loading = useRef<Promise<void> | null>(null);
  const lastImpact = useRef(0);
  const lastSample = useRef(-1);
  const enabledRef = useRef(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "off") {
        setEnabled(false);
        enabledRef.current = false;
      }
    } catch { /* Optional preference. */ }

    if (typeof AudioContext === "undefined") return;
    let disposed = false;
    const audio = new AudioContext();
    const gain = audio.createGain();
    gain.gain.value = MASTER_VOLUME;
    gain.connect(audio.destination);
    context.current = audio;
    master.current = gain;
    loading.current = Promise.all(SAMPLE_PATHS.map(async (path) => {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Could not load ${path}`);
      return audio.decodeAudioData(await response.arrayBuffer());
    })).then((decoded) => {
      if (!disposed) samples.current = decoded;
    }).catch((error) => {
      if (!disposed) console.warn("DiceRoll audio samples could not load", error);
    });

    return () => {
      disposed = true;
      context.current = null;
      master.current = null;
      samples.current = [];
      loading.current = null;
      void audio.close();
    };
  }, []);

  const prepare = useCallback(async () => {
    if (!enabledRef.current) return;
    const audio = context.current;
    if (!audio) return;
    try {
      if (audio.state === "suspended") await audio.resume();
      await loading.current;
    } catch { /* Dice still roll if audio is unavailable. */ }
  }, []);

  const impact = useCallback((force: number, x: number, motion: number) => {
    if (!enabledRef.current || force < MIN_IMPACT_FORCE || motion < .18) return;
    const audio = context.current;
    const output = master.current;
    const available = samples.current;
    if (!audio || !output || audio.state !== "running" || available.length === 0) return;

    const now = performance.now();
    if (now - lastImpact.current < IMPACT_SPACING_MS) return;
    lastImpact.current = now;

    // Each sound is a short recording of a real die hitting a table. Its
    // loudness and position follow this contact from the physical simulation.
    const choice = Math.floor(Math.random() * (available.length - (lastSample.current < 0 ? 0 : 1)));
    const index = lastSample.current < 0 ? choice : choice >= lastSample.current ? choice + 1 : choice;
    lastSample.current = index;
    const source = audio.createBufferSource();
    source.buffer = available[index];
    source.playbackRate.value = .93 + Math.random() * .11 + Math.min(force / 120, 1) * .04;
    const volume = .12 + .28 * Math.min(1, Math.sqrt((force - MIN_IMPACT_FORCE) / 120));
    const gain = audio.createGain();
    gain.gain.value = volume;
    const pan = audio.createStereoPanner();
    pan.pan.value = Math.max(-.35, Math.min(.35, x / TRAY.halfWidth * .35));
    source.connect(gain).connect(pan).connect(output);
    source.start();
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try { localStorage.setItem(KEY, next ? "on" : "off"); } catch { /* Optional preference. */ }
    if (master.current && context.current) master.current.gain.setValueAtTime(next ? MASTER_VOLUME : 0, context.current.currentTime);
    if (next) void prepare().then(() => impact(55, 0, 1));
  }, [impact, prepare]);

  return { enabled, toggle, prepare, impact };
}
