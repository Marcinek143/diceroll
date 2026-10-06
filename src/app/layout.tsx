import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiceRoll — Online Dice Roller with Physical 3D Dice",
  description: "Roll one to four six-sided dice in a responsive 3D tray. Each result is read from the upward-facing side after the physical dice settle.",
  applicationName: "DiceRoll",
  robots: { index: true, follow: true },
};

const themeScript = `try{const c=localStorage.getItem('diceroll.theme.v1');document.documentElement.dataset.theme=c==='dark'||c==='light'?c:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch{document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head><body><ThemeProvider>{children}</ThemeProvider></body></html>;
}
