import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SITE_URL } from "../lib/site-content";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { NotFound } from "../components/site/NotFound";

const appleTouchIconUrl = "/apple-touch-icon.png";

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Meridian Digital",
  telephone: "+27658839408",
  areaServed: ["South Africa", "Durban", "Pietermaritzburg"],
  parentOrganization: { "@type": "Organization", name: "Meridian Holdings Group" },
  founder: {
    "@type": "Person",
    name: "Saud Zeyn Olla",
    jobTitle: "Founder",
    sameAs: ["https://www.linkedin.com/in/saud-zeyn-olla-0134a420a/"],
  },
  image: `${SITE_URL}/logo-lockup.png`,
  logo: `${SITE_URL}/logo-mark.png`,
  sameAs: [
    "https://www.linkedin.com/company/meridian-digital-holdings/",
    "https://www.instagram.com/meridian_digital_/",
  ],
  url: SITE_URL,
  // [FILL: street address / suburb if Saud wants a specific town listed as the registered locality]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A1628" },
      { title: "Meridian Digital — Web Design, SEO & AEO in South Africa" },
      {
        name: "description",
        content:
          "Free 10-point audit of your website and Google presence. Meridian Digital builds websites and search visibility for South African businesses — live in days, not months.",
      },
      {
        property: "og:title",
        content: "Meridian Digital — Web Design, SEO & AEO in South Africa",
      },
      {
        property: "og:description",
        content:
          "Websites, search presence, and Google visibility for South African businesses — live in days, not months. Free audit, no obligation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meridian Digital" },
      {
        name: "twitter:description",
        content: "Web design, SEO & AEO for South African businesses.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-64.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIconUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Raleway:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(professionalServiceJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
