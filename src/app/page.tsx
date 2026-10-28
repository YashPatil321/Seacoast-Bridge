import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { Countdown } from "@/components/Countdown";
import { CountUp } from "@/components/CountUp";
import { Disclaimer } from "@/components/Disclaimer";
import { Section } from "@/components/Section";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Calculator } from "@/components/Calculator";
import { SupportForm } from "@/components/SupportForm";
import { ownerQuote, sourceById } from "@/lib/sources";

export default function Home() {
  return (
    <>
      <Hero />
      <Disclaimer />
      <Why />
      <Heard />
      <Gap />
      <Plan />
      <MathSection />
      <Support />
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-teal text-white">
      <HeroScene />
      <div className="relative mx-auto max-w-6xl px-4 pb-36 pt-14 sm:px-6 sm:pt-20 lg:pb-40 lg:pt-24">
        <p className="rise label text-seaglass" style={{ ["--rise-delay" as string]: "0ms" }}>
          Imperial Beach <span className="mx-1 text-amber">·</span> Tijuana River sewage crisis
        </p>
        <h1
          id="hero-heading"
          className="rise mt-5 max-w-[15ch] text-[2.65rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.6rem]"
          style={{ ["--rise-delay" as string]: "90ms" }}
        >
          Keep Seacoast Drive open until the water clears.
        </h1>
        <p
          className="rise mt-6 max-w-[34rem] text-[1.15rem] leading-relaxed text-[#d6ebe7] sm:text-xl"
          style={{ ["--rise-delay" as string]: "180ms" }}
        >
          The plant that will stop the sewage is funded and scheduled for the end of 2027. Many of the small businesses
          beside the beach may not last that long. This is a plan to get them there.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ ["--rise-delay" as string]: "270ms" }}>
          <Link
            href="/brief"
            className="group inline-flex items-center gap-2 bg-amber px-5 py-3.5 font-mono text-[0.92rem] font-semibold text-[#0e2223] transition-transform hover:-translate-y-0.5"
          >
            Read the full brief
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="#support"
            className="inline-flex items-center border border-seaglass/50 px-5 py-3.5 font-mono text-[0.92rem] text-white transition-colors hover:border-white hover:bg-white/5"
          >
            Add your support
          </Link>
        </div>

        <dl
          className="rise mt-14 grid max-w-4xl grid-cols-1 border-t border-seaglass/25 sm:grid-cols-3"
          style={{ ["--rise-delay" as string]: "380ms" }}
        >
          <Figure
            value={<><CountUp to={1000} />+</>}
            text="consecutive days closed before 2024, with closures again in fall 2026"
          />
          <Figure value={<Countdown />} text="days until Dec 31, 2027, the target to finish the plant expansion" />
          <Figure
            value={<>~<CountUp to={30} />%</>}
            text="drop in Imperial Beach tourism tax revenue, 2017 to 2024"
          />
        </dl>
      </div>
    </section>
  );
}

function Figure({ value, text }: { value: React.ReactNode; text: string }) {
  return (
    <div className="border-b border-seaglass/25 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
      <dt className="sr-only">{text}</dt>
      <dd>
        <span className="num block text-[2.6rem] font-medium leading-none text-amber sm:text-5xl">{value}</span>
        <span className="mt-3 block max-w-[16rem] text-[0.98rem] leading-snug text-seaglass" aria-hidden="true">
          {text}
        </span>
      </dd>
    </div>
  );
}

/* ---------- Why ---------- */

function Why() {
  return (
    <Section id="why" index="01" label="Why I'm doing this">
      <div className="max-w-[38rem] space-y-6 text-[1.18rem] leading-[1.7] sm:text-[1.25rem]">
        <p data-reveal className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.6rem] first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-accent">
          When I was younger, my family drove to Imperial Beach because it was quieter than the beaches near us.
          We&apos;d stay in the water until the sun dropped behind the pier, then walk Seacoast Drive and eat at
          whichever small restaurant had a table. At some point the trips stopped, and I assumed we had found better
          beaches. We hadn&apos;t. The water had closed, and families like mine stopped coming all at once.
        </p>
        <p data-reveal>
          I grew up inside a small business. My parents run a cabinet manufacturing company, and I&apos;ve seen what a
          slow month feels like at home, when the bills still come in and the work has to keep going. I help run that
          business now, which is why small businesses have a special place for me. A few slow months are hard. Years of
          them, caused by something no owner can control, is a different problem.
        </p>
        <p data-reveal className="font-mono text-sm text-muted">Yash Patil, Del Norte High School</p>
      </div>
    </Section>
  );
}

