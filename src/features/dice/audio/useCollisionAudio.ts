"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "diceroll.sound.v1";

export function useCollisionAudio() {
  const [enabled, setEnabled] = useState(true);
  const context = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const lastImpact = useRef(0);
  const enabledRef = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored === "off") { setEnabled(false); enabledRef.current = false; }
    return () => { void context.current?.close(); context.current = null; };
  }, []);

  const prepare = useCallback(() => {
    if (!enabledRef.current || typeof AudioContext === "undefined") return;
    if (!context.current) {
      const audio = new AudioContext();
      const gain = audio.createGain();
      gain.gain.value = .4;
      gain.connect(audio.destination);
      context.current = audio;
      master.current = gain;
    }
    if (context.current.state === "suspended") void context.current.resume();
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try { localStorage.setItem(KEY, next ? "on" : "off"); } catch { /* Optional preference. */ }
    if (master.current && context.current) master.current.gain.setValueAtTime(next ? .4 : 0, context.current.currentTime);
    if (next) prepare();
  }, [prepare]);

  const impact = useCallback((force: number) => {
    if (!enabledRef.current || force < 8) return;
    const now = performance.now();
    if (now - lastImpact.current < 85) return;
    lastImpact.current = now;
    const audio = context.current, output = master.current;
    if (!audio || !output) return;
    const osc = audio.createOscillator();
    const envelope = audio.createGain();
    const filter = audio.createBiquadFilter();
    const volume = Math.min(.19, .025 + force * .002);
    filter.type = "lowpass";
    filter.frequency.value = 1000;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(210, audio.currentTime);
    osc.frequency.exponentialRampToValueAtTime(72, audio.currentTime + .07);
    envelope.gain.setValueAtTime(volume, audio.currentTime);
    envelope.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .09);
    osc.connect(filter).connect(envelope).connect(output);
    osc.start();
    osc.stop(audio.currentTime + .1);
  }, []);

  return { enabled, toggle, prepare, impact };
}
