"use client";

import dynamic from "next/dynamic";
import { Dices } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { useCollisionAudio } from "../audio/useCollisionAudio";
import { canStartRoll, makeRollRecord, type RollPhase, type RollRecord } from "../domain/roll";
import type { DieValue } from "../domain/faces";
import { createThrowPlan, type ThrowPlan } from "../physics/throw";
import { loadHistory, prependHistory, saveHistory } from "../storage/history";
import { HistoryDrawer } from "./HistoryDrawer";

const TrayScene = dynamic(() => import("../scene/TrayScene").then((module) => module.TrayScene), { ssr: false, loading: () => <div className="h-full w-full"/> });

export function DiceRoller() {
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState<RollPhase>("READY");
  const [plan, setPlan] = useState<ThrowPlan | null>(null);
  const [result, setResult] = useState<RollRecord | null>(null);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const planNumber = useRef(0);
  const committed = useRef<number | null>(null);
  const currentPlan = useRef<ThrowPlan | null>(null);
  const currentPhase = useRef<RollPhase>("READY");
  const historyRef = useRef<RollRecord[]>([]);
  const audio = useCollisionAudio();

  useEffect(() => { const loaded = loadHistory(); historyRef.current = loaded; setHistory(loaded); }, []);

  const start = useCallback(() => {
    if (!canStartRoll(currentPhase.current)) return;
    audio.prepare();
    const next = createThrowPlan(++planNumber.current, count);
    currentPlan.current = next;
    committed.current = null;
    currentPhase.current = "ROLLING";
    setPhase("ROLLING");
    setPlan(next);
  }, [audio, count]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || event.repeat || historyOpen) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("button, a, input, textarea, select, summary, [contenteditable=true]") || target.isContentEditable)) return;
      event.preventDefault();
      start();
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [historyOpen, start]);

  const handlePhase = useCallback((next: RollPhase) => {
    if (next === "SETTLING" && currentPhase.current !== "ROLLING") return;
    if (next === "UNRESOLVED" && currentPhase.current === "COMPLETE") return;
    currentPhase.current = next;
    setPhase(next);
  }, []);

  const handleComplete = useCallback((values: DieValue[]) => {
    const current = currentPlan.current;
    if (!current || committed.current === current.id || values.length !== current.dice.length) return;
    committed.current = current.id;
    const record = makeRollRecord(values);
    const updated = prependHistory(historyRef.current, record);
    historyRef.current = updated;
    saveHistory(updated);
    setHistory(updated);
    setResult(record);
    currentPhase.current = "COMPLETE";
    setPhase("COMPLETE");
  }, []);

  const chooseCount = (next: number) => {
    if (!canStartRoll(currentPhase.current)) return;
    setCount(next);
    setPlan(null);
    currentPlan.current = null;
    setResult(null);
    currentPhase.current = "READY";
    setPhase("READY");
  };

  const active = phase === "ROLLING" || phase === "SETTLING";
  return <>
    <Header soundOn={audio.enabled} onToggleSound={audio.toggle} onOpenHistory={() => setHistoryOpen(true)} historyCount={history.length}/>
    <main className="mx-auto w-full max-w-7xl px-4 pb-4 pt-6 sm:px-8 sm:pt-7">
      <div className="tray-frame"><div className="tray-rim"><div className="tray-basin"><TrayScene count={count} plan={plan} onPhase={handlePhase} onComplete={handleComplete} onImpact={audio.impact}/></div></div></div>
      <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:mt-7 lg:grid-cols-12">
        <div className="surface flex flex-col items-stretch justify-between gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:gap-6 sm:rounded-2xl sm:p-6 lg:col-span-8">
          <div className="flex min-w-0 flex-col gap-2"><span id="dice-count-label" className="font-mono text-[10px] uppercase tracking-wider text-subtext sm:text-xs">Number of Dice</span><div role="group" aria-labelledby="dice-count-label" className="inline-flex rounded-xl border border-[var(--line)] bg-well p-1">
            {[1, 2, 3, 4].map((option) => <button key={option} type="button" onClick={() => chooseCount(option)} disabled={active} aria-label={`${option} ${option === 1 ? "die" : "dice"}`} aria-pressed={count === option} className={`min-w-0 flex-1 whitespace-nowrap rounded-lg px-2.5 py-2 font-mono text-xs font-medium transition-colors sm:flex-none sm:px-4 sm:py-2.5 ${count === option ? "bg-[var(--accent-wash)] text-accent-text ring-1 ring-accent/40" : "text-subtext hover:text-copy"} disabled:opacity-50`}>{option}<span className="hidden min-[380px]:inline"> {option === 1 ? "Die" : "Dice"}</span></button>)}
          </div></div>
          <div className="flex flex-col items-center sm:items-end"><button type="button" onClick={start} disabled={active} className="roll-button flex w-full items-center justify-center gap-2 text-sm uppercase tracking-wide sm:w-56 sm:text-base"><Dices size={20}/>{active ? "Rolling…" : "Roll Dice"}</button><span className="mt-1.5 hidden text-[11px] text-muted sm:block">Press <kbd className="rounded bg-panel-raised px-1.5 py-0.5 font-mono text-[10px]">SPACE</kbd> to roll</span></div>
        </div>
        <div aria-live="polite" aria-atomic="true" className={`surface flex flex-row items-center justify-between rounded-xl p-4 transition-opacity sm:rounded-2xl sm:p-6 lg:col-span-4 lg:flex-col lg:items-start lg:justify-center ${active ? "opacity-55" : ""}`}>
          <div><span className="text-[10px] font-semibold uppercase tracking-wider text-subtext sm:text-xs">{phase === "UNRESOLVED" && result ? "Previous total" : "Total"}</span><div className="mt-1 font-mono text-xs font-medium text-accent-text sm:text-sm">{phase === "UNRESOLVED" && !result ? "No result for this throw" : result ? result.values.join(" + ") : active ? "Awaiting physical result" : "Ready to roll"}</div></div>
          <div className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl lg:mt-2.5">{result ? result.total : "—"}</div>
        </div>
      </div>
      {phase === "UNRESOLVED" && <p role="status" className="mt-3 rounded-lg border border-[var(--line)] bg-panel p-3 text-sm text-subtext">A die rested between faces, so this roll has no result. Roll again for a new physical throw.</p>}
    </main>
    <HistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} records={history}/>
  </>;
}
