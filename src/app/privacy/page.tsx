import type { Metadata } from "next";
import Link from "next/link";
import { Dices } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | DiceRoll",
  description: "How DiceRoll handles local preferences, roll history, website requests, and advertising data.",
  alternates: { canonical: "https://diceroll.world/privacy" },
};

export default function PrivacyPolicyPage() {
  return <>
    <header className="border-b border-[var(--line)] bg-header/90">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight hover:text-accent-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-panel-raised text-accent-text"><Dices size={19}/></span>
          DiceRoll
        </Link>
        <Link href="/" className="text-sm text-subtext hover:text-accent-text">Back to dice roller</Link>
      </div>
    </header>
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-8 sm:pt-16">
      <p className="eyebrow mb-3">DiceRoll</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-subtext">Last updated: 6 October 2026</p>

      <div className="surface mt-8 space-y-9 rounded-2xl p-6 text-sm leading-7 text-subtext sm:p-9 sm:text-base">
        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">About this policy</h2>
          <p>DiceRoll is an online dice roller available at <a className="text-accent-text underline underline-offset-2" href="https://diceroll.world">diceroll.world</a>. This policy explains what information the site stores or processes when you use it and how advertising may affect that information.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">Information stored in your browser</h2>
          <p>DiceRoll stores the following information in your browser&apos;s local storage so the app works across visits:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Your last 20 dice rolls, including each roll&apos;s values, total, number of dice, and time.</li>
            <li>Your light, dark, or system theme preference.</li>
            <li>Whether you turned dice sounds on or off.</li>
          </ul>
          <p className="mt-3">The dice app does not send this roll history or these preferences to DiceRoll&apos;s servers. You can remove them by clearing this site&apos;s data in your browser. DiceRoll does not require an account or ask for your name to roll dice.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">Website delivery and security</h2>
          <p>When you visit the site, the hosting service may process technical information such as your IP address, browser and device details, requested pages, and access times to deliver the site, maintain security, and diagnose problems. We use this information for our legitimate interests in operating and protecting DiceRoll. This information is handled under the hosting provider&apos;s applicable retention and security practices.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">Advertising and cookies</h2>
          <p>DiceRoll may display ads through Google AdSense. When ad serving is enabled, third-party vendors, including Google, may use cookies and similar technologies to serve ads based on your visits to DiceRoll and other websites. Google&apos;s advertising cookies enable Google and its partners to show ads based on those visits, measure ad performance, and limit repeated ads. Other ad technology partners may also use cookies when their ads are served.</p>
          <p className="mt-3">When advertising is enabled, a consent message will let visitors in applicable regions accept, decline, or manage advertising choices and review participating ad partners. You can also control personalized advertising in <a className="text-accent-text underline underline-offset-2" href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google&apos;s My Ad Center</a> and learn about choices for other participating vendors at <a className="text-accent-text underline underline-offset-2" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>. See <a className="text-accent-text underline underline-offset-2" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s advertising privacy information</a> for details about Google&apos;s use of data.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">Your choices and rights</h2>
          <p>You can clear locally stored roll history and preferences through your browser settings. When advertising consent controls are active, use the consent message to make your advertising choices. Where consent is required for advertising cookies or personalized ads, you can decline or withdraw it.</p>
          <p className="mt-3">Depending on applicable law, you may ask to access, correct, delete, or restrict personal data, or object to certain processing. You may also have the right to complain to your local data protection authority. Contact us using the details below to make a privacy request.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">Contact</h2>
          <p>For privacy questions or data requests, contact the DiceRoll publisher at <a className="text-accent-text underline underline-offset-2" href="mailto:policy@diceroll.world">policy@diceroll.world</a>.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-copy">Changes to this policy</h2>
          <p>We may update this policy when site features, advertising services, or privacy practices change. The last-updated date above shows when this page was revised.</p>
        </section>
      </div>
      <div className="mt-8 text-sm text-subtext"><Link href="/" className="text-accent-text underline underline-offset-2">Return to DiceRoll</Link></div>
    </main>
  </>;
}
