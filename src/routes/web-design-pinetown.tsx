import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { AuditCta } from "../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { SITE_URL, buildBreadcrumbJsonLd } from "../lib/site-content";

const FAQS = [
  {
    q: "Is Pinetown mainly an industrial area, or does this apply to retail and services too?",
    a: "Both — Pinetown's industrial base drives a lot of the local economy, but the area also has a strong retail, trades, and professional-services presence built around serving that industrial workforce and the surrounding suburbs.",
  },
  {
    q: "Do you serve businesses in Westmead and New Germany specifically?",
    a: "Yes — they're effectively part of the same market as Pinetown, and we build your content and Google Business Profile to reflect the specific industrial nodes and suburbs you actually serve.",
  },
  {
    q: "We're a supplier to other businesses, not the public — does SEO still matter?",
    a: "Yes, though the approach shifts — B2B searches tend to be more specific (product, service, or trade terms) and less about consumer trust signals, but showing up for those specific searches and having a credible, informative site still directly affects whether a buyer picks up the phone.",
  },
  {
    q: "Can you help us compete with bigger businesses that have more marketing budget?",
    a: "Often, yes — a lot of local search ranking comes down to fundamentals (site speed, accurate listings, relevant content) rather than budget, and bigger competitors frequently neglect exactly those basics.",
  },
];

export const Route = createFileRoute("/web-design-pinetown")({
  head: () => ({
    meta: [
      { title: "Web Design in Pinetown | Meridian Digital" },
      {
        name: "description",
        content:
          "Web design, SEO, and Google Business Profile management for Pinetown businesses — built for the area's trades, manufacturing, and SME market, live in days not months.",
      },
      { property: "og:title", content: "Web Design in Pinetown | Meridian Digital" },
      {
        property: "og:description",
        content: "Websites built for Pinetown's trades, manufacturing, and SME market.",
      },
      { property: "og:url", content: `${SITE_URL}/web-design-pinetown` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/web-design-pinetown` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Web Design Pinetown", path: "/web-design-pinetown" },
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
            <div className="label-eyebrow mb-4">Pinetown</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Web design for{" "}
              <span className="italic text-gold-soft">Pinetown's trade economy.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Pinetown has been one of KwaZulu-Natal's key industrial and manufacturing hubs for
              decades, and that history still shapes the business mix today — trades, light
              manufacturing, and owner-run SMEs alongside its retail and residential areas. It's a
              market where being found for a practical, specific search matters more than looking
              impressive in the abstract.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                An industrial heartland with a trades economy to match
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                The Pinetown, Westmead, and New Germany industrial corridor has anchored
                manufacturing, printing, and light industry in the area for generations, and that's
                produced a dense local economy of trades, suppliers, and service businesses built
                around it. For a plumber, electrician, or supplier working this corridor, the
                customer searching for you is usually specific and practical — they want a phone
                number and a service area, not a mission statement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Built for practical, high-intent local searches
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Pinetown customers searching for a trade or service business tend to know exactly
                what they need and want it confirmed fast — is this business licensed, do they cover
                my suburb, can I reach them right now. A slow site or a Google Business Profile with
                outdated hours loses that search to whichever competitor answers those questions
                first.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Serving Pinetown's surrounding suburbs and industrial nodes
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Businesses based in Pinetown often genuinely serve Westmead, New Germany,
                Queensburgh, and the wider Outer West corridor — and we build the site and Google
                Business Profile to name those areas and industrial nodes explicitly, so you show up
                for suburb- and estate-specific searches, not just the general "Pinetown" term.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What we usually find here
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A lot of established Pinetown businesses have been trading successfully for years on
                reputation alone, with a website that was built once and never revisited — no
                mention of current licensing, an outdated service list, or a Google Business Profile
                that's barely been touched since it was claimed. That gap matters more than it used
                to, because more of that first-time trust-building now happens online before the
                phone ever rings.
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
              Pinetown <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know how findable you are across Pinetown right now?" />
    </>
  );
}
