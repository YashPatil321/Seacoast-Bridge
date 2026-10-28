import Link from "next/link";
import { sources, CONTACT_EMAIL } from "@/lib/sources";
import { Wordmark } from "./Wordmark";

function SourceList() {
  return (
    <ol className="mt-4 grid gap-x-8 gap-y-3 pb-5 text-[0.88rem] leading-snug sm:grid-cols-2 md:pb-0">
      {sources.map((s, i) => (
        <li key={s.id} className="flex gap-3">
          <span className="num w-5 shrink-0 text-xs text-seaglass/70">{String(i + 1).padStart(2, "0")}</span>
          <a href={s.url} className="hover:text-white hover:underline" rel="noopener noreferrer" target="_blank">
            <span className="text-white/90">{s.outlet}.</span> {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="bg-teal text-seaglass">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-8 md:grid-cols-[16rem_1fr] md:gap-10">
          <div>
            <Wordmark />
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              Seacoast Bridge is an independent proposal by Yash Patil, Del Norte High School, San Diego.
            </p>
            <p className="mt-4 font-mono text-xs">
              <a href={`mailto:${CONTACT_EMAIL}`} className="draw-link text-white">
                {CONTACT_EMAIL}
              </a>
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 font-mono text-xs md:block md:space-y-2">
              <li><Link href="/brief" className="draw-link inline-block py-2 hover:text-white md:py-0">Full brief</Link></li>
              <li><Link href="/support" className="draw-link inline-block py-2 hover:text-white md:py-0">Add your support</Link></li>
              <li><Link href="/privacy" className="draw-link inline-block py-2 hover:text-white md:py-0">Privacy</Link></li>
            </ul>
          </div>
          <div>
            {/* Phones get a collapsed list; the full list is always in the brief. */}
            <details className="group border-y border-white/10 md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                <span className="label text-amber">Sources ({sources.length})</span>
                <span aria-hidden="true" className="font-mono text-lg leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <SourceList />
            </details>
            <div className="hidden md:block">
              <h2 className="label text-amber">Sources</h2>
              <SourceList />
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 sm:mt-12 font-mono text-[0.72rem] leading-relaxed text-seaglass/80">
          Not an official program of the City of Imperial Beach, the County of San Diego or the Imperial Beach Chamber of
          Commerce. No cards are on sale.
        </p>
      </div>
    </footer>
  );
}
