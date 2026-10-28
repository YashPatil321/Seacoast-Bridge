"use client";

import { useEffect, useState } from "react";
import { TARGET_ISO } from "@/lib/sources";

const DAY = 86_400_000;
const target = new Date(TARGET_ISO).getTime();

function parts(now: number) {
  const ms = Math.max(0, target - now);
  const days = Math.ceil(ms / DAY);
  const rem = ms % DAY;
  const h = Math.floor(rem / 3_600_000);
  const m = Math.floor((rem % 3_600_000) / 60_000);
  const s = Math.floor((rem % 60_000) / 1000);
  return { days, clock: [h, m, s].map((n) => String(n).padStart(2, "0")).join(":") };
}

/**
 * Live days remaining until Dec 31, 2027. An inline script fills the day count
 * before first paint, so the figure never flashes empty; React then keeps it ticking.
 */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const p = now === null ? null : parts(now);

  return (
    <span className="block">
      <span className="flex items-baseline gap-2">
      <span id="countdown-days" className="num" suppressHydrationWarning>
        {p ? p.days.toLocaleString("en-US") : " "}
      </span>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var e=document.getElementById("countdown-days");if(e&&!e.textContent.trim()){var d=Math.max(0,Math.ceil((${target}-Date.now())/${DAY}));e.textContent=d.toLocaleString("en-US")}})()`,
        }}
      />
        <span className="relative -top-2 inline-flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
        </span>
      </span>
      <span className="mt-2 block font-mono text-[0.72rem] leading-none tracking-[0.14em] text-seaglass" aria-hidden="true">
        <span key={p?.clock} className={p ? "tick inline-block" : "inline-block"} suppressHydrationWarning>
          {p ? p.clock : "--:--:--"}
        </span>{" "}
        <span className="hidden text-seaglass/60 sm:inline">HRS · MIN · SEC</span>
      </span>
    </span>
  );
}
