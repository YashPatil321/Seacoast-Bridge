import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ScrollProgress } from "./ScrollProgress";
import { MobileMenu } from "./MobileMenu";

const links = [
  { href: "/#why", label: "Why" },
  { href: "/#plan", label: "The plan" },
  { href: "/#math", label: "The math" },
  { href: "/brief", label: "Full brief" },
];

export function SiteHeader() {
  return (
    <header role="banner" className="sticky top-0 z-40 bg-teal text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
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
          <MobileMenu links={links} />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
