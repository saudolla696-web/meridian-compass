export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body: string[];
};

// [FILL: replace this placeholder entry with real posts. It exists only to verify
// the listing page and post template render correctly — remove it before launch,
// and remember to add each real post's URL to public/sitemap.xml once published.]
export const INSIGHTS: Insight[] = [
  {
    slug: "example-insight-replace-me",
    title: "Example Insight — Replace This Content",
    excerpt:
      "This is placeholder content used to verify the /insights listing page and post template render correctly. Replace or remove before launch.",
    date: "2026-08-20",
    category: "Placeholder",
    body: [
      "This is a placeholder paragraph used to verify that the post template — heading, date, category, and body copy — renders correctly against the design system.",
      "Replace this entire entry in src/lib/insights-content.ts with real posts once content is ready, and remove this placeholder from the INSIGHTS array.",
    ],
  },
];
