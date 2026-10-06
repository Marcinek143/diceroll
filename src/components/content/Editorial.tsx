import { ChartNoAxesColumn, ChevronDown, Dices, GraduationCap, Scale, Swords, Gamepad2, ChartColumnIncreasing } from "lucide-react";

const steps = [
  { title: "Choose your dice", description: "Select between one and four standard six-sided dice using the selector bar.", detail: "1 to 4 D6" },
  { title: "Roll", description: "Press Roll Dice or use the Space key to throw the dice across the tray.", detail: "Spacebar shortcut" },
  { title: "Let them settle", description: "The dice bounce, rotate, and collide until they naturally come to rest.", detail: "Rigid body physics" },
  { title: "Read your result", description: "The upward-facing side of each die determines its value and the total.", detail: "Physical top faces" },
];

const uses = [
  { icon: Gamepad2, title: "Board Games", description: "Roll when physical dice are unavailable, lost, or missing from your game box." },
  { icon: GraduationCap, title: "Classroom Activities", description: "Explore arithmetic, probability, and statistics with visible dice rolls." },
  { icon: Scale, title: "Decision Making", description: "Use a dice roll to pick among options when your group is deadlocked." },
  { icon: Swords, title: "Tabletop Games", description: "Make quick D6 rolls for RPG sessions, miniature games, and skirmishes." },
  { icon: ChartColumnIncreasing, title: "Probability Experiments", description: "Compare repeated rolls with theoretical outcomes over time." },
];

const faqs = [
  ["Are the dice results random?", "Each roll starts with new randomized physical conditions. The result comes from the upward-facing side after each die has stopped. Like physical dice, the simulation can produce repeated values."],
  ["How is the dice result determined?", "After the dice settle, DiceRoll reads each die’s physical rotation, identifies its upward-facing side, and adds those values together."],
  ["Can I roll more than one die?", "Yes. You can roll one, two, three, or four six-sided dice together."],
  ["Can I use DiceRoll on my phone?", "Yes. The tray and controls adapt to desktop, tablet, and mobile screens."],
  ["What does D6 mean?", "D6 means a six-sided die with faces numbered one through six."],
  ["Do opposite sides of a die add up to seven?", "Yes. On a standard D6, opposite faces are 1 and 6, 2 and 5, and 3 and 4."],
];

export function Introduction() {
  return <section id="about" className="mx-auto mb-16 max-w-4xl px-4 text-center sm:mb-20 sm:px-8">
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-panel px-3 py-1 font-mono text-xs text-accent-text"><span className="h-1.5 w-1.5 rounded-full bg-accent"/>Physics-Powered Dice Engine</div>
    <h1 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Online Dice Roller</h1>
    <p className="copy-muted text-base leading-relaxed sm:text-lg">DiceRoll lets you roll one to four six-sided dice directly in your browser. Choose how many you need, press Roll Dice, and watch them tumble, collide, and settle inside the virtual tray. The upward-facing side of each physical die determines its value; DiceRoll reads those values and calculates the total.</p>
  </section>;
}

export function HowTo() {
  return <section id="how-it-works" className="mx-auto mb-16 max-w-7xl px-4 sm:mb-20 sm:px-8">
    <div className="mb-8"><span className="eyebrow">Quick Guide</span><h2 className="section-title mt-1">How to Roll Dice</h2></div>
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {steps.map((step, i) => <article key={step.title} className="soft-card flex min-h-48 flex-col justify-between rounded-xl p-5 sm:p-6">
        <div><span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-panel-raised font-mono text-sm font-bold text-accent-text">{String(i + 1).padStart(2, "0")}</span><h3 className="mb-2 text-base font-semibold">{i + 1}. {step.title}</h3><p className="copy-muted text-sm leading-relaxed">{step.description}</p></div>
        <div className="mt-4 border-t border-[var(--line)] pt-3 font-mono text-[11px] text-muted">{step.detail}</div>
      </article>)}
    </div>
  </section>;
}

