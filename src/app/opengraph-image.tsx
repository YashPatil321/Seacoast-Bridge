import { ImageResponse } from "next/og";

export const alt = "Seacoast Bridge: Keep Seacoast Drive open until the water clears.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f3a3b",
          color: "#ffffff",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M3 20 Q16 4 29 20" fill="none" stroke="#d98e2b" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M9 13.4V20M16 10.4V20M23 13.4V20" stroke="#d98e2b" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M2 20h28" stroke="#9fd0c8" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>
            Seacoast&nbsp;<span style={{ color: "#d98e2b" }}>Bridge</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#9fd0c8", letterSpacing: 3, textTransform: "uppercase" }}>
            Imperial Beach · Tijuana River sewage crisis
          </div>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.04, marginTop: 20, maxWidth: 980, letterSpacing: -1.5 }}>
            Keep Seacoast Drive open until the water clears.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 22, color: "#9fd0c8" }}>
          <div style={{ display: "flex" }}>An independent proposal by Yash Patil</div>
          <div style={{ display: "flex", color: "#d98e2b" }}>seacoast-bridge.vercel.app</div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "#d98e2b", display: "flex" }} />
      </div>
    ),
    size,
  );
}
