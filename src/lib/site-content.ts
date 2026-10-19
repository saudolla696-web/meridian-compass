export const SITE_URL = "https://www.meridiandigital.co.za";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export const SERVICES = [
  {
    bearing: "000°",
    dir: "North",
    title: "Web Design",
    body: "A fast, professional site that works on every phone and turns visitors into phone calls. Live in days, not months.",
    to: "/services/web-design",
  },
  {
    bearing: "090°",
    dir: "East",
    title: "SEO",
    body: "Show up when people in your area search for what you do. Rankings you can see, explained in plain language.",
    to: "/services/seo",
  },
  {
    bearing: "180°",
    dir: "South",
    title: "Google Business Profile",
    body: "The map listing that drives local calls. Set up properly, optimised, and kept active.",
    to: "/services/google-business-profile",
  },
  {
    bearing: "270°",
    dir: "West",
    title: "AEO",
    body: 'When people ask AI assistants "who\'s a good [your trade] near me," your business is the answer. We structure your site so machines can recommend you.',
    to: "/services/aeo",
  },
] as const;

export const STEPS = [
  {
    title: "Chart",
    body: "We map your business, your customers, and your competitors before a single pixel is placed.",
  },
  {
    title: "Build",
    body: "Your site takes shape in days, not months — brand-matched, written with intent, built on modern infrastructure.",
  },
  {
    title: "Calibrate",
    body: "SEO, AEO, Google Business Profile, and CRM are wired in, so the build doesn't sit idle the moment it's live.",
  },
  {
    title: "Launch",
    body: "You go live — and we stay on, checking the instruments every month so growth doesn't quietly stall.",
  },
];

export const FAQS = [
  {
    q: "How fast is 'days, not months'?",
    a: "Most builds go live within the first week. Speed comes from a modern toolchain and a tight process, not from cutting corners — you'll see the site before it launches and nothing goes live without your sign-off.",
  },
  {
    q: "What is the Visibility Audit?",
    a: "It is a R1,500 once-off review for businesses with an existing website. We check technical health, local search presence and AI visibility before recommending a monthly plan. If you proceed, the fee is credited toward your first month.",
  },
  {
    q: "What is Answer Engine Optimisation (AEO), in plain terms?",
    a: "SEO gets you ranked in a list of links. AEO gets your business named directly when someone asks an AI assistant a question — 'best coffee shop in Pietermaritzburg,' 'Toyota dealership near Harding.' It's structuring your site and listings so the answer engines have a clear, correct answer to give, with your business as the source.",
  },
  {
    q: "Do you have client case studies?",
    a: "Yes — including Ghost Portuguese Inspired in Ballito and our own security division, fully disclosed. We'd rather show you honest work than pad the page.",
  },
  {
    q: "How does the growth bonus work?",
    a: "On Get Chosen and SEO + AI Growth, we use a dedicated tracked call and lead number. A R75 bonus applies to each tracked lead above the agreed monthly baseline, capped monthly.",
  },
  {
    q: "Do you only work with businesses in KwaZulu-Natal?",
    a: "No — we work with businesses across South Africa. KwaZulu-Natal is home turf and where we meet clients in person, but the build process itself works the same way regardless of postcode.",
  },
  {
    q: "I already have a website. Is there a point talking to you?",
    a: "Usually, yes — most existing sites we review are missing Google Business Profile setup, have no AEO structure, or haven't been touched since they were built. Start with the R1,500 Visibility Audit and we’ll tell you plainly what’s working before recommending anything.",
  },
  {
    q: "Is there a contract on the monthly plans?",
    a: "SEO Essentials is R3,500 per month with no lock-in: you can cancel anytime. We’ll explain the terms of any other package clearly before work begins.",
  },
];

export type CaseStudy = {
  id: string;
  domain: string;
  initials: string;
  name: string;
  meta: string;
  body: string;
  image?: string;
  /** One-line affiliation disclosure shown on the case-studies index card. */
  disclosureLine?: string;
  /** Full-page structured content. If present, the case-study page renders
   * these sections instead of the plain `body` paragraph. */
  disclosure?: string;
  brief?: string;
  whatWeBuilt?: string;
  trustEngineering?: string;
  results?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ghost-portuguese-inspired",
    domain: "ghostportugueseinspired.co.za",
    initials: "GPI",
    name: "Ghost Portuguese Inspired",
    meta: "Portuguese-Inspired Restaurant · Ballito, KwaZulu-Natal",
    body: "Full website build for a SANHA-certified Halaal restaurant in Ballito — designed to bring the brand's flame-grilled food, reservation journey, and local presence together in one memorable experience.",
    image: "/proof-ghost-portuguese-inspired.png",
    brief:
      "Create a premium digital home for Ghost Portuguese Inspired that reflects its Portuguese soul and Ballito heart, while making it effortless for hungry guests to explore the menu, reserve a table, and find the restaurant.",
    whatWeBuilt:
      "A bold, mobile-first restaurant website that leads with the food and brand story, gives guests clear paths to the menu and table enquiries, and keeps key practical details — including location, Halaal certification, and WhatsApp contact — immediately accessible.",
    trustEngineering:
      "SANHA-certified Halaal dining is made visible from the first screen, alongside the restaurant's Gregory Park location and direct contact route. These details give new guests the confidence to choose Ghost before they even arrive.",
    results:
      "The new site gives Ghost a distinctive, conversion-focused home for its Ballito audience — built to turn local discovery into menu exploration, table enquiries, and visits.",
  },
  {
    id: "interceptor-rapid-response",
    domain: "interceptorsecurity.co.za",
    initials: "IRR",
    name: "Interceptor Rapid Response",
    meta: "PSIRA-Registered Commercial Security · KwaZulu-Natal",
    body: "Full site build for a commercial guarding and access-control provider — service breakdowns, coverage-area pages, and a capability statement download, live and verified at interceptorsecurity.co.za.",
    image: "/proof-interceptor.jpg",
    disclosureLine: "Our own security division — built the way we'd build yours.",
    disclosure:
      "Full disclosure: Interceptor Rapid Response is our own commercial security division within the Meridian Holdings Group. We're showing it because it's the most honest demonstration we can offer — this is how we build when it's our own money and our own reputation on the line. Your site gets built the same way.",
    brief:
      "Reposition a PSIRA-registered security company toward commercial manned guarding (business parks, shopping centres, industrial multi-tenants) and give it a web presence that wins procurement-level trust.",
    whatWeBuilt:
      "Nine pages — home, about, coverage areas, capability statement, blog, insights, contact, plus privacy policy and terms of service — mobile-first, with WhatsApp integration pre-filled for site-assessment enquiries and a downloadable capability statement for procurement-level review.",
    trustEngineering:
      "PSIRA registration (number 4509059) displayed prominently across the site, a downloadable capability statement, and coverage-area detail built for corporate and business-park decision-makers — the same regulatory-trust-signal approach we bring to licensed trades: PIRB-registered plumbers, DoL-registered electricians, FSP-licensed brokers.",
    results:
      "The rebuilt site went live in May 2026. We'll publish traffic and enquiry numbers here as they accumulate — real figures only, the same standard we'll hold your reporting to.",
  },
];