export function DiceEducation() {
  const distribution = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
  return <section className="mx-auto mb-16 max-w-7xl px-4 sm:mb-20 sm:px-8">
    <div className="grid items-start gap-8 lg:grid-cols-12">
      <article className="surface rounded-2xl p-6 sm:p-7 lg:col-span-5">
        <div className="mb-3 flex items-center gap-2 text-accent-text"><Dices size={21}/><h2 className="text-xl font-bold text-copy sm:text-2xl">How a Six-Sided Die Works</h2></div>
        <p className="copy-muted mb-6 text-sm leading-relaxed sm:text-base">A standard six-sided die, or D6, has faces marked from 1 to 6. On a standard die, opposite faces add up to seven.</p>
        <p className="mb-6 rounded-xl border border-[var(--line)] bg-well p-4 text-sm font-medium text-accent-text">Opposite faces on a standard six-sided die add up to seven.</p>
        <div className="space-y-2.5">{[[1, 6], [2, 5], [3, 4]].map(([a, b]) => <div key={a} className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-well p-3">
          <span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded bg-panel-raised font-mono font-bold">{a}</span><span className="text-muted">↔</span><span className="flex h-8 w-8 items-center justify-center rounded bg-panel-raised font-mono font-bold">{b}</span></span>
          <span className="font-mono text-xs text-subtext">{a} + {b} = <strong className="text-accent-text">7</strong></span>
        </div>)}</div>
      </article>
      <article className="surface rounded-2xl p-6 sm:p-7 lg:col-span-7">
        <div className="mb-3 flex items-center gap-2 text-accent-text"><ChartNoAxesColumn size={21}/><h2 className="text-xl font-bold text-copy sm:text-2xl">Dice Probability</h2></div>
        <p className="copy-muted mb-6 text-sm leading-relaxed sm:text-base">For an ideal fair D6, each face has a <strong className="text-copy">1 in 6 chance</strong>. With two ideal dice, totals range from 2 to 12. The total 7 has the most combinations: 6 out of 36.</p>
        <div className="rounded-xl border border-[var(--line)] bg-well p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]"><span className="uppercase text-subtext">Two-Dice Outcome Distribution (2–12)</span><span className="text-accent-text">Peak: 7 (6/36)</span></div>
          <div className="grid h-40 grid-cols-11 items-end gap-1.5 border-b border-[var(--line)] pt-4 sm:gap-2" role="img" aria-label="Theoretical two-dice totals from 2 through 12 rise to a peak of 6 combinations at 7 and then fall symmetrically">
            {distribution.map((count, i) => <div key={i} className="group flex h-full min-w-0 flex-col items-center justify-end" title={`${i + 2}: ${count} of 36 combinations`}><div className="w-full rounded-t border border-[var(--accent)] bg-[var(--accent)]/60" style={{ height: `${count / 6 * 100}%`, opacity: .25 + count / 10 }}/></div>)}
          </div>
          <div className="grid grid-cols-11 gap-1.5 pt-2 text-center font-mono text-xs text-subtext sm:gap-2">{distribution.map((_, i) => <span key={i} className={i === 5 ? "font-bold text-accent-text" : ""}>{i + 2}</span>)}</div>
          <p className="mt-3 text-[11px] text-muted">Theoretical combinations for two ideal dice; actual rolls may differ.</p>
        </div>
      </article>
    </div>
  </section>;
}

export function UseCases() {
  return <section className="mx-auto mb-16 max-w-7xl px-4 sm:mb-20 sm:px-8">
    <div className="mb-8"><span className="eyebrow">Versatile Applications</span><h2 className="section-title mt-1">What Can I Use DiceRoll For?</h2></div>
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">{uses.map(({ icon: Icon, title, description }) => <article key={title} className="soft-card rounded-xl p-5">
      <span className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-panel-raised text-accent-text"><Icon size={20}/></span>
      <h3 className="mb-1.5 text-sm font-semibold">{title}</h3><p className="copy-muted text-xs leading-relaxed">{description}</p>
    </article>)}</div>
  </section>;
}

export function FAQ() {
  return <section id="faq" className="mx-auto mb-20 max-w-4xl px-4 sm:mb-24 sm:px-8">
    <div className="mb-8"><span className="eyebrow">Questions &amp; Answers</span><h2 className="section-title mt-1">Frequently Asked Questions</h2></div>
    <div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="group overflow-hidden rounded-xl border border-[var(--line)] bg-panel">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-medium sm:p-5 sm:text-base">{question}<ChevronDown size={19} className="shrink-0 text-subtext transition-transform group-open:rotate-180"/></summary>
      <p className="copy-muted border-t border-[var(--line)] px-4 pb-5 pt-3 text-sm leading-relaxed sm:px-5">{answer}</p>
    </details>)}</div>
  </section>;
}

export function Footer() {
  return <footer className="border-t border-[var(--line)] bg-header py-8 sm:pt-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-[var(--line)] pb-8 md:flex-row md:items-center">
        <div><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[var(--line)] bg-panel-raised text-accent-text"><Dices size={15}/></span><span className="text-sm font-semibold">DiceRoll</span></div><p className="mt-1 text-xs text-subtext">Roll the dice. Leave it to chance.</p></div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-subtext"><a href="#about" className="hover:text-accent-text">About</a><a href="#how-it-works" className="hover:text-accent-text">How It Works</a><a href="#faq" className="hover:text-accent-text">FAQ</a></nav>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent"/>Free online dice roller</span><span>© {new Date().getFullYear()} DiceRoll.</span></div>
    </div>
  </footer>;
}
