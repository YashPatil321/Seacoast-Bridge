import type { Metadata } from "next";
import { FlowDiagram } from "@/components/FlowDiagram";
import { PrintButton } from "@/components/PrintButton";
import { CONTACT_EMAIL, sourceById, sources } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Policy brief",
  description:
    "The full Seacoast Bridge policy brief: a Come Back Card and a county loss reserve inside IBank to carry Imperial Beach small businesses to the end of the Tijuana River sewage fix.",
  alternates: { canonical: "/brief" },
};

const toc = [
  ["summary", "Summary"],
  ["fit", "How it fits together"],
  ["situation", "Situation"],
  ["problem", "The core problem"],
  ["card", "Part 1: Come Back Card"],
  ["loan", "Part 2: Loan guarantee"],
  ["cost", "Cost and funding"],
  ["risks", "Risks"],
  ["pilot", "Pilot plan"],
  ["response", "Community response"],
  ["asks", "What I'm asking for"],
  ["author", "About the author"],
  ["sources", "Sources"],
] as const;

function Src({ id, children }: { id: string; children?: React.ReactNode }) {
  const s = sourceById[id];
  return (
    <a href={s.url} className="prose-link" target="_blank" rel="noopener noreferrer">
      {children ?? s.outlet}
    </a>
  );
}

function H2({ id, n, children }: { id: string; n: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-10 flex items-baseline gap-3 border-t border-rule pt-6 text-[1.4rem] font-semibold sm:mt-14 sm:gap-4 sm:pt-8 sm:text-[1.65rem] print:mt-8 print:pt-4 print:text-[15pt]">
      <span className="num text-sm font-medium text-accent">{n}</span>
      <span>{children}</span>
    </h2>
  );
}

/**
 * Brief table. On phones, rows stack (label above detail) so nothing scrolls sideways;
 * short two-column number tables (`mono`) stay as tables at every width.
 */
