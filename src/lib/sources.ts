export type Source = {
  id: string;
  outlet: string;
  title: string;
  url: string;
};

export const sources: Source[] = [
  {
    id: "kpbs-500m",
    outlet: "KPBS, Sept 15, 2026",
    title: "Report: San Diego County misses out on up to $500M each year due to Tijuana River pollution",
    url: "https://www.kpbs.org/news/economy/2026/09/15/report-san-diego-county-misses-out-on-up-to-500m-each-year-due-to-tijuana-river-pollution",
  },
  {
    id: "nbc-chief",
    outlet: "NBC 7 San Diego",
    title: "San Diego County names new pollution crisis chief",
    url: "https://www.nbcsandiego.com/news/local/san-diego-county-names-new-pollution-crisis-chief/4089183/",
  },
  {
    id: "vosd-south-county",
    outlet: "Voice of San Diego, Apr 2, 2026",
    title: "South County Report: A new front in the sewage battle",
    url: "https://voiceofsandiego.org/2026/04/02/south-county-report-a-new-front-in-the-sewage-battle/",
  },
  {
    id: "spokesman-studies",
    outlet: "The Spokesman-Review, June 1, 2026",
    title: "San Diego County launches 2 studies to measure toll",
    url: "https://www.spokesman.com/stories/2026/jun/01/san-diego-county-launches-2-studies-to-measure-tol/",
  },
  {
    id: "fox5-impact",
    outlet: "FOX 5 San Diego",
    title: "Tijuana sewage crisis: economic impact",
    url: "https://fox5sandiego.com/news/tijuana-sewage-crisis-economic-impact/amp/",
  },
  {
    id: "kpbs-emergency",
    outlet: "KPBS, June 27, 2023",
    title: "Supervisors OK emergency declaration on cross-border pollution",
    url: "https://www.kpbs.org/news/local/2023/06/27/supervisors-ok-emergency-declaration-on-cross-border-pollution",
  },
  {
    id: "10news-reopens",
    outlet: "10News",
    title: "Imperial Beach reopens after 1,000-day closure due to water contamination",
    url: "https://www.10news.com/news/local-news/south-bay-news/imperial-beach-reopens-after-1-000-day-closure-due-to-water-contamination",
  },
  {
    id: "10news-closed",
    outlet: "10News",
    title: "Imperial Beach shoreline closed due to sewage contamination",
    url: "https://www.10news.com/news/local-news/imperial-beach-shoreline-closed-due-to-sewage-contamination-092726",
  },
  {
    id: "wateronline-update",
    outlet: "Water Online",
    title: "EPA Tijuana sewage crisis quarterly update: South Bay plant expansion contract awarded",
    url: "https://www.wateronline.com/doc/trump-epa-tijuana-sewage-crisis-quarterly-update-phase-of-river-gates-under-construction-parallel-gravity-line-completed-south-bay-plant-expansion-contract-awarded-0001",
  },
  {
    id: "epa-milestone",
    outlet: "U.S. EPA",
    title: "EPA and U.S. IBWC announce major milestone delivering 100% solution to Tijuana River sewage",
    url: "https://www.epa.gov/newsreleases/epa-and-us-ibwc-announce-major-milestone-delivering-100-solution-tijuana-river-sewage",
  },
  {
    id: "ibank-sbfc",
    outlet: "IBank",
    title: "Small Business Finance Center fact sheet (PDF)",
    url: "https://cdn.ibank.ca.gov/wp-content/uploads/2022/12/SBFC-Fact-Sheet.pdf",
  },
  {
    id: "ibank-program",
    outlet: "IBank",
    title: "Small business loan guarantee program page",
    url: "https://ibank.ca.gov/?p=9518",
  },
  {
    id: "carlsbad-tbid",
    outlet: "City of Carlsbad",
    title: "Published city document, Carlsbad tourism business improvement district",
    url: "https://carlsbadca.gov/home/showpublisheddocument/12780/638120522112970000",
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s])) as Record<string, Source>;

export const CONTACT_EMAIL = "yashp.d39@gmail.com";

/** Countdown target for the South Bay plant expansion: Dec 31, 2027, Pacific time. */
export const TARGET_ISO = "2027-12-31T00:00:00-08:00";

/**
 * Optional owner quote for "What I heard on Seacoast Drive".
 * TODO(Yash): fill in only with a quote you have written permission to use.
 * The block stays hidden while `text` is empty.
 */
export const ownerQuote: { text: string; attribution: string } = {
  text: "",
  attribution: "",
};
