import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description =
  "An independent proposal to keep Imperial Beach small businesses open until the Tijuana River sewage fix is finished: a Come Back Card and a county-backed bridge loan guarantee.";

export const metadata: Metadata = {
  metadataBase: new URL("https://seacoast-bridge.vercel.app"),
  title: {
    default: "Seacoast Bridge · Keep Seacoast Drive open until the water clears",
    template: "%s · Seacoast Bridge",
  },
  description,
  applicationName: "Seacoast Bridge",
  authors: [{ name: "Yash Patil" }],
  openGraph: {
    type: "website",
    siteName: "Seacoast Bridge",
    title: "Keep Seacoast Drive open until the water clears.",
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keep Seacoast Drive open until the water clears.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3a3b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${familjen.variable} ${newsreader.variable} ${plexMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="skip-link sr-only z-50 bg-amber px-4 py-2 font-mono text-sm text-[#0e2223] focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
