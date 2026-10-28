import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ScrollProgress } from "./ScrollProgress";

const links = [
  { href: "/#why", label: "Why" },
  { href: "/#plan", label: "The plan" },
  { href: "/#math", label: "The math" },
  { href: "/brief", label: "Full brief" },
];

export function SiteHeader() {
  return (
    <header role="banner" className="sticky top-0 z-40 bg-teal text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="rounded-sm" aria-label="Seacoast Bridge, home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 font-mono text-[0.8rem] tracking-wide text-seaglass">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="draw-link transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#support"
                className="inline-flex items-center rounded-sm bg-amber px-3.5 py-2 font-semibold text-[#0e2223] transition-transform hover:-translate-y-px"
              >
                Support
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/#support"
            className="inline-flex items-center rounded-sm bg-amber px-3 py-2 font-mono text-[0.78rem] font-semibold text-[#0e2223]"
          >
            Support
          </Link>
          <details className="group relative">
            <summary
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-sm text-seaglass [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path className="hidden group-open:block" d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              aria-label="Primary"
              className="absolute right-0 top-12 w-56 border border-white/10 bg-teal-deep p-2 shadow-xl"
            >
              <ul className="font-mono text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block px-3 py-3 text-seaglass hover:bg-white/5 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
