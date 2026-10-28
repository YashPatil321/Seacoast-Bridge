export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="Disclaimer" className={`bg-teal-deep text-seaglass ${className}`}>
      <p className="mx-auto max-w-6xl px-5 py-3 font-mono text-[0.74rem] leading-relaxed sm:px-6 sm:text-[0.78rem]">
        An independent proposal by Yash Patil, a senior at Del Norte High School. Not an official program of the City,
        the County or the Chamber of Commerce. No cards are on sale.
      </p>
    </aside>
  );
}
