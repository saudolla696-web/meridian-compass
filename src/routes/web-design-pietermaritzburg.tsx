import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { AuditCta } from "../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { SITE_URL } from "../lib/site-content";

const FAQS = [
  {
    q: "Do you serve areas around Pietermaritzburg too, like the Midlands?",
    a: "Yes — Hilton, Howick, and the wider Midlands area are all part of the same effective market as Pietermaritzburg, and we build your site and Google Business Profile to reflect that rather than treating the city as an isolated market.",
  },
  {
    q: "Is Pietermaritzburg's market different from Durban's?",
    a: "It tends to be smaller and more relationship-driven, with a strong professional-services and public-sector presence given its role as the provincial capital. That often means slightly less search competition, but it also means credibility and local reputation carry real weight — the website needs to reflect that, not just chase keywords.",
  },
  {
    q: "We're a professional services firm here — does that change the approach?",
    a: "It shapes the emphasis. Pietermaritzburg has a notable concentration of legal, financial, and government-adjacent businesses, given the provincial legislature and university presence — for those firms, credentials and professional presentation tend to matter as much as raw search volume.",
  },
  {
    q: "Can you help us rank specifically for Pietermaritzburg searches, not just KZN generally?",
    a: "Yes — being explicit about Pietermaritzburg and the specific suburbs or nearby towns you serve, in both your content and Google Business Profile, is what separates showing up for a specific local search from being lost in generic province-wide results.",
  },
];

export const Route = createFileRoute("/web-design-pietermaritzburg")({
  head: () => ({
    meta: [
      { title: "Web Design in Pietermaritzburg | Meridian Digital" },
      {
        name: "description",
        content:
          "Web design, SEO, and Google Business Profile management for Pietermaritzburg and Midlands businesses — built for the capital's professional-services market, live in days not months.",
      },
      { property: "og:title", content: "Web Design in Pietermaritzburg | Meridian Digital" },
      {
        property: "og:description",
        content: "Websites built for Pietermaritzburg's professional and civic market.",
      },
      { property: "og:url", content: `${SITE_URL}/web-design-pietermaritzburg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/web-design-pietermaritzburg` }],
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
            <div className="label-eyebrow mb-4">Pietermaritzburg</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Web design for <span className="italic text-gold-soft">the capital.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              As KwaZulu-Natal's provincial capital and a university city, Pietermaritzburg has a
              strong concentration of legal, financial, and public-sector businesses alongside its
              trades and retail. Reputation carries real weight here — the website needs to reflect
              that credibility, not just chase search volume.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A capital city with a distinct character
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Pietermaritzburg's role as the seat of the provincial legislature and home to a
                university campus gives it a business mix that skews more toward professional
                services, education, and public-sector-adjacent work than a purely commercial metro.
                That shapes what "being found online" actually needs to look like here — often less
                about outright search volume, more about presenting the kind of credibility that
                matters to a client doing due diligence before they commit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A closer-knit market than Durban's
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Pietermaritzburg is a smaller, more relationship-driven market than Durban's — word
                travels, and reputation matters as much online as it does in person. That often
                means somewhat less raw search competition, but it raises the bar on how
                professional and credible your site needs to look, since a prospective client
                checking you out is often doing so on the strength of a personal recommendation they
                want to confirm, not a cold search.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Serving the Midlands, not just the city
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Pietermaritzburg sits at the edge of the KZN Midlands, and a lot of businesses here
                genuinely serve Hilton, Howick, and the surrounding towns as well as the city
                itself. We build the site and Google Business Profile to name those areas explicitly
                rather than treating Pietermaritzburg as an isolated market — so you show up for
                searches from the wider region your business actually reaches.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What we usually find here
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A lot of established Pietermaritzburg businesses have strong local reputations built
                over years, and websites that haven't kept pace with that reputation — a site that
                still reads like it was built for a smaller, pre-digital version of the business, or
                a Google Business Profile that was claimed once and never touched again. For firms
                where credibility does most of the work of winning a client, that gap matters:
                someone checking you out online should find a site that matches the seriousness of
                your actual practice, not one that undersells it.
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
              Pietermaritzburg <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know how findable you are in Pietermaritzburg right now?" />
    </>
  );
}
