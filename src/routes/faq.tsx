import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { FAQS, SITE_URL, buildBreadcrumbJsonLd } from "../lib/site-content";

const faqJsonLd = buildFaqJsonLd(FAQS);
const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Web Design, SEO & AEO FAQs | Meridian Digital" },
      {
        name: "description",
        content:
          "Get straightforward answers on website packages, local SEO, Google Business Profiles, AEO and the Visibility Audit.",
      },
      { property: "og:title", content: "FAQ | Meridian Digital" },
      {
        property: "og:description",
        content: "Straight answers about pricing, Visibility Audits, SEO and AI search.",
      },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <section className="py-28 px-6 bg-[#060D18]">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="label-eyebrow mb-4">FAQ</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl">
              Straight answers, <span className="italic text-gold-soft">no sales script.</span>
            </h1>
          </div>
        </Reveal>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}
