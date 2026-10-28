# Seacoast Bridge

An independent proposal by Yash Patil (Del Norte High School) to keep Imperial Beach small businesses open until the Tijuana River sewage fix is finished.

Live: https://seacoast-bridge.vercel.app

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page: hero with live countdown, why, what I heard, the gap, the plan and money-flow diagram, calculator, support form |
| `/brief` | Full policy brief, print-ready (letter, 0.7in margins) with a "Print or save as PDF" button |
| `/support` | The support form on its own page |
| `/privacy` | Plain-language privacy note |

## How the support form works

There is no database. The form validates in the browser, then opens the visitor's email app with a prefilled note to yashp.d39@gmail.com. The thank-you state shows the note with a "Copy note" button for anyone whose email app doesn't open. Nothing is stored by the site.

## Editing content

- Sources, contact email and countdown target: `src/lib/sources.ts`
- Optional owner quote (hidden while empty): `ownerQuote` in `src/lib/sources.ts`. Only add a quote you have permission to use.
- Landing copy: `src/app/page.tsx`. Brief: `src/app/brief/page.tsx`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Fonts via `next/font`: Familjen Grotesk, Newsreader, IBM Plex Mono. All motion respects `prefers-reduced-motion`.
