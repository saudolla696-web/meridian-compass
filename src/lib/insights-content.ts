export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body: string[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "what-makes-a-small-business-website-convert",
    title: "What Makes a Small Business Website Turn Visits Into Enquiries?",
    excerpt: "Five practical elements that help a South African service-business website earn trust and make the next step obvious.",
    date: "2026-10-19",
    category: "Web Design",
    body: [
      "A good small-business website does not need to be clever. It needs to explain what you do, why a customer should trust you, where you work and what to do next — especially on a phone.",
      "Start with a specific headline, a clear call or WhatsApp action, proof such as reviews or qualifications, and pages for the services people actually search for. Add fast loading, real photos and contact details that match your Google Business Profile.",
      "Before paying for more traffic, make sure the website gives a visitor enough confidence to enquire. More clicks to an unclear site rarely create more leads.",
    ],
  },
  {
    slug: "local-seo-checklist-kzn-businesses",
    title: "Local SEO Checklist for KwaZulu-Natal Businesses",
    excerpt: "The local-search essentials that help your business appear when customers search for your service in Durban, Ballito, Umhlanga and beyond.",
    date: "2026-10-16",
    category: "Local SEO",
    body: [
      "Local SEO starts with consistency. Your business name, address, phone number, service areas and opening hours should match on your website, Google Business Profile and reputable directories.",
      "Build a useful page for every core service and each genuine location you serve. Include real proof, local context and an easy route to call or WhatsApp — not thin pages that simply swap a town name.",
      "Review your Google Business Profile regularly: choose accurate categories, add current images, answer questions and ask satisfied customers for honest reviews. These basics create a stronger foundation than chasing shortcuts.",
    ],
  },
  {
    slug: "how-google-business-profile-drives-local-calls",
    title: "How a Google Business Profile Can Drive More Local Calls",
    excerpt: "Your Maps listing is often the first impression. Here is what to fix before customers choose a competitor.",
    date: "2026-10-10",
    category: "Google Business Profile",
    body: [
      "A Google Business Profile is not a set-and-forget listing. It is a live trust signal that customers use to compare businesses before visiting a website.",
      "Use the correct primary category, complete every service and service-area field, add recent photos and keep opening hours accurate. Link to the most relevant service page on your site, not only the home page.",
      "The biggest conversion wins are usually simple: a working phone number, a monitored review process, clear responses to questions and proof that the listing reflects the business today.",
    ],
  },
  {
    slug: "what-is-aeo-and-why-it-matters-for-local-businesses",
    title: "What Is AEO and Why Does It Matter for Local Businesses?",
    excerpt: "Answer Engine Optimisation helps AI tools understand what your business does, where you operate and why you are a credible answer.",
    date: "2026-10-03",
    category: "AEO",
    body: [
      "Answer Engine Optimisation is the work of making your site easy for AI-assisted search to understand. It does not replace SEO; it builds on the same clear, useful information customers need.",
      "Use precise service descriptions, location information, helpful FAQs, authoritatively written pages and structured data where it fits. Make sure the facts on your website agree with trusted sources such as your Google Business Profile.",
      "The goal is not to manipulate an AI answer. It is to give search systems enough accurate, well-structured evidence to recognise when your business is a relevant recommendation.",
    ],
  },
];
