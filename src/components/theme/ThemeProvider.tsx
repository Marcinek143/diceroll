"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeChoice = "system" | "dark" | "light";
type ThemeContextValue = { choice: ThemeChoice; setChoice: (value: ThemeChoice) => void };
const ThemeContext = createContext<ThemeContextValue>({ choice: "system", setChoice: () => {} });
const KEY = "diceroll.theme.v1";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "dark" || stored === "light" || stored === "system") setChoice(stored);
    } catch { /* Use system preference when storage is unavailable. */ }
    finally { setLoaded(true); }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const apply = () => { document.documentElement.dataset.theme = choice === "system" ? media.matches ? "light" : "dark" : choice; };
    apply();
    media.addEventListener("change", apply);
    try { localStorage.setItem(KEY, choice); } catch { /* Theme still works for this session. */ }
    return () => media.removeEventListener("change", apply);
  }, [choice, loaded]);

  return <ThemeContext.Provider value={{ choice, setChoice }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
