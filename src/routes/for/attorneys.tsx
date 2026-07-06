import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "Why do practice-area pages matter more than one general services page?",
    a: "Because people search for what they specifically need — 'conveyancing attorney Durban,' 'divorce attorney Pietermaritzburg' — not a generic 'attorneys near me.' A single page that vaguely lists every practice area you handle ranks for none of those specific searches. A dedicated page per practice area gives each one a real chance.",
  },
  {
    q: "What does 'professional presentation' actually mean for a law firm site?",
    a: "Clear information about who you are, your admission and any specialisation, straightforward language instead of dense legal jargon, and a design that looks considered rather than templated. It's the difference between a site that reads as a serious practice and one that reads as an afterthought.",
  },
  {
    q: "Can this help us rank for a specific town, not just 'near me'?",
    a: "Yes — being explicit about the towns and areas you serve, both in your content and your Google Business Profile, is what lets you show up for 'conveyancing attorney [town]' searches specifically, rather than relying on generic proximity searches alone.",
  },
  {
    q: "Do you write the practice-area content, or do we need to provide it?",
    a: "We draft it in plain language based on what you tell us about how you actually work, then you review and approve it before anything goes live — nothing published without your sign-off, especially given how carefully law firms need to manage what's said publicly.",
  },
  {
    q: "How is this different from a generic law-firm website template?",
    a: "A template gives every firm using it the same structure and the same weak search performance. We build around your actual practice areas, actual service towns, and actual credentials — the specific information that lets search engines and AI assistants match you to the specific searches that matter to your firm.",
  },
];

export const Route = createFileRoute("/for/attorneys")({
  head: () => ({
    meta: [
      { title: "Websites for Attorneys & Law Firms | Meridian Digital" },
      {
        name: "description",
        content:
          "Websites for attorneys and law firms — professional presentation, dedicated practice-area pages, and being findable for searches like 'conveyancing attorney [town].'",
      },
      { property: "og:title", content: "Websites for Attorneys | Meridian Digital" },
      {
        property: "og:description",
        content: "Practice-area pages and professional presentation that get you found.",
      },
      { property: "og:url", content: `${SITE_URL}/for/attorneys` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/for/attorneys` }],
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
            <div className="label-eyebrow mb-4">Attorneys & Law Firms</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Findable for the search <span className="italic text-gold-soft">that matters.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              Someone searching for legal help searches specifically — "conveyancing attorney
              Durban," "labour law advice Pietermaritzburg" — not a vague "lawyer near me." A
              website built around one generic services page misses almost all of those searches. A
              site built around your actual practice areas and actual towns catches them.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Practice-area pages, not one page trying to cover everything
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A single page that lists conveyancing, family law, litigation, and commercial law in
                one paragraph each doesn't rank strongly for any specific search — search engines
                reward depth on a topic, not a shallow mention across many. A dedicated page for
                each practice area, written properly rather than templated, gives each one a genuine
                chance to show up when someone searches specifically for it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Professional presentation that matches the seriousness of the work
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Clients hiring an attorney are making a decision with real consequences, and they're
                reading the site for signals of competence and seriousness — clear information about
                your admission and experience, plain-language explanations instead of dense jargon,
                and a design that looks considered rather than assembled from a generic template.
                What the site looks and reads like becomes part of the first impression before
                you've said a word.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Being findable by town, not just by proximity
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Being explicit about the specific towns and areas you serve — in your content, and
                in your Google Business Profile — is what lets you show up for searches like
                "conveyancing attorney Pietermaritzburg" rather than relying on generic
                proximity-based results alone. That specificity is exactly what most law firm
                websites skip.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What most firm websites get wrong
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A site built years ago and never revisited, practice areas listed but never
                explained, and a contact page with no clear next step for someone ready to enquire.
                None of that reflects badly on the quality of the legal work — it just means the
                website isn't doing its part of the job. The fix isn't a redesign for its own sake;
                it's making sure the site actually says, clearly, what you do, where you do it, and
                how someone gets in touch.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">See how we build this</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                The full build approach — pricing, process, and what's included — is on the{" "}
                <Link
                  to="/services/web-design"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  web design page
                </Link>
                . The same practice-area and location-specific thinking also applies to our{" "}
                <Link
                  to="/web-design-durban"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  Durban
                </Link>{" "}
                and{" "}
                <Link
                  to="/web-design-pietermaritzburg"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  Pietermaritzburg
                </Link>{" "}
                location pages.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#060D18]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-ivory text-3xl md:text-4xl text-center mb-12">
              Questions from <span className="italic text-gold-soft">law firms.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know if your practice areas are actually findable?" />
    </>
  );
}