function Table({ head, rows, cols, mono }: { head: string[]; rows: React.ReactNode[][]; cols?: string; mono?: boolean }) {
  const stack = !mono;
  return (
    <div className="mt-6">
      <table
        className={`w-full border-collapse text-left text-[0.98rem] leading-snug print:text-[9.5pt] ${
          stack ? "max-sm:block max-sm:border-t-2 max-sm:border-ink" : ""
        }`}
      >
        {cols && (
          <colgroup>
            {cols.split(" ").map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
        )}
        <thead className={stack ? "max-sm:hidden" : ""}>
          <tr className="border-b-2 border-ink">
            {head.map((h) => (
              <th key={h} scope="col" className="label py-2.5 pr-4 align-bottom font-medium text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={stack ? "max-sm:block" : ""}>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-rule align-top ${stack ? "max-sm:block max-sm:py-3.5" : ""}`}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th
                    key={j}
                    scope="row"
                    className={`py-3 pr-4 font-display font-medium ${stack ? "max-sm:block max-sm:p-0 max-sm:text-[1.02rem]" : ""}`}
                  >
                    {c}
                  </th>
                ) : (
                  <td
                    key={j}
                    className={`py-3 pr-4${mono ? " num text-right sm:text-left" : ""} ${stack ? "max-sm:block max-sm:p-0 max-sm:pt-1 max-sm:text-muted" : ""}`}
                  >
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BriefPage() {
  return (
    <div className="bg-bg">
      <div className="bg-teal text-white print:bg-white print:text-black">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16 print:p-0">
          <p className="label text-seaglass print:text-black">Policy brief · Imperial Beach, San Diego County · Oct 2026</p>
          <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold sm:text-5xl print:text-[24pt]">
            Seacoast Bridge: keeping Imperial Beach small businesses open until the water clears
          </h1>
          <p className="mt-4 font-mono text-sm text-seaglass print:text-black">
            Yash Patil, Del Norte High School · {CONTACT_EMAIL}
          </p>
          <div className="mt-8">
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="border-b border-rule bg-tint print:border print:border-black print:bg-white">
        <p className="mx-auto max-w-6xl px-5 py-3 font-mono text-[0.78rem] leading-relaxed text-muted sm:px-6 print:px-3 print:text-black">
          An independent proposal by Yash Patil, a senior at Del Norte High School. Not an official program of the City,
          the County or the Chamber of Commerce. No cards are on sale.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-2 px-5 pb-20 sm:px-6 lg:grid-cols-[13rem_1fr] lg:gap-10 print:block print:p-0">
        <nav aria-label="Brief contents" className="no-print pt-6 lg:sticky lg:top-24 lg:self-start lg:pt-10">
          <details className="group lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
              <span className="label text-accent">Contents</span>
              <span aria-hidden="true" className="font-mono text-lg leading-none text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="pb-4">
          <ol className="mt-3 grid grid-cols-1 gap-y-1 font-mono text-[0.82rem] sm:grid-cols-2 lg:grid-cols-1">
            {toc.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className="flex gap-2 py-1 text-muted hover:text-ink lg:py-0.5">
                  <span className="num text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
            </div>
          </details>
          <div className="hidden lg:block">
            <p className="label text-accent">Contents</p>
          <ol className="mt-3 grid grid-cols-1 gap-y-1 font-mono text-[0.82rem] sm:grid-cols-2 lg:grid-cols-1">
            {toc.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className="flex gap-2 py-1 text-muted hover:text-ink lg:py-0.5">
                  <span className="num text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          </div>
        </nav>

        <article className="min-w-0 max-w-[46rem] text-[1.05rem] leading-relaxed sm:text-[1.08rem] print:max-w-none print:text-[10.5pt]">
          <H2 id="summary" n="01">Summary</H2>
          <p className="mt-4">
            The plant that will stop the sewage is funded, and its expansion is
            scheduled to finish at the end of 2027. The small businesses along Seacoast Drive have to survive until then.
            Many of them were healthy before the closures, but banks lend on recent revenue, and recent revenue is down
            because of a problem no owner caused.
          </p>
          <p className="mt-4">This brief proposes two bridges to carry them to the reopening:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-amber">
            <li>
              <strong className="font-display font-semibold">The Come Back Card</strong>, which uses no public money.
              Residents and former visitors buy $50 of credit at a participating business for $45. The business keeps
              the cash today, and the buyer comes back later to spend it.
            </li>
            <li>
              <strong className="font-display font-semibold">A bridge loan guarantee</strong>: a county loss reserve
              inside IBank, California&apos;s existing small business loan guarantee program. Banks lend on revenue from
              the last full year before the closures, payments stay interest-only until the beaches are open for a
              summer, and the reserve covers half of each loss.
            </li>
          </ul>

          <H2 id="fit" n="02">How it fits together</H2>
          <div className="mt-6 border border-rule bg-surface p-4 sm:p-6 print:p-2">
            <FlowDiagram />
          </div>

          <H2 id="situation" n="03">Situation</H2>
          <Table
            head={["Fact", "Detail"]}
            cols="32% 68%"
            rows={[
              ["Shoreline closures", <>Parts of the shoreline were closed more than 1,000 consecutive days before a partial reopening in Sept 2024 (<Src id="10news-reopens" />). Closures returned in Aug and Sept 2026 (<Src id="10news-closed" />).</>],
              ["Tourism revenue", "Imperial Beach tourism tax revenue fell about 30% from 2017 to 2024."],
              ["Regional cost", <>Up to $500M a year, according to a county report released in Sept 2026 (<Src id="kpbs-500m" />).</>],
              ["Business impact", "A 2023 county survey of 63 South County businesses found more than 70% affected, two thirds citing lost revenue. Coronado Brewing closed, citing the sewage."],
              ["Emergency", <>The county declared a local emergency in June 2023 (<Src id="kpbs-emergency" />).</>],
              ["The fix", <>The South Bay plant reached 35 million gallons a day in Aug 2025. The first contract to expand it to 50 MGD was awarded in Sept 2026, targeting the end of 2027 (<Src id="wateronline-update" />; <Src id="epa-milestone" />).</>],
              ["Leadership", <>On Oct 19, 2026, the county named its first Pollution Crisis Chief, Bridget Premont (<Src id="nbc-chief" />).</>],
            ]}
          />

          <H2 id="problem" n="04">The core problem</H2>
          <p className="mt-4">
            Banks underwrite on trailing revenue. When the water closes, revenue falls, and a business that was healthy
            for years looks like one in permanent decline. The cause is temporary and the fix is publicly funded, but the
            loan file can&apos;t show that.
          </p>
          <blockquote className="avoid-break mt-6 border-l-4 border-amber pl-5">
            <p className="text-[1.3rem] italic leading-snug print:text-[12pt]">
              &ldquo;When we went to the banks for a loan, they all said no because our Imperial Beach business is
              declining.&rdquo;
            </p>
            <footer className="mt-2 font-mono text-[0.78rem] text-muted">
              Harunder Singh, owner of two Imperial Beach 7-Eleven franchises, SBA roundtable, March 2026 (
              <Src id="vosd-south-county" />)
            </footer>
          </blockquote>
          <p className="mt-6">
            Federal disaster loans are built for disasters that happen on a single date, like a fire or a flood. A
            sewage crisis that closes the beach on and off for years doesn&apos;t fit that shape.
          </p>

          <H2 id="card" n="05">Part 1: Come Back Card term sheet</H2>
          <Table
            head={["Term", "Proposal"]}
            cols="28% 72%"
            rows={[
              ["Offer", "$50 of credit at a participating business, sold for $45."],
              ["Who sells", "Participating Imperial Beach small businesses, starting with those near the beach."],
              ["Who runs it", "The Chamber of Commerce would provide shared branding and one sign-up page. Each business sells and honors its own cards."],
              ["Platform", "An existing gift card platform. No new software."],
              ["Expiration", "None."],
              ["Cost to the business", <>The $5 difference on each card, plus any platform fees. <span className="font-mono text-xs text-muted">TODO: confirm fees for the chosen platform.</span></>],
              ["Target buyers", "Residents and former visitors who want to come back."],
              ["Pilot", "3 to 5 businesses."],
            ]}
          />

          <H2 id="loan" n="06">Part 2: Loan guarantee term sheet</H2>
          <Table
            head={["Term", "Proposal"]}
            cols="28% 72%"
            rows={[
              ["Eligible borrowers", <>Imperial Beach small businesses that were operating before the closures. <span className="font-mono text-xs text-muted">TODO: define the eligible area.</span></>],
              ["Use of funds", "Operating costs while the shoreline is closed."],
              ["Loan size", "Up to $150,000 (illustrative)."],
              ["Underwriting", "Revenue from the last full year before the closures."],
              ["Deferral", "Interest-only until the reopening trigger is met."],
              ["Reopening trigger", "A summer in which county water testing shows the shoreline open on at least 80% of days."],
              ["Outer limit", "A fixed repayment date regardless of the trigger, for example the end of 2029."],
              ["Guarantee", "A county loss reserve covers 50% of each loss, so banks keep half the risk and still screen for businesses that were healthy before."],
              ["Lenders", "Banks and credit unions already enrolled with IBank."],
            ]}
          />
          <p className="mt-4 text-[0.98rem] text-muted">
            IBank already guarantees up to 80% of a loan for up to 7 years (<Src id="ibank-sbfc" />;{" "}
            <Src id="ibank-program">IBank program</Src>). This proposal adds a county reserve on top of a program lenders
            already use.
          </p>

          <H2 id="cost" n="07">Cost and funding</H2>
          <p className="mt-4">These are illustrative assumptions, not county figures.</p>
          <Table
            head={["Assumption", "Value"]}
            cols="60% 40%"
            mono
            rows={[
              ["Businesses that borrow", "100"],
              ["Average loan", "$75,000"],
              ["Total lending", "$7,500,000"],
              ["Default rate", "15%"],
              ["Defaulted principal", "$1,125,000"],
              ["County share of each loss", "50%"],
              ["Reserve cost", "$562,500"],
              ["Lending backed per reserve dollar", "about $13"],
            ]}
          />
          <h3 className="mt-8 text-xl font-semibold">Where the reserve could come from</h3>
          <ol className="mt-3 list-decimal space-y-3 pl-6 marker:font-mono marker:text-accent">
            <li>County or state emergency funds.</li>
            <li>
              A tourism business improvement district under California&apos;s Property and Business Improvement District
              Law of 1994. Hotels that would pay more than half of the assessment petition the city council, for an
              initial term of up to 5 years. Carlsbad&apos;s district charges 2% of room revenue (
              <Src id="carlsbad-tbid">City of Carlsbad</Src>).
            </li>
            <li>Local banks and foundations.</li>
          </ol>
          <p className="mt-4 text-[0.98rem] text-muted">
            Note: Mike Hess has publicly opposed a countywide sales tax.
          </p>

          <H2 id="risks" n="08">Risks</H2>
          <Table
            head={["Risk", "How the design handles it"]}
            cols="32% 68%"
            rows={[
              ["The plant finishes late", "Repayment starts on an open summer, not on a calendar date, so a late plant doesn't push businesses into payments early. A fixed outer date (for example, end of 2029) caps how long the county is exposed."],
              ["Loans go to businesses that were failing anyway", "Underwriting uses the last full year before the closures, and banks carry half of every loss, so lenders still screen for businesses that were healthy before."],
              ["Defaults run higher than expected", "The county sets the size of the reserve up front and covers only its share of each loss. The calculator shows how cost changes with the default rate."],
              ["Few people buy cards", "The card uses no public money, and it starts as a 3 to 5 business pilot, so a slow start costs little and teaches a lot."],
              ["Gift card or lending rules block a feature", "Cards run on an existing gift card platform, and loans go through IBank's existing program and enrolled lenders. The pilot is the place to find a blocked feature early and change it."],
              ["Owners don't want more debt", "Both parts are optional. The card brings in cash without any debt."],
            ]}
          />

          <H2 id="pilot" n="09">Pilot plan</H2>
          <ol className="mt-6 border-l-2 border-amber">
            {[
              ["Nov to Dec 2026", "Listen", "Meet business owners, the Chamber and county staff. Test the terms."],
              ["Jan to Mar 2027", "Card pilot", "Launch the Come Back Card with 3 to 5 businesses."],
              ["Jan to Jun 2027", "Reserve design", "Work with the county, IBank and lenders on the reserve."],
              ["Summer 2027", "First loans", "First bridge loans close through enrolled lenders."],
              ["2028 onward", "Repayment", "Repayment begins after an open summer, by the outer date at the latest."],
            ].map(([when, what, detail]) => (
              <li key={when} className="avoid-break relative pb-6 pl-6 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-amber bg-bg" aria-hidden="true" />
                <p className="num text-sm text-accent">{when}</p>
                <p className="font-display text-lg font-semibold">{what}</p>
                <p className="text-[0.98rem] text-muted">{detail}</p>
              </li>
            ))}
          </ol>

          <H2 id="response" n="10">Community response</H2>
          <p className="mt-4">
            The business owners I spoke with described falling revenue and being denied loans or expecting to be, and
            they said the program would help. Of 10 residents I surveyed door to door, 7 said they would buy a Come Back
            Card.
          </p>

          <H2 id="asks" n="11">What I&apos;m asking for</H2>
          <Table
            head={["Who", "The ask"]}
            cols="32% 68%"
            rows={[
              ["The County and the Pollution Crisis Chief", "Consider a loss reserve for Imperial Beach small businesses inside IBank, and a meeting to review these terms."],
              ["The Imperial Beach Chamber of Commerce", "Consider providing the shared branding and sign-up page for the Come Back Card, and help find 3 to 5 pilot businesses."],
              ["The City of Imperial Beach", "Help share the card with residents, and consider whether a tourism business improvement district fits."],
              ["The SBDC and IBank", "Advise on how the reserve could sit inside the existing guarantee program, and which enrolled lenders could take part."],
              ["Business owners", "Tell me whether these terms would help, and whether you would sell Come Back Cards."],
            ]}
          />

          <H2 id="author" n="12">About the author</H2>
          <p className="mt-4">
            Yash Patil is a senior at Del Norte High School. He grew up in his parents&apos; small business, a cabinet
            manufacturing company, and now helps run it, including building its ordering, production and design
            software. He co-founded Mantelkeep, a home services venture that works with local tradespeople. His family
            spent weekends in Imperial Beach until the closures.
          </p>
          <p className="mt-3">
            Contact:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">
              {CONTACT_EMAIL}
            </a>
          </p>

          <H2 id="sources" n="13">Sources</H2>
          <ol className="mt-4 space-y-2.5 text-[0.95rem] leading-snug print:text-[9pt]">
            {sources.map((s, i) => (
              <li key={s.id} className="flex gap-3">
                <span className="num w-6 shrink-0 text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  {s.outlet}.{" "}
                  <a href={s.url} className="prose-link print-url break-words" target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </span>
              </li>
            ))}
          </ol>

          <div className="no-print mt-12">
            <PrintButton />
          </div>
        </article>
      </div>
    </div>
  );
}
