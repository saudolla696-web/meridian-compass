import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { AuditCta } from "../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { SITE_URL, buildBreadcrumbJsonLd } from "../lib/site-content";

const FAQS = [
  {
    q: "Is Ballito part of the Durban metro for search purposes?",
    a: "No — it falls under KwaDukuza municipality, genuinely separate from the eThekwini metro that covers Durban and Umhlanga. We build your Google Business Profile and content around Ballito and the North Coast specifically, not as a Durban suburb.",
  },
  {
    q: "Do you cover the wider North Coast, like Salt Rock and Sheffield Beach?",
    a: "Yes — they're part of the same effective market as Ballito, and we name the specific towns you actually serve rather than relying on 'Ballito' alone to carry every nearby search.",
  },
  {
    q: "Does the December holiday surge actually affect our SEO approach?",
    a: "It affects what matters most in that window specifically — an accurate, fast, mobile-friendly Google Business Profile and site become disproportionately valuable when search volume spikes with visitors who have no prior familiarity with local businesses.",
  },
  {
    q: "We're a newer business without years of reputation — does that put us at a disadvantage?",
    a: "Less than you'd think in Ballito specifically — with so many new residents, a lot of the market is making first-time choices with no existing loyalty to established businesses, which narrows the gap a strong website can close.",
  },
];

export const Route = createFileRoute("/web-design-ballito")({
  head: () => ({
    meta: [
      { title: "Web Design in Ballito | Meridian Digital" },
      {
        name: "description",
        content:
          "Web design, SEO, and Google Business Profile management for Ballito and the North Coast — built for a fast-growing coastal market, live in days not months.",
      },
      { property: "og:title", content: "Web Design in Ballito | Meridian Digital" },
      {
        property: "og:description",
        content: "Websites built for Ballito and the North Coast's fast-growing market.",
      },
      { property: "og:url", content: `${SITE_URL}/web-design-ballito` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/web-design-ballito` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Web Design Ballito", path: "/web-design-ballito" },
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
            <div className="label-eyebrow mb-4">Ballito</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Web design for <span className="italic text-gold-soft">the North Coast.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Ballito is one of the fastest-growing towns on the KwaZulu-Natal coast — a wave of new
              residents relocating from Durban and further afield, a strong holiday and second-home
              market, and a local economy that's expanded well beyond its beach-town origins. A
              business here is often competing for customers who are new to the area and actively
              searching for who to trust.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A different municipality, a different local market
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Ballito falls under KwaDukuza, not the eThekwini metro that covers Durban and
                Umhlanga — a distinction that matters for how your Google Business Profile and local
                content should be structured, since it's genuinely a separate local market with its
                own service-area logic, not just another Durban suburb.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Built for new residents finding their feet
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A large share of Ballito's population moved there relatively recently, which means a
                steady stream of people searching for a plumber, an attorney, a doctor, or a school
                with no existing local knowledge or word-of-mouth to fall back on. That's a genuine
                advantage for a business with a strong online presence — the usual reliance on
                reputation and referral carries a lot less weight when much of your potential
                customer base just arrived.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                The seasonal surge, and building for it
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Ballito's population swells significantly over the December holiday period, and
                search behaviour swells with it — short-term, high-intent searches from visitors
                needing anything from a restaurant booking to an emergency repair. A site and Google
                Business Profile that are accurate and fast matter more in that window than almost
                any other time of year, and it's exactly when an outdated listing costs the most.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What we usually find here
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Ballito is growing fast enough that a lot of local businesses have websites that
                haven't kept pace — built for a smaller town a few years ago, before the current
                wave of development and new residents. A Google Business Profile that still reflects
                an older, quieter Ballito undersells a business that's actually operating in one of
                the fastest-changing markets on the coast.
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
              Ballito <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know how findable you are across the North Coast right now?" />
    </>
  );
}
