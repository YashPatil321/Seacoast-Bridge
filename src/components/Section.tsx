type Props = {
  id?: string;
  index: string;
  label: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tone?: "plain" | "tint";
};

/** Planning-document section: a numbered label column beside the content. */
export function Section({ id, index, label, title, children, className = "", tone = "plain" }: Props) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      aria-label={title ? undefined : label}
      className={`${tone === "tint" ? "bg-tint" : ""} ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-14 sm:px-6 sm:py-20 md:grid-cols-[11rem_1fr] md:gap-10 lg:py-24">
        <div data-reveal className="md:pt-2">
          <p className="label flex items-center gap-3 text-accent md:flex-col md:items-start md:gap-2">
            <span className="num text-[0.8rem]">{index}</span>
            <span className="h-px w-8 bg-amber md:w-10" aria-hidden="true" />
            <span className="text-muted">{label}</span>
          </p>
        </div>
        <div className="min-w-0">
          {title && (
            <h2 id={headingId} data-reveal className="max-w-3xl text-[1.85rem] font-semibold sm:text-[2.6rem]">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
