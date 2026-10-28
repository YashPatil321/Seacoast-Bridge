"use client";

import { useEffect, useId, useRef, useState } from "react";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/** Eases a displayed number toward its target so outputs glide instead of jump. */
function useTween(target: number, ms = 450) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const t = dur ? Math.min(1, (now - start) / dur) : 1;
      const v = a + (target - a) * (1 - Math.pow(1 - t, 3));
      from.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
};

function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="border-t border-rule pt-4">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-display text-[0.98rem] font-medium">
          {label}
        </label>
        <output htmlFor={id} className="num text-lg font-medium text-accent">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        className="mt-2"
      />
      <div className="num flex justify-between text-[0.7rem] text-muted" aria-hidden="true">
        <span>{min.toLocaleString("en-US")}</span>
        <span>{max.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}

const DEFAULTS = { count: 100, loan: 75_000, rate: 15, share: 50 };

export function Calculator() {
  const [count, setCount] = useState(DEFAULTS.count);
  const [loan, setLoan] = useState(DEFAULTS.loan);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [share, setShare] = useState(DEFAULTS.share);

  const lending = count * loan;
  const defaulted = lending * (rate / 100);
  const reserve = defaulted * (share / 100);
  const leverage = reserve > 0 ? lending / reserve : null;

  const tLending = useTween(lending);
  const tDefaulted = useTween(defaulted);
  const tReserve = useTween(reserve);
  const tLeverage = useTween(leverage ?? 0);

  const isDefault =
    count === DEFAULTS.count && loan === DEFAULTS.loan && rate === DEFAULTS.rate && share === DEFAULTS.share;

  const reset = () => {
    setCount(DEFAULTS.count);
    setLoan(DEFAULTS.loan);
    setRate(DEFAULTS.rate);
    setShare(DEFAULTS.share);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
      <div className="space-y-5">
        <Slider label="Businesses that borrow" value={count} min={10} max={500} step={10} display={count.toLocaleString("en-US")} onChange={setCount} />
        <Slider label="Average loan" value={loan} min={10_000} max={150_000} step={5_000} display={usd(loan)} onChange={setLoan} />
        <Slider label="Default rate" value={rate} min={0} max={50} step={1} display={`${rate}%`} onChange={setRate} />
        <Slider label="County share of each loss" value={share} min={10} max={100} step={5} display={`${share}%`} onChange={setShare} />
        <div className="flex items-center justify-between pt-1">
          <p className="label text-muted">Illustrative assumptions, not county figures</p>
          <button
            type="button"
            onClick={reset}
            disabled={isDefault}
            className="font-mono text-xs text-accent underline underline-offset-4 disabled:cursor-default disabled:no-underline disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="border-l-4 border-amber bg-surface p-5 sm:p-7">
        <p className="sr-only" aria-live="polite">
          {`Total lending ${usd(lending)}. Defaulted principal ${usd(defaulted)}. Reserve cost ${usd(reserve)}.`}
          {leverage === null ? "" : ` Each reserve dollar backs about $${Math.round(leverage)} of lending.`}
        </p>
        <dl aria-hidden="true" className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div>
            <dt className="label text-muted">Total lending</dt>
            <dd className="num mt-1 text-2xl font-medium sm:text-[1.7rem]">{usd(tLending)}</dd>
          </div>
          <div>
            <dt className="label text-muted">Defaulted principal</dt>
            <dd className="num mt-1 text-2xl font-medium sm:text-[1.7rem]">{usd(tDefaulted)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="label text-muted">Reserve cost to the county</dt>
            <dd className="num mt-1 text-4xl font-semibold text-accent sm:text-5xl">{usd(tReserve)}</dd>
          </div>
        </dl>

        <div className="mt-6" aria-hidden="true">
          <div className="relative h-3 w-full bg-tint">
            <div className="absolute inset-y-0 left-0 bg-[var(--flow)] opacity-30 transition-[width] duration-500" style={{ width: `${lending ? (defaulted / lending) * 100 : 0}%` }} />
            <div className="absolute inset-y-0 left-0 bg-amber transition-[width] duration-500" style={{ width: `${lending ? (reserve / lending) * 100 : 0}%` }} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.7rem] text-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 bg-amber" /> Reserve cost</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 bg-[var(--flow)] opacity-30" /> Defaulted</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 bg-tint ring-1 ring-rule" /> Total lending</span>
          </div>
        </div>

        <p aria-hidden="true" className="mt-6 border-t border-rule pt-5 text-lg leading-snug">
          {leverage === null ? (
            <>With no defaults, the reserve pays nothing.</>
          ) : (
            <>
              Each reserve dollar backs about{" "}
              <strong className="num font-semibold text-accent">${Math.round(tLeverage).toLocaleString("en-US")}</strong> of
              lending.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
