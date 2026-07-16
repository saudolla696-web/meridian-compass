export const SITE_URL = "https://www.meridiandigital.co.za";

export const SERVICES = [
  {
    bearing: "000°",
    dir: "North",
    title: "Web Design",
    body: "A fast, professional site that works on every phone and turns visitors into phone calls. Live in days, not months.",
  },
  {
    bearing: "090°",
    dir: "East",
    title: "SEO",
    body: "Show up when people in your area search for what you do. Rankings you can see, explained in plain language.",
  },
  {
    bearing: "180°",
    dir: "South",
    title: "Google Business Profile",
    body: "The map listing that drives local calls. Set up properly, optimised, and kept active.",
  },
  {
    bearing: "270°",
    dir: "West",
    title: "AEO",
    body: 'When people ask AI assistants "who\'s a good [your trade] near me," your business is the answer. We structure your site so machines can recommend you.',
  },
];

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
    q: "What exactly is the free audit?",
    a: "Ten specific checks on your website and Google presence — speed, mobile experience, whether Google can actually read your pages, how you show up on Maps, and whether AI assistants can find you. You get the three most important findings in plain language, with no obligation.",
  },
  {
    q: "What is Answer Engine Optimisation (AEO), in plain terms?",
    a: "SEO gets you ranked in a list of links. AEO gets your business named directly when someone asks an AI assistant a question — 'best coffee shop in Pietermaritzburg,' 'Toyota dealership near Harding.' It's structuring your site and listings so the answer engines have a clear, correct answer to give, with your business as the source.",
  },
  {
    q: "Do you have client case studies?",
    a: "One published so far — our own security division, fully disclosed, because we'd rather show you honest work than pad this page. Founding clients get founder pricing partly because their results become the case studies. Early has its advantages.",
  },
  {
    q: "What happens once the Founding Client rate is no longer available?",
    a: "Founding pricing is tied to the case-study trade: when we publish results for a business, that page fills up. Once it does, pricing moves to standard rates for new clients. Existing Founding Clients keep their locked R6,500 build price and, if they've taken it, the R3,200 monthly retainer rate for the full 12 months regardless.",
  },
  {
    q: "Do you only work with businesses in KwaZulu-Natal?",
    a: "KZN is home turf and where we meet clients in person, but the build process itself works anywhere in South Africa. If you're outside the area, ask — most of the work happens the same way regardless of postcode.",
  },
  {
    q: "I already have a website. Is there a point talking to you?",
    a: "Usually, yes — most existing sites we audit are missing Google Business Profile setup, have no AEO structure, or haven't been touched since they were built. We'll tell you plainly what's working and what isn't before recommending anything.",
  },
  {
    q: "Do I have to take the R3,200 monthly retainer?",
    a: "No. The build is a once-off R6,500 with no ongoing obligation. The retainer is optional — it covers ongoing SEO and AEO maintenance, Google Business Profile management, CRM upkeep, and a direct line to make changes, so the site doesn't go live and get abandoned. Take it if that's useful to you; skip it if it isn't.",
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
