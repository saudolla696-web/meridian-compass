export const SITE_URL = "https://www.meridiandigital.co.za";

export const SERVICES = [
  {
    bearing: "000°",
    dir: "North",
    title: "Web Design & Build",
    body: "A fully built, brand-true website — live in a single day, not a season of revisions. Modern tools, designed like a flagship, not a template.",
  },
  {
    bearing: "090°",
    dir: "East",
    title: "Search Visibility",
    body: "Found by the people already looking for you. We tune your presence for Google's results, Google's map, and the customers nearby who need you today.",
  },
  {
    bearing: "180°",
    dir: "South",
    title: "Systems & CRM",
    body: "A Google Business Profile that converts, and a CRM that remembers every lead so you don't have to. The quiet infrastructure behind real growth.",
  },
  {
    bearing: "270°",
    dir: "West",
    title: "Answer Engine Optimisation",
    body: "The next search engine doesn't scroll — it answers. We structure your business to be the answer an AI gives, not the link it skips past.",
  },
];

export const STEPS = [
  {
    title: "Chart",
    body: "We map your business, your customers, and your competitors before a single pixel is placed.",
  },
  {
    title: "Build",
    body: "Your site takes shape within a day — brand-matched, written with intent, built on modern infrastructure.",
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
    q: "If you build it in a day, how is it not cheap?",
    a: "Speed comes from the workflow, not from cutting corners — modern AI-assisted tools handle the scaffolding so the time we'd normally spend on boilerplate goes into your actual brand, copy, and structure instead. The build is fast. The thinking behind it isn't rushed.",
  },
  {
    q: "What is Answer Engine Optimisation (AEO), in plain terms?",
    a: "SEO gets you ranked in a list of links. AEO gets your business named directly when someone asks an AI assistant a question — 'best coffee shop in Pietermaritzburg,' 'Toyota dealership near Harding.' It's structuring your site and listings so the answer engines have a clear, correct answer to give, with your business as the source.",
  },
  {
    q: "What happens once the Founding Client Programme is full?",
    a: "The R6,500 once-off and R3,200 per month rate is locked for the first ten businesses only. After that, pricing moves to standard rates. Existing Founding Clients keep their locked terms for the full 12 months regardless.",
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
    q: "What does the R3,200 monthly retainer actually cover?",
    a: "Ongoing SEO and AEO maintenance, Google Business Profile management, CRM upkeep, and a direct line to make changes — not a support ticket queue. The site doesn't go live and get abandoned.",
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
  },
];
