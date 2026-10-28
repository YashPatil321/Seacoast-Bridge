import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Privacy",
  description: "A short, plain-language privacy note for the Seacoast Bridge site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-8 md:grid-cols-[11rem_1fr] md:gap-10">
        <p className="label text-accent md:pt-3">Privacy</p>
        <div className="max-w-[40rem] text-[1.1rem] leading-relaxed">
          <h1 className="text-4xl font-semibold">Privacy, in plain words</h1>
          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold">What this site keeps</h2>
              <p className="mt-2">
                Nothing you type. The support form doesn&apos;t save anything on this site. When you press the button, it
                opens your own email app with a note addressed to me. You decide whether to send it.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">If you send the email</h2>
              <p className="mt-2">
                I&apos;ll see your name, email and whatever you chose to include. I use it only for this proposal: to
                count support, to understand what residents and business owners need, and, if you checked the box, to
                contact you. I won&apos;t sell it or share your contact details. If I share totals with officials or the
                Chamber, I&apos;ll share counts, not names, unless you tell me it&apos;s okay.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Hosting</h2>
              <p className="mt-2">
                The site is hosted on Vercel, which may keep standard server logs, such as IP addresses, for security
                and reliability. This site doesn&apos;t use ads or tracking cookies.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Payments</h2>
              <p className="mt-2">No cards are on sale, and this site never asks for payment or card numbers.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Questions or deletion</h2>
              <p className="mt-2">
                Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">
                  {CONTACT_EMAIL}
                </a>{" "}
                and I&apos;ll delete your email and anything I noted from it.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
