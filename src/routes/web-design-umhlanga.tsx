import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { AuditCta } from "../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { SITE_URL, buildBreadcrumbJsonLd } from "../lib/site-content";

const FAQS = [
  {
    q: "Is Umhlanga's market really different from Durban CBD's?",
    a: "Yes — it skews more corporate and hospitality-driven, with a customer base that expects a more polished presentation than a purely local trades market would. The fundamentals are the same; the bar on presentation is higher.",
  },
  {
    q: "Do you serve businesses in La Lucia and Mount Edgecombe too?",
    a: "Yes — they're part of the same effective market as Umhlanga, and we build your Google Business Profile and content to name those areas explicitly rather than treating Umhlanga as an isolated suburb.",
  },
  {
    q: "We're a hospitality business — does that change the approach?",
    a: "It shapes the priorities: a strong mobile experience for visitors searching on the move, clear booking or contact paths, and a Google Business Profile that's actively managed with current hours and photos, since hospitality searches are usually immediate-intent.",
  },
  {
    q: "Can you help us compete against Durban CBD businesses for the same searches?",
    a: "Yes — being specific about Umhlanga, and the corridor up toward Ballito, in your content and listings is what lets you compete on local relevance rather than going head-to-head with every CBD business for a generic citywide term.",
  },
];

export const Route = createFileRoute("/web-design-umhlanga")({
  head: () => ({
    meta: [
      { title: "Web Design in Umhlanga | Meridian Digital" },
      {
        name: "description",
        content:
          "Web design, SEO, and Google Business Profile management for Umhlanga businesses — built for the coast's corporate and hospitality market, live in days not months.",
      },
      { property: "og:title", content: "Web Design in Umhlanga | Meridian Digital" },
      {
        property: "og:description",
        content: "Websites built for Umhlanga's corporate and hospitality market.",
      },
      { property: "og:url", content: `${SITE_URL}/web-design-umhlanga` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/web-design-umhlanga` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Web Design Umhlanga", path: "/web-design-umhlanga" },
          ]),
        ),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="label-eyebrow mb-4">Umhlanga</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Web design for <span className="italic text-gold-soft">the corporate coast.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Umhlanga has grown from a seaside suburb into one of Durban's most competitive
              business addresses — corporate offices moving up the coast from the CBD, a retail and
              hospitality scene built around Gateway and the beachfront, and a customer base that
              expects a polished, professional web presence to match. A site that looks like an
              afterthought stands out here for the wrong reasons.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A business district, not just a beach suburb
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Umhlanga Ridge and the surrounding office parks have pulled a genuine concentration
                of corporate headquarters, financial services firms, and professional practices up
                from the Durban CBD over the past decade — alongside the tourism and hospitality
                businesses the area has always had. That mix means the market here judges
                credibility differently to a purely residential suburb: a thin or generic site
                undercuts a corporate address the way a messy office would.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Built for a higher-expectation audience
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Umhlanga's customer base — corporate clients, affluent residents, and visitors
                staying along the beachfront — tends to research more thoroughly and expect more
                polish before making contact, whether that's booking a table, choosing a
                professional service, or picking a contractor for a coastal property. The site needs
                to look the part: fast, clean, and clearly credible, not just present.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Serving the wider North Coast corridor
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A lot of businesses based in Umhlanga also genuinely serve La Lucia, Mount
                Edgecombe, and further up toward Ballito and the North Coast — and we build the site
                and Google Business Profile to reflect that actual service area rather than treating
                Umhlanga as an isolated postcode, so you show up for the nearby searches too, not
                just the ones that name Umhlanga specifically.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What we usually find here
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                The most common gap isn't a badly designed site — Umhlanga businesses are often more
                design-conscious than most — it's one that hasn't kept up with the area's own
                growth: a Google Business Profile still listing an old suburb boundary, no mention
                of the newer office developments nearby, or a site that reads more like a brochure
                than something built to convert a specific, high-intent local search.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">How we build it</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Same process everywhere: discovery, build, launch, ongoing care — live in days, not
                months, at R6,500 once-off, with an optional R3,200-a-month retainer after that. See
                the full breakdown on the{" "}
                <a
                  href="/services/web-design"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  web design page
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#060D18]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-ivory text-3xl md:text-4xl text-center mb-12">
              Umhlanga <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know how findable you are in Umhlanga right now?" />
    </>
  );
}
