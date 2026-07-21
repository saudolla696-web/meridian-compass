import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "How long until we see results?",
    a: "Honestly — months, not weeks. SEO is not instant, and anyone who promises page-one rankings in days is either exaggerating or doing something Google will eventually penalise. Most local businesses see meaningful movement within two to four months, with steady improvement after that as the work compounds.",
  },
  {
    q: "What does the monthly reporting actually look like?",
    a: "Plain language, not a wall of dashboard screenshots. You'll see which searches you're showing up for, whether your ranking is moving up or down, and what we changed that month — not jargon you have to decode yourself.",
  },
  {
    q: "Do you guarantee a specific ranking?",
    a: "No, and you should be wary of anyone who does — Google's algorithm isn't something any agency controls. What we can control is doing the work properly: technical health, content that answers real searches, and local signals like your Google Business Profile.",
  },
  {
    q: "Is SEO different from paid ads?",
    a: "Yes. SEO earns your place in the free/organic results through site quality and relevance. Paid ads buy a temporary slot at the top and stop working the moment you stop paying. SEO takes longer to build but keeps working after it's built.",
  },
  {
    q: "What's included in the R3,200 monthly retainer?",
    a: "Ongoing SEO and AEO maintenance, Google Business Profile management, ongoing technical health checks, and a direct line to us to ask what's working and what isn't — not a support ticket queue.",
  },
];

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "SEO — Local Search Visibility | Meridian Digital" },
      {
        name: "description",
        content:
          "Show up when people in your area search for what you do. SEO for South African businesses, with monthly reporting you can actually understand.",
      },
      { property: "og:title", content: "SEO | Meridian Digital" },
      {
        property: "og:description",
        content: "Show up when people in your area search for what you do.",
      },
      { property: "og:url", content: `${SITE_URL}/services/seo` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services/seo` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Local SEO",
          provider: { "@type": "ProfessionalService", name: "Meridian Digital" },
          areaServed: ["South Africa", "Durban", "Pietermaritzburg"],
          description: "Show up when people in your area search for what you do.",
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
    ],
  }),
  component: SeoPage,
});

function SeoPage() {
  return (
    <>
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="label-eyebrow mb-4">SEO</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Found by the people <span className="italic text-gold-soft">already looking.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Every day, people in your area search for exactly what you sell. Some of them find
              you. Most of them find whoever ranks first — regardless of who actually does better
              work. SEO is the difference between being the answer to that search and being
              invisible to it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What local SEO actually means
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                "SEO" gets used as a catch-all term, but for a local business it comes down to a
                handful of concrete things: does Google understand what you do and where you do it,
                does your site load fast and work on mobile, does your content actually answer the
                questions people are searching, and is your Google Business Profile set up properly.
                Get those right and rankings follow. Skip them and no amount of "SEO magic" will
                make up the difference.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A realistic timeline
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                We'll say this plainly because most agencies won't: SEO takes months, not weeks. The
                technical fixes happen fast, but search engines take time to re-crawl, re-index, and
                trust a site's new signals. Most local businesses start seeing measurable movement
                within two to four months, with the gains compounding from there. Anyone promising
                page-one rankings in days is either exaggerating the claim or using tactics that put
                your site at risk of a penalty later.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Reporting you can actually read
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Every month you get a plain-language update: which searches you're showing up for,
                whether your position is moving up or down, and what we changed that month and why.
                No jargon-filled dashboard exports you have to decode yourself — if a number moved,
                we tell you what it means for your business.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What we usually find on an existing site
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Most existing small business sites we audit have never had proper technical SEO work
                done at all — no meaningful title tags, duplicate or missing meta descriptions,
                images with no alt text, and a sitemap that's either missing or years out of date.
                None of that is unusual, and none of it takes long to fix properly. What takes
                longer is the content and structural work that follows: making sure the site
                actually answers the specific questions your customers are searching, rather than
                describing your business in the abstract terms owners tend to use about themselves.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">How it's priced</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                SEO is bundled into the R3,200 monthly retainer alongside Google Business Profile
                management and AEO — not sold as a separate line item that competes for budget
                against the rest of your online presence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#060D18]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-ivory text-3xl md:text-4xl text-center mb-12">
              SEO <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know where you actually rank right now?" />
    </>
  );
}
