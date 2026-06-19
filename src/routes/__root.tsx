import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconAsset from "../assets/favicon-64.png.asset.json";
import appleTouchAsset from "../assets/apple-touch-icon.png.asset.json";

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Meridian Digital",
  telephone: "+27658839408",
  areaServed: "KwaZulu-Natal, South Africa",
  parentOrganization: { "@type": "Organization", name: "Meridian Holdings Group" },
  url: "/",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "If you build it in a day, how is it not cheap?",
      acceptedAnswer: { "@type": "Answer", text: "Speed comes from the workflow, not from cutting corners — modern AI-assisted tools handle the scaffolding so the time we'd normally spend on boilerplate goes into your actual brand, copy, and structure instead. The build is fast. The thinking behind it isn't rushed." },
    },
    {
      "@type": "Question",
      name: "What is Answer Engine Optimisation (AEO), in plain terms?",
      acceptedAnswer: { "@type": "Answer", text: "SEO gets you ranked in a list of links. AEO gets your business named directly when someone asks an AI assistant a question — 'best coffee shop in Pietermaritzburg,' 'Toyota dealership near Harding.' It's structuring your site and listings so the answer engines have a clear, correct answer to give, with your business as the source." },
    },
    {
      "@type": "Question",
      name: "What happens once the Founding Client Programme is full?",
      acceptedAnswer: { "@type": "Answer", text: "The R6,500 once-off and R3,200 per month rate is locked for the first ten businesses only. After that, pricing moves to standard rates. Existing Founding Clients keep their locked terms for the full 12 months regardless." },
    },
    {
      "@type": "Question",
      name: "Do you only work with businesses in KwaZulu-Natal?",
      acceptedAnswer: { "@type": "Answer", text: "KZN is home turf and where we meet clients in person, but the build process itself works anywhere in South Africa. If you're outside the area, ask — most of the work happens the same way regardless of postcode." },
    },
    {
      "@type": "Question",
      name: "I already have a website. Is there a point talking to you?",
      acceptedAnswer: { "@type": "Answer", text: "Usually, yes — most existing sites we audit are missing Google Business Profile setup, have no AEO structure, or haven't been touched since they were built. We'll tell you plainly what's working and what isn't before recommending anything." },
    },
    {
      "@type": "Question",
      name: "What does the R3,200 monthly retainer actually cover?",
      acceptedAnswer: { "@type": "Answer", text: "Ongoing SEO and AEO maintenance, Google Business Profile management, CRM upkeep, and a direct line to make changes — not a support ticket queue. The site doesn't go live and get abandoned." },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A1628" },
      { title: "Meridian Digital — Web Design, SEO & AEO in KwaZulu-Natal" },
      { name: "description", content: "Meridian Digital builds brand-true websites, search visibility, and answer-engine presence for KwaZulu-Natal businesses. Engineered in a day, built to be found, chosen, and remembered." },
      { property: "og:title", content: "Meridian Digital — Web Design, SEO & AEO in KwaZulu-Natal" },
      { property: "og:description", content: "Websites, search presence, and growth systems engineered in a single day — built to be found, chosen, and remembered." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      // og:image needs a real hosted image (not data URI) once this is live.
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meridian Digital" },
      { name: "twitter:description", content: "Web design, SEO & AEO for KwaZulu-Natal businesses." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "/" },
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      { rel: "apple-touch-icon", href: appleTouchAsset.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Raleway:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(professionalServiceJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
