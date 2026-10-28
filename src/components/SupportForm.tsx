"use client";

import { useId, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/sources";

type Role = "" | "resident" | "former visitor" | "business owner" | "other";
type Denied = "" | "yes" | "no" | "prefer not to say";

type Errors = Partial<Record<"name" | "email" | "role" | "zip" | "comment", string>>;

const MAX_COMMENT = 500;
const roles: { value: Exclude<Role, "">; label: string }[] = [
  { value: "resident", label: "Resident" },
  { value: "former visitor", label: "Former visitor" },
  { value: "business owner", label: "Business owner" },
  { value: "other", label: "Other" },
];

const field =
  "mt-1.5 block w-full rounded-none border border-rule bg-surface px-3.5 py-3 font-serif text-base text-ink placeholder:text-muted/70 transition-colors focus:border-amber focus:outline-none focus-visible:outline-[3px] focus-visible:outline-amber aria-[invalid=true]:border-[#b3261e]";
const labelCls = "font-display text-[0.95rem] font-medium";
const errCls = "mt-1.5 font-mono text-xs text-[#b3261e] dark:text-[#ff8a80]";

export function SupportForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("");
  const [zip, setZip] = useState("");
  const [business, setBusiness] = useState("");
  const [wouldBuy, setWouldBuy] = useState(false);
  const [wouldSell, setWouldSell] = useState(false);
  const [denied, setDenied] = useState<Denied>("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const isOwner = role === "business owner";
  const clear = (k: keyof Errors) => errors[k] && setErrors((e) => ({ ...e, [k]: undefined }));
  const ids = (k: string) => `${uid}-${k}`;

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Please add your name.";
    else if (name.trim().length > 100) e.name = "Please keep your name under 100 characters.";
    if (!email.trim()) e.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "That email doesn't look right.";
    if (!role) e.role = "Please choose one.";
    if (zip.trim() && !/^\d{5}$/.test(zip.trim())) e.zip = "Use a 5-digit zip code.";
    if (comment.length > MAX_COMMENT) e.comment = `Please keep it under ${MAX_COMMENT} characters.`;
    return e;
  }

  function compose() {
    const lines = [
      "I support the Seacoast Bridge proposal.",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `I am a: ${role}`,
      zip.trim() ? `Zip code: ${zip.trim()}` : null,
      isOwner && business.trim() ? `Business name: ${business.trim()}` : null,
      `I would buy a Come Back Card: ${wouldBuy ? "yes" : "no"}`,
      isOwner ? `My business would sell Come Back Cards: ${wouldSell ? "yes" : "no"}` : null,
      isOwner && denied ? `Turned down for a loan since the closures: ${denied}` : null,
      `Yash may contact me about this proposal: ${consent ? "yes" : "no"}`,
      comment.trim() ? `\nComment:\n${comment.trim()}` : null,
    ].filter((l): l is string => l !== null);
    return { subject: `Seacoast Bridge support: ${name.trim()}`, body: lines.join("\n") };
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(ids(first))?.focus();
      return;
    }
    const m = compose();
    setMessage(m);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
  }

  async function copy() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\nSubject: ${message.subject}\n\n${message.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (message) {
    return (
      <div className="rise border-l-4 border-amber bg-surface p-6 sm:p-8" role="status">
        <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="var(--amber)" strokeWidth="2.5" />
          <path d="M14 25 l7 7 l13 -15" fill="none" stroke="var(--amber)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
        </svg>
        <h3 className="mt-4 text-2xl font-semibold">Thank you, {name.trim().split(" ")[0]}.</h3>
        <p className="mt-3 max-w-prose">
          Your email app should have opened with your note to me already written. Press send and you are counted. This
          site doesn&apos;t store anything you typed.
        </p>
        <div className="mt-6 border-t border-rule pt-5">
          <p className="label text-muted">Email app didn&apos;t open?</p>
          <p className="mt-2 text-[0.98rem]">
            Copy the note and send it to{" "}
            <a className="prose-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-words border border-rule bg-bg p-3 font-mono text-xs leading-relaxed text-muted">
            {message.body}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="bg-amber px-4 py-2.5 font-mono text-sm font-semibold text-[#0e2223]">
              {copied ? "Copied" : "Copy note"}
            </button>
            <button type="button" onClick={() => setMessage(null)} className="border border-rule px-4 py-2.5 font-mono text-sm">
              Edit my answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={ids("note")}>
      <p id={ids("note")} className="font-mono text-xs leading-relaxed text-muted">
        Fields marked * are required. Sending opens your email app with a note to me. Nothing is stored on this site, and
        nothing is for sale.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={ids("name")} className={labelCls}>
            Name *
          </label>
          <input id={ids("name")} className={field} autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); clear("name"); }} aria-invalid={!!errors.name} aria-describedby={errors.name ? ids("name-err") : undefined} maxLength={120} />
          {errors.name && <p id={ids("name-err")} className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={ids("email")} className={labelCls}>
            Email *
          </label>
          <input id={ids("email")} type="email" inputMode="email" className={field} autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} aria-invalid={!!errors.email} aria-describedby={errors.email ? ids("email-err") : undefined} maxLength={200} />
          {errors.email && <p id={ids("email-err")} className={errCls}>{errors.email}</p>}
        </div>
      </div>

      <fieldset aria-describedby={errors.role ? ids("role-err") : undefined}>
        <legend className={labelCls}>I am a *</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {roles.map((r, i) => (
            <label
              key={r.value}
              className="flex cursor-pointer items-center gap-2.5 border border-rule bg-surface px-3 py-3 font-display text-[0.95rem] transition-colors has-[:checked]:border-amber has-[:checked]:bg-tint has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-amber"
            >
              <input
                id={i === 0 ? ids("role") : undefined}
                type="radio"
                name={ids("role-group")}
                value={r.value}
                checked={role === r.value}
                onChange={() => { setRole(r.value); clear("role"); }}
                className="h-4 w-4 accent-[var(--amber)] focus:outline-none"
              />
              {r.label}
            </label>
          ))}
        </div>
        {errors.role && <p id={ids("role-err")} className={errCls}>{errors.role}</p>}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-[10rem_1fr]">
        <div>
          <label htmlFor={ids("zip")} className={labelCls}>
            Zip code
          </label>
          <input id={ids("zip")} inputMode="numeric" autoComplete="postal-code" className={`${field} num`} value={zip} onChange={(e) => { setZip(e.target.value.replace(/[^\d]/g, "").slice(0, 5)); clear("zip"); }} aria-invalid={!!errors.zip} aria-describedby={errors.zip ? ids("zip-err") : undefined} />
          {errors.zip && <p id={ids("zip-err")} className={errCls}>{errors.zip}</p>}
        </div>
        {isOwner && (
          <div className="rise">
            <label htmlFor={ids("business")} className={labelCls}>
              Business name
            </label>
            <input id={ids("business")} className={field} autoComplete="organization" value={business} onChange={(e) => setBusiness(e.target.value)} maxLength={150} />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Check id={ids("buy")} checked={wouldBuy} onChange={setWouldBuy}>
          I would buy a Come Back Card
        </Check>
        {isOwner && (
          <Check id={ids("sell")} checked={wouldSell} onChange={setWouldSell} className="rise">
            My business would sell Come Back Cards
          </Check>
        )}
      </div>

      {isOwner && (
        <fieldset className="rise">
          <legend className={labelCls}>Has a bank turned down your business for a loan since the closures?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["yes", "no", "prefer not to say"] as const).map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-2.5 border border-rule bg-surface px-3 py-2.5 font-display text-[0.95rem] has-[:checked]:border-amber has-[:checked]:bg-tint has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-amber">
                <input type="radio" name={ids("denied")} value={v} checked={denied === v} onChange={() => setDenied(v)} className="h-4 w-4 accent-[var(--amber)] focus:outline-none" />
                {v[0].toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor={ids("comment")} className={labelCls}>
            Comment <span className="font-normal text-muted">(optional)</span>
          </label>
          <span className={`num text-xs ${comment.length > MAX_COMMENT ? "text-[#b3261e]" : "text-muted"}`} aria-live="polite">
            {comment.length}/{MAX_COMMENT}
          </span>
        </div>
        <textarea id={ids("comment")} rows={4} className={`${field} resize-y`} value={comment} onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))} aria-invalid={!!errors.comment} maxLength={MAX_COMMENT} />
        {errors.comment && <p className={errCls}>{errors.comment}</p>}
      </div>

      <Check id={ids("consent")} checked={consent} onChange={setConsent}>
        Yash may contact me about this proposal.
      </Check>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="group inline-flex items-center gap-2 bg-amber px-6 py-3.5 font-mono text-[0.95rem] font-semibold text-[#0e2223] transition-transform hover:-translate-y-0.5">
          Add my support
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <a href="/privacy" className="prose-link font-mono text-xs">
          Privacy note
        </a>
      </div>
    </form>
  );
}

function Check({
  id,
  checked,
  onChange,
  children,
  className = "",
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-start gap-3 ${className}`}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--amber)]" />
      <span className="text-[1.02rem]">{children}</span>
    </label>
  );
}