/* ---------- What I heard ---------- */

function Heard() {
  return (
    <Section index="02" label="What I heard" title="What I heard on Seacoast Drive" tone="tint">
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className="space-y-5 text-[1.12rem] leading-relaxed">
          <p data-reveal>
            Every business owner I spoke with described the same struggle: revenue had fallen, and because of it they
            had been denied loans or expected to be. They said a program like this would help them hold on until the
            beaches reopen.
          </p>
          <p data-reveal>
            I also knocked on 10 residents&apos; doors in the neighborhood, and 7 of 10 said they would buy a Come Back
            Card.
          </p>
          {ownerQuote.text && (
            <blockquote data-reveal className="border-l-4 border-amber pl-5">
              <p className="text-xl italic">&ldquo;{ownerQuote.text}&rdquo;</p>
              {ownerQuote.attribution && (
                <footer className="mt-2 font-mono text-xs text-muted">{ownerQuote.attribution}</footer>
              )}
            </blockquote>
          )}
        </div>

        <figure data-reveal className="border-t-2 border-amber pt-6">
          <p className="num text-[4.5rem] font-medium leading-none text-accent sm:text-[5.5rem]">
            7<span className="mx-3 text-[0.45em] text-muted">of</span>10
          </p>
          <div className="mt-6 grid max-w-xs grid-cols-10 gap-2" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`dot aspect-square rounded-full ${i < 7 ? "dot-on" : "border border-rule"}`}
                style={{ ["--i" as string]: i }}
              />
            ))}
          </div>
          <figcaption className="mt-4 max-w-xs text-[0.98rem] text-muted">
            residents I surveyed door to door said they would buy a Come Back Card
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

/* ---------- The gap ---------- */

function Gap() {
  const vosd = sourceById["vosd-south-county"];
  return (
    <Section id="gap" index="03" label="The gap" title="A temporary problem that looks permanent to a bank">
      <dl className="mt-10 grid grid-cols-1 border-l border-t border-rule sm:grid-cols-2">
        <Tile value={<>$<CountUp to={500} />M</>} text="estimated yearly regional losses" note="County report, Sept 2026" />
        <Tile value={<><CountUp to={70} />%+</>} text="of South County businesses in a 2023 county survey said they were affected" />
        <Tile
          value={<>35 <span className="text-muted">→</span> 50</>}
          text="million gallons a day: South Bay plant capacity now and after expansion"
          bar
        />
        <Tile value={<>Dec 2027</>} text="target to finish the expansion" />
      </dl>

      <figure data-reveal className="mt-14 max-w-3xl">
        <blockquote>
          <p className="font-serif text-[1.55rem] leading-snug sm:text-[2rem]">
            <span className="text-accent">&ldquo;</span>When we went to the banks for a loan, they all said no because our
            Imperial Beach business is declining.<span className="text-accent">&rdquo;</span>
          </p>
        </blockquote>
        <figcaption className="mt-5 font-mono text-[0.8rem] leading-relaxed text-muted">
          Harunder Singh, owner of two Imperial Beach 7-Eleven franchises, SBA roundtable, March 2026.{" "}
          <a href={vosd.url} className="prose-link" target="_blank" rel="noopener noreferrer">
            Voice of San Diego
          </a>
        </figcaption>
      </figure>

      <p data-reveal className="mt-10 max-w-2xl border-l-4 border-amber pl-5 text-[1.15rem] leading-relaxed">
        Banks lend on recent revenue, so a temporary, publicly funded problem makes a healthy business look like
        it&apos;s in permanent decline.
      </p>
    </Section>
  );
}

