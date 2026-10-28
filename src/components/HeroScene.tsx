/** Periodic swell path so a 200%-wide strip can loop seamlessly. */
function swell(amp: number, period: number, base: number, width = 2880, height = 120) {
  let d = `M0 ${base}`;
  for (let x = 0; x < width; x += period) d += ` q${period / 4} ${-amp} ${period / 2} 0 t${period / 2} 0`;
  return `${d} V${height} H0 Z`;
}

const pilings = Array.from({ length: 12 }, (_, i) => 1066 + i * 34);

/**
 * Decorative hero backdrop: the sun lowering behind the Imperial Beach pier,
 * a breathing pier light and a slow swell. Pure SVG and CSS; frozen under reduced motion.
 */
export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-0 h-full w-full opacity-30 sm:opacity-60 lg:opacity-100"
      >
        <defs>
          <radialGradient id="sky-glow" cx="0.86" cy="0.46" r="0.5">
            <stop offset="0" stopColor="#d98e2b" stopOpacity="0.28" />
            <stop offset="1" stopColor="#d98e2b" stopOpacity="0" />
          </radialGradient>
          <clipPath id="above-horizon">
            <rect x="0" y="0" width="1440" height="300" />
          </clipPath>
          <linearGradient id="streak" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d98e2b" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d98e2b" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1440" height="640" fill="url(#sky-glow)" />

        <g clipPath="url(#above-horizon)">
          <circle className="sun" cx="1272" cy="288" r="58" fill="#d98e2b" opacity="0.9" />
        </g>

        {/* reflection on the water */}
        <g opacity="0.7">
          <rect x="1227" y="306" width="90" height="3" fill="url(#streak)" />
          <rect x="1242" y="316" width="60" height="3" fill="url(#streak)" />
          <rect x="1253" y="326" width="38" height="2" fill="url(#streak)" />
        </g>

        <line x1="880" y1="300" x2="1440" y2="300" stroke="#9fd0c8" strokeOpacity="0.25" />

        {/* pier */}
        <g stroke="#061f20" strokeWidth="4">
          <line x1="1050" y1="274" x2="1440" y2="274" strokeWidth="7" />
          {pilings.map((x) => (
            <line key={x} x1={x} y1="274" x2={x} y2="318" />
          ))}
          <line x1="1050" y1="262" x2="1440" y2="262" strokeWidth="2" />
          <line x1="1066" y1="274" x2="1066" y2="240" strokeWidth="3" />
        </g>
        <circle className="pier-light" cx="1066" cy="236" r="5" fill="#ffc46b" />
        <circle className="pier-light" cx="1066" cy="236" r="14" fill="#d98e2b" opacity="0.35" />
      </svg>

      {/* swell */}
      <div className="absolute inset-x-0 bottom-0 h-[110px] overflow-hidden">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave absolute bottom-0 left-0 h-full w-[200%]" style={{ animationDuration: "38s" }}>
          <path d={swell(7, 240, 40)} fill="#0c3334" />
        </svg>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave absolute bottom-0 left-0 h-full w-[200%]" style={{ animationDuration: "26s", animationDirection: "reverse" }}>
          <path d={swell(6, 360, 62)} fill="#0b2f30" />
        </svg>
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="wave absolute bottom-0 left-0 h-full w-[200%]" style={{ animationDuration: "18s" }}>
          <path d={swell(5, 180, 86)} fill="#0a2c2d" />
        </svg>
      </div>
    </div>
  );
}
