import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { BrowserCard } from "../../components/site/BrowserCard";
import { CASE_STUDIES, SITE_URL, buildBreadcrumbJsonLd } from "../../lib/site-content";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Case Studies", path: "/case-studies" },
]);

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Web Design & SEO Case Studies | Meridian Digital" },
      {
        name: "description",
        content:
          "See how Meridian Digital builds trust, visibility and conversion paths for South African businesses — including real KZN client work.",
      },
      { property: "og:title", content: "Case Studies | Meridian Digital" },
      { property: "og:description", content: "A look at how we build. Same route, every time." },
      { property: "og:url", content: `${SITE_URL}/case-studies` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/case-studies` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) }],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">Case Studies</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl max-w-3xl mx-auto leading-tight">
              A look at how we build.{" "}
              <span className="italic text-gold-soft">Same route, every time.</span>
            </h1>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          {CASE_STUDIES.map((p, i) => (
            <div key={p.id} className="min-w-0">
              <BrowserCard p={p} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
