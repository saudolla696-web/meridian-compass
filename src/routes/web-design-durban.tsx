import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { AuditCta } from "../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { SITE_URL } from "../lib/site-content";

const FAQS = [
  {
    q: "Do you work with businesses across greater Durban, or just the CBD?",
    a: "Across the metro — Durban CBD, Umhlanga, Westville, Pinetown, Amanzimtoti, and the surrounding areas. Most of the work happens remotely regardless of exactly where in the metro you're based.",
  },
  {
    q: "Is Durban's market more competitive than smaller KZN towns?",
    a: "Generally, yes — Durban has a larger population and more businesses competing for the same searches, which makes ranking properly matter more, not less. A thin or slow site gets buried faster in a crowded metro than it would in a smaller town.",
  },
  {
    q: "Can you help us show up for a specific Durban suburb search?",
    a: "Yes — being explicit about which suburbs you actually serve, both on the site and in your Google Business Profile, is what lets you show up for suburb-specific searches like 'plumber Westville' rather than only the generic 'plumber Durban.'",
  },
  {
    q: "We're based outside Durban but serve the metro. Does that matter?",
    a: "It's common, and it's something we account for directly — your Google Business Profile service-area settings and your site's location content both need to reflect where you actually operate, not just where your office happens to be.",
  },
];

export const Route = createFileRoute("/web-design-durban")({
  head: () => ({
    meta: [
      { title: "Web Design in Durban | Meridian Digital" },
      {
        name: "description",
        content:
          "Web design, SEO, and Google Business Profile management for Durban businesses — built for how people actually search across the metro, live in days not months.",
      },
      { property: "og:title", content: "Web Design in Durban | Meridian Digital" },
      {
        property: "og:description",
        content: "Websites and search visibility built for Durban's competitive local market.",
      },
      { property: "og:url", content: `${SITE_URL}/web-design-durban` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/web-design-durban` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="label-eyebrow mb-4">Durban</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Web design for <span className="italic text-gold-soft">greater Durban.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Durban is KwaZulu-Natal's biggest, busiest market — which means more customers
              searching, but also more competitors showing up in the same results. A website that
              merely exists isn't enough here. It has to load fast, work properly on a phone, and be
              specific about where in the metro you actually operate.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A metro, not a single market
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                "Durban" covers a lot of ground — the CBD, Umhlanga, Westville, Pinetown,
                Amanzimtoti, and beyond, each with its own local search behaviour. A business that
                only mentions "Durban" generically misses the more specific, often less competitive
                searches tied to individual suburbs. We build sites and Google Business Profiles
                that name the actual areas you serve, not just the city as a whole, so you show up
                for both the broad search and the specific one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What that looks like in practice
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                For a trades business, that might mean a Google Business Profile that lists Pinetown
                and the surrounding suburbs it actually services, not just "Durban." For a
                professional practice near Umhlanga, it means content that mentions the area
                directly rather than assuming the city name alone will carry the search. Small,
                specific details like these are usually the difference between showing up for a
                nearby, motivated search and being lost among every other business that only
                bothered to say "Durban."
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Competing in a crowded market
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                More businesses competing for the same searches means the margin for a slow,
                outdated, or thin website is smaller in Durban than in a smaller town — a customer
                who bounces off your site has three more options to try immediately. That makes the
                fundamentals — mobile speed, a Google Business Profile that's actually optimised,
                and content that answers real questions — matter more here, not less.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What Durban businesses usually get wrong online
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                The most common issue isn't a bad website — it's a site that was built once, years
                ago, and never touched again while the business itself moved premises, added
                services, or expanded into new suburbs. Google Business Profiles list an old address
                or an old service area, the site's contact number has changed without the listing
                catching up, and nobody's checked in months whether the site even loads properly on
                a phone over mobile data on the road. In a market as competitive as Durban's, that
                gap between what the business actually does today and what the internet says about
                it is exactly where customers get lost to a competitor instead.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">How we build it</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Same process everywhere: discovery, build, launch, ongoing care — live in days, not
                months, at R6,500 once-off and R3,200 a month after that. See the full breakdown on
                the{" "}
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
              Durban <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know how findable you are across Durban right now?" />
    </>
  );
}