function Tile({ value, text, note, bar }: { value: React.ReactNode; text: string; note?: string; bar?: boolean }) {
  return (
    <div data-reveal className="border-b border-r border-rule p-5 sm:p-7">
      <dt className="sr-only">{text}</dt>
      <dd>
        <span className="num block text-[2.4rem] font-medium leading-none text-accent sm:text-5xl">{value}</span>
        {bar && (
          <span className="mt-4 block h-1.5 w-full max-w-[14rem] bg-rule" aria-hidden="true">
            <span className="fill-bar block h-full bg-amber" style={{ ["--from" as string]: 0.7, ["--to" as string]: 1 }} />
          </span>
        )}
        <span className="mt-3 block max-w-[22rem] text-[1rem] leading-snug" aria-hidden="true">
          {text}
        </span>
        {note && <span className="mt-2 block font-mono text-[0.72rem] text-muted">{note}</span>}
      </dd>
    </div>
  );
}

/* ---------- The plan ---------- */

function Plan() {
  return (
    <Section id="plan" index="04" label="The plan" title="Two bridges to the reopening" tone="tint">
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Bridge
          n="Bridge 1"
          name="The Come Back Card"
          tag="No public money"
          items={[
            "A resident or former visitor buys $50 of credit at a participating business for $45.",
            "The business keeps the cash today.",
            "The buyer redeems it on a later visit.",
            "The Chamber would provide shared branding and one sign-up page.",
            "Cards run on an existing gift card platform with no expiration date.",
          ]}
        />
        <Bridge
          n="Bridge 2"
          name="The bridge loan guarantee"
          tag="A county loss reserve inside IBank, California's existing small business loan guarantee program"
          items={[
            "Lend on revenue from the last full year before the closures.",
            "Interest-only until a summer in which county water testing shows the shoreline open on at least 80% of days, with a fixed outer repayment date (for example, the end of 2029).",
            "The reserve covers 50% of each loss, so banks still screen for businesses that were healthy before.",
          ]}
        />
      </div>

      <div className="mt-16">
        <h3 data-reveal className="text-2xl font-semibold">How the money moves</h3>
        <div data-reveal className="mt-6 border border-rule bg-bg p-4 sm:p-8">
          <FlowDiagram />
        </div>
      </div>
    </Section>
  );
}

function Bridge({ n, name, tag, items }: { n: string; name: string; tag: string; items: string[] }) {
  return (
    <article data-reveal className="flex flex-col border-t-4 border-amber bg-surface p-6 sm:p-8">
      <p className="label text-accent">{n}</p>
      <h3 className="mt-2 text-[1.7rem] font-semibold">{name}</h3>
      <p className="mt-2 font-mono text-[0.8rem] leading-relaxed text-muted">{tag}</p>
      <ol className="mt-6 space-y-0 border-t border-rule">
        {items.map((it, i) => (
          <li key={i} className="flex gap-4 border-b border-rule py-3.5 last:border-b-0">
            <span className="num pt-0.5 text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[1.04rem] leading-snug">{it}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

/* ---------- The math ---------- */

function MathSection() {
  return (
    <Section id="math" index="05" label="The math" title="What the reserve would cost">
      <p data-reveal className="mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
        Move the sliders. The reserve only pays when a loan goes bad, and then only the county&apos;s share of the loss.
        These are illustrative assumptions, not county figures.
      </p>
      <div data-reveal className="mt-10">
        <Calculator />
      </div>
    </Section>
  );
}

/* ---------- Support ---------- */

function Support() {
  return (
    <Section id="support" index="06" label="Support" title="Add your support" tone="tint">
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
        <div data-reveal>
          <p className="mb-8 max-w-2xl text-[1.1rem] leading-relaxed">
            If you live here, used to visit, or run a business near the beach, I&apos;d like to hear from you. What you
            tell me helps show the County and the Chamber who this would serve.
          </p>
          <SupportForm />
        </div>
        <aside data-reveal className="space-y-5 border-t border-rule pt-6 text-[0.95rem] leading-relaxed text-muted lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="label text-accent">Good to know</p>
          <p>No cards are on sale. Nothing here asks for payment or a card number.</p>
          <p>The form opens your own email app. This site does not save what you type.</p>
          <p>
            Read the <Link href="/privacy" className="prose-link">privacy note</Link> or the{" "}
            <Link href="/brief" className="prose-link">full brief</Link>.
          </p>
        </aside>
      </div>
    </Section>
  );
}
