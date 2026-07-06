import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "How fast is 'days, not months'?",
    a: "Most builds go live within the first week. Speed comes from a modern toolchain and a tight process, not from cutting corners — you'll see the site before it launches and nothing goes live without your sign-off.",
  },
  {
    q: "Do I own the site once it's built?",
    a: "Yes. The domain and hosting arrangement is set up in your name or your business's name, not held hostage on our account. If you ever want to leave, you take the site with you.",
  },
  {
    q: "Can you match my existing branding?",
    a: "If you already have a logo, colours, and fonts, we build around them. If you don't, we'll set brand-true basics as part of the build so the site actually looks like your business, not a template.",
  },
  {
    q: "What happens after launch — is it a one-time thing?",
    a: "The build is once-off (R6,500), but the site needs upkeep to keep performing: security updates, small content changes, and the SEO/AEO/Google Business Profile work that keeps you findable. That's what the R3,200 monthly retainer covers.",
  },
  {
    q: "What if I need changes after the site is live?",
    a: "You message us directly — not a support ticket queue. Small changes are part of the monthly retainer; larger changes get a plain-language quote before we start.",
  },
];

export const Route = createFileRoute("/services/web-design")({
  head: () => ({
    meta: [
      { title: "Web Design — Fast, Mobile-First Sites | Meridian Digital" },
      {
        name: "description",
        content:
          "A fast, professional website that works on every phone and turns visitors into phone calls. Live in days, not months. Web design for KwaZulu-Natal businesses.",
      },
      { property: "og:title", content: "Web Design | Meridian Digital" },
      {
        property: "og:description",
        content: "A site that works on every phone and turns visitors into phone calls.",
      },
      { property: "og:url", content: `${SITE_URL}/services/web-design` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services/web-design` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Web Design",
          provider: { "@type": "ProfessionalService", name: "Meridian Digital" },
          areaServed: ["Durban", "Pietermaritzburg", "KwaZulu-Natal"],
          description:
            "A fast, professional website that works on every phone and turns visitors into phone calls.",
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
    ],
  }),
  component: WebDesignPage,
});

function WebDesignPage() {
  return (
    <>
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="label-eyebrow mb-4">Web Design</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              A site that works as hard as <span className="italic text-gold-soft">you do.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Most small business websites don't lose customers because the business is bad — they
              lose customers because the website is slow, outdated, or doesn't work properly on a
              phone. A visitor who's already decided they need what you sell will leave for a
              competitor in seconds if your site makes them work to trust you. We build sites that
              don't make people work.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Live in days, not months
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A modern toolchain and a tight process mean most builds go live within the first
                week of starting — not the six-to-twelve-week timelines common with traditional web
                agencies. That speed doesn't come from cutting corners. It comes from not wasting
                time on the boilerplate: the time we save on scaffolding goes straight into your
                actual brand, copy, and structure. You see the site before it launches, and nothing
                goes live without your sign-off.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Discovery, build, launch, care
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light mb-4">
                <strong className="text-ivory">Discovery</strong> — we map your business, your
                customers, and what your competitors are already doing before a single page is
                designed.
              </p>
              <p className="text-ivory/70 leading-relaxed font-light mb-4">
                <strong className="text-ivory">Build</strong> — your site takes shape, written with
                intent rather than filler copy, on infrastructure built for speed rather than a
                bloated page builder.
              </p>
              <p className="text-ivory/70 leading-relaxed font-light mb-4">
                <strong className="text-ivory">Launch</strong> — you go live once you've reviewed
                and approved it, with search visibility, Google Business Profile, and answer-engine
                structure already wired in rather than bolted on afterward.
              </p>
              <p className="text-ivory/70 leading-relaxed font-light">
                <strong className="text-ivory">Monthly care</strong> — the retainer keeps the site
                secure, keeps small content changes moving, and keeps the SEO and AEO work active,
                so the build doesn't sit idle the moment it's live.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">What's included</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A mobile-first design that actually looks and works properly on a phone, not just a
                shrunk-down desktop layout. Clear calls to action so visitors know what to do next —
                call, WhatsApp, or enquire. Fast load times, because a slow site loses visitors
                before they ever read your copy. Brand-true design that looks like your business,
                not a template with your logo dropped in. And the technical groundwork — structured
                data, a sitemap, mobile responsiveness — that search engines and AI assistants both
                need to find and recommend you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Who this is built for
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Most of the businesses we build for are exactly the kind that get overlooked by
                bigger agencies — trades, professional services, and owner-run operations that need
                a site that works properly, not a design showcase. That means we build for the
                phone-in-hand customer first, not a wide-screen mockup that looks impressive in a
                pitch deck but is slow and awkward on the device most visitors are actually using.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">What it costs</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                R6,500 once-off for the build, R3,200 a month after that for hosting, security, and
                ongoing SEO/AEO/Google Business Profile work. Founding Client rates are available
                now — see the{" "}
                <a
                  href="/#founding"
                  className="text-gold hover:text-gold-soft transition-colors underline underline-offset-2"
                >
                  pricing section
                </a>{" "}
                for why that rate exists and how long it's available.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8">
              <p className="text-ivory/60 text-sm leading-relaxed font-light">
                Built for a specific trade or profession? See how this applies to{" "}
                <Link
                  to="/for/plumbers-electricians"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  plumbers and electricians
                </Link>
                ,{" "}
                <Link
                  to="/for/financial-advisors-brokers"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  financial advisors and brokers
                </Link>
                , and{" "}
                <Link
                  to="/for/attorneys"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  attorneys
                </Link>
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
              Web design <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Not sure if your current site is holding you back?" />
    </>
  );
}
