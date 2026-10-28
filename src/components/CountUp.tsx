"use client";

import { useEffect, useRef } from "react";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Renders the final value on the server, then rolls up from zero the first
 * time it scrolls into view. Skipped entirely under prefers-reduced-motion.
 */
export function CountUp({ to, prefix = "", suffix = "", duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const final = `${prefix}${fmt(to)}${suffix}`;
    el.textContent = `${prefix}0${suffix}`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t < 1 ? `${prefix}${fmt(to * eased)}${suffix}` : final;
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {fmt(to)}
      {suffix}
    </span>
  );
}
