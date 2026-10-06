"use client";

import { Dices, History, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Header({ soundOn, onToggleSound, onOpenHistory, historyCount }: {
  soundOn: boolean; onToggleSound: () => void; onOpenHistory: () => void; historyCount: number;
}) {
  const { choice, setChoice } = useTheme();
  const themeLabel = choice === "system" ? "System theme" : choice === "dark" ? "Dark theme" : "Light theme";
  return <header className="w-full border-b border-[var(--line)] bg-header/90 backdrop-blur-xl">
    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-8">
      <a href="#top" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="DiceRoll home">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-panel-raised text-accent-text sm:h-10 sm:w-10"><Dices size={20}/></span>
        <span className="min-w-0"><span className="block text-base font-semibold tracking-tight sm:text-lg">DiceRoll</span><span className="hidden text-xs text-subtext min-[420px]:block">Roll the dice. Leave it to chance.</span></span>
      </a>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <button className="utility-button" type="button" onClick={() => setChoice(choice === "system" ? "light" : choice === "light" ? "dark" : "system")} aria-label={`${themeLabel}. Change theme`} title={`${themeLabel}. Switch theme`}>
          {choice === "dark" ? <Moon size={18}/> : <Sun size={18}/>}<span className="hidden text-xs font-medium uppercase tracking-wide lg:inline">{themeLabel}</span>
        </button>
        <button className="utility-button" type="button" onClick={onToggleSound} aria-label={soundOn ? "Mute sound" : "Enable sound"} aria-pressed={soundOn}>
          {soundOn ? <Volume2 size={18} className="text-accent-text"/> : <VolumeX size={18}/>}<span className="hidden text-xs font-medium uppercase tracking-wide sm:inline">{soundOn ? "Sound On" : "Muted"}</span>
        </button>
        <button className="utility-button" type="button" onClick={onOpenHistory} aria-label={`Open roll history, ${historyCount} rolls`}>
          <History size={18}/><span className="hidden text-xs font-medium uppercase tracking-wide sm:inline">History</span><span className="rounded-full bg-[var(--accent-wash)] px-1.5 font-mono text-[10px] text-accent-text">{historyCount}</span>
        </button>
      </div>
    </div>
  </header>;
}
