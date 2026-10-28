/** Small bridge-over-water mark plus the "Seacoast Bridge" wordmark. */
export function BridgeMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M3 20 Q16 4 29 20" fill="none" stroke="#d98e2b" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 13.4V20M16 10.4V20M23 13.4V20" stroke="#d98e2b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 20h28" stroke="#9fd0c8" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 25c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6" fill="none" stroke="#9fd0c8" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5 font-display text-[1.08rem] font-semibold tracking-tight text-white">
      <BridgeMark />
      <span>
        Seacoast <span className="text-amber">Bridge</span>
      </span>
    </span>
  );
}
