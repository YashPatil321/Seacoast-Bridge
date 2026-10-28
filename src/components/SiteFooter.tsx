import Link from "next/link";
import { sources, CONTACT_EMAIL } from "@/lib/sources";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="bg-teal text-seaglass">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[16rem_1fr]">
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
            <ul className="mt-6 space-y-2 font-mono text-xs">
              <li><Link href="/brief" className="draw-link hover:text-white">Full brief</Link></li>
              <li><Link href="/support" className="draw-link hover:text-white">Add your support</Link></li>
              <li><Link href="/privacy" className="draw-link hover:text-white">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="label text-amber">Sources</h2>
            <ol className="mt-4 grid gap-x-8 gap-y-3 text-[0.88rem] leading-snug sm:grid-cols-2">
              {sources.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="num w-5 shrink-0 text-xs text-seaglass/60">{String(i + 1).padStart(2, "0")}</span>
                  <a href={s.url} className="hover:text-white hover:underline" rel="noopener noreferrer" target="_blank">
                    <span className="text-white/90">{s.outlet}.</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 font-mono text-[0.72rem] leading-relaxed text-seaglass/80">
          Not an official program of the City of Imperial Beach, the County of San Diego or the Imperial Beach Chamber of
          Commerce. No cards are on sale.
        </p>
      </div>
    </footer>
  );
}
