import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { BrowserCard } from "../../components/site/BrowserCard";
import { CASE_STUDIES, SITE_URL } from "../../lib/site-content";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Meridian Digital" },
      {
        name: "description",
        content:
          "Real project work from Meridian Digital — full site builds and rebuilds for KwaZulu-Natal businesses, built the same way every time.",
      },
      { property: "og:title", content: "Case Studies | Meridian Digital" },
      { property: "og:description", content: "A look at how we build. Same route, every time." },
      { property: "og:url", content: `${SITE_URL}/case-studies` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/case-studies` }],
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
        <div className="flex flex-wrap justify-center gap-8">
          {CASE_STUDIES.map((p, i) => (
            <div
              key={p.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-md"
            >
              <BrowserCard p={p} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
