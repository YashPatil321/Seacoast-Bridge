"use client";

import Link from "next/link";
import { useRef } from "react";

/** Phone menu: a full-width sheet under the header that closes when a link is tapped. */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");

  return (
    <details ref={ref} className="group">
      <summary
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm text-seaglass [&::-webkit-details-marker]:hidden"
        aria-label="Menu"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path className="hidden group-open:block" d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </summary>
      <nav aria-label="Primary" className="fixed inset-x-0 top-[66px] border-b border-white/10 bg-teal-deep shadow-xl">
        <ul className="mx-auto max-w-6xl px-5 py-2 font-mono text-[0.95rem]">
          {links.map((l) => (
            <li key={l.href} className="border-b border-white/5 last:border-b-0">
              <Link href={l.href} onClick={close} className="block py-3.5 text-seaglass hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
