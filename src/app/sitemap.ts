import type { MetadataRoute } from "next";

const base = "https://seacoast-bridge.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/brief", "/support", "/privacy"].map((p) => ({ url: `${base}${p}` }));
}
