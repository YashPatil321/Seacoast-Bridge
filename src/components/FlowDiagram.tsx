type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string[];
  sub?: string[];
  emphasis?: boolean;
};

type Edge = {
  d: string;
  tone: "amber" | "flow";
  label?: { text: string; x: number; y: number; anchor?: "start" | "middle" | "end" };
  slow?: boolean;
};

type Layout = { w: number; h: number; nodes: Node[]; edges: Edge[]; titleSize: number; subSize: number };

const wide: Layout = {
  w: 1000,
  h: 470,
  titleSize: 19,
  subSize: 14.5,
  nodes: [
    { id: "visitors", x: 20, y: 30, w: 220, h: 80, title: ["Former visitors"] },
    { id: "card", x: 360, y: 30, w: 270, h: 80, title: ["Come Back Card"], sub: ["$50 of credit for $45"] },
    { id: "reserve", x: 20, y: 230, w: 220, h: 80, title: ["County loss reserve"], sub: ["covers 50% of each loss"] },
    { id: "banks", x: 360, y: 230, w: 270, h: 80, title: ["Banks and credit unions"], sub: ["lend through IBank", "on pre-closure revenue"] },
    { id: "biz", x: 740, y: 110, w: 240, h: 110, title: ["Seacoast Drive", "businesses"], emphasis: true },
    { id: "beaches", x: 740, y: 370, w: 240, h: 84, title: ["Beaches reopen"], sub: ["one open summer", "starts repayment"] },
  ],
  edges: [
    { d: "M240 70 H352", tone: "amber" },
    { d: "M630 70 C690 70 690 140 732 140", tone: "amber", label: { text: "cash today", x: 684, y: 56, anchor: "middle" } },
    { d: "M240 270 H352", tone: "flow", slow: true },
    { d: "M630 270 C690 270 690 190 732 190", tone: "amber", label: { text: "loans", x: 684, y: 296, anchor: "middle" } },
    { d: "M860 220 V362", tone: "flow", slow: true },
    { d: "M740 412 H495 V318", tone: "flow", slow: true, label: { text: "loans repaid", x: 618, y: 400, anchor: "middle" } },
  ],
};

const narrow: Layout = {
  w: 360,
  h: 560,
  titleSize: 14.5,
  subSize: 11.5,
  nodes: [
    { id: "visitors", x: 6, y: 8, w: 162, h: 60, title: ["Former visitors"] },
    { id: "reserve", x: 192, y: 8, w: 162, h: 60, title: ["County loss", "reserve"] },
    { id: "card", x: 6, y: 120, w: 162, h: 78, title: ["Come Back Card"], sub: ["$50 of credit for $45"] },
    { id: "banks", x: 192, y: 112, w: 162, h: 94, title: ["Banks and", "credit unions"], sub: ["via IBank, on", "pre-closure revenue"] },
    { id: "biz", x: 60, y: 272, w: 240, h: 74, title: ["Seacoast Drive", "businesses"], emphasis: true },
    { id: "beaches", x: 60, y: 440, w: 240, h: 76, title: ["Beaches reopen"], sub: ["one open summer", "starts repayment"] },
  ],
  edges: [
    { d: "M87 68 V112", tone: "amber" },
    { d: "M273 68 V104", tone: "flow", slow: true },
    { d: "M87 198 C87 236 130 236 130 264", tone: "amber", label: { text: "cash today", x: 12, y: 244, anchor: "start" } },
    { d: "M250 206 C250 240 230 240 230 264", tone: "amber", label: { text: "loans", x: 258, y: 248, anchor: "start" } },
    { d: "M180 346 V432", tone: "flow", slow: true },
    { d: "M300 478 H340 V214", tone: "flow", slow: true, label: { text: "loans repaid", x: 334, y: 400, anchor: "end" } },
  ],
};

function Diagram({ layout, idPrefix, className }: { layout: Layout; idPrefix: string; className: string }) {
  const { w, h, nodes, edges, titleSize, subSize } = layout;
  const titleId = `${idPrefix}-title`;
  const descId = `${idPrefix}-desc`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      <title id={titleId}>How the two bridges move money</title>
      <desc id={descId}>
        Former visitors buy Come Back Cards, which give Seacoast Drive businesses cash today. A county loss reserve
        backs banks and credit unions, which lend through IBank on pre-closure revenue and send loans to the same
        businesses. When the beaches reopen, one open summer starts repayment, and the loans are repaid to the banks.
      </desc>
      <defs>
        <marker id={`${idPrefix}-arrow-amber`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--amber)" />
        </marker>
        <marker id={`${idPrefix}-arrow-flow`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--flow)" />
        </marker>
      </defs>

      {edges.map((e, i) => (
        <g key={i}>
          <path
            d={e.d}
            fill="none"
            stroke={e.tone === "amber" ? "var(--amber)" : "var(--flow)"}
            strokeWidth={2}
            className={`flow-line${e.slow ? " slow" : ""}`}
            markerEnd={`url(#${idPrefix}-arrow-${e.tone})`}
          />
          {e.label && (
            <text
              x={e.label.x}
              y={e.label.y}
              textAnchor={e.label.anchor ?? "middle"}
              fontSize={subSize}
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
              fill={e.tone === "amber" ? "var(--accent-ink)" : "var(--muted)"}
              fontWeight={600}
            >
              {e.label.text.toUpperCase()}
            </text>
          )}
        </g>
      ))}

      {nodes.map((n) => {
        const lineH = titleSize * 1.25;
        const subH = subSize * 1.4;
        const subs = n.sub ?? [];
        const blockH = n.title.length * lineH + subs.length * subH + (subs.length ? 2 : 0);
        const top = n.y + (n.h - blockH) / 2;
        const cx = n.x + n.w / 2;
        return (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={3}
              fill={n.emphasis ? "var(--tint)" : "var(--surface)"}
              stroke={n.emphasis ? "var(--amber)" : "var(--rule)"}
              strokeWidth={n.emphasis ? 2.5 : 1.25}
            />
            {n.emphasis && <rect x={n.x} y={n.y} width={6} height={n.h} fill="var(--amber)" />}
            <text textAnchor="middle" fill="var(--ink)">
              {n.title.map((t, i) => (
                <tspan key={t} x={cx} y={top + i * lineH + lineH * 0.8} fontSize={titleSize} fontWeight={600}>
                  {t}
                </tspan>
              ))}
              {subs.map((t, i) => (
                <tspan
                  key={t}
                  x={cx}
                  y={top + n.title.length * lineH + 2 + i * subH + subH * 0.78}
                  fontSize={subSize}
                  fill="var(--muted)"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function FlowDiagram({ caption = true }: { caption?: boolean }) {
  return (
    <figure className="avoid-break">
      <Diagram layout={wide} idPrefix="flow-wide" className="hidden h-auto w-full sm:block print:block" />
      <Diagram layout={narrow} idPrefix="flow-narrow" className="mx-auto block h-auto w-full max-w-[420px] sm:hidden print:hidden" />
      {caption && (
        <figcaption className="mt-4 font-mono text-xs leading-relaxed text-muted">
          <span className="mr-4 inline-flex items-center gap-2">
            <span className="inline-block h-[2px] w-6 bg-amber" aria-hidden="true" /> Money reaching businesses
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-[2px] w-6" style={{ background: "var(--flow)" }} aria-hidden="true" /> Backing and repayment
          </span>
        </figcaption>
      )}
    </figure>
  );
}
