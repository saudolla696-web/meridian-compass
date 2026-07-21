import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "What is Answer Engine Optimisation (AEO), in plain terms?",
    a: "SEO gets you ranked in a list of links. AEO gets your business named directly when someone asks an AI assistant a question — 'best coffee shop in Pietermaritzburg,' 'Toyota dealership near Harding.' It's structuring your site and listings so the answer engines have a clear, correct answer to give, with your business as the source.",
  },
  {
    q: "Why does it matter if my content is 'server-rendered'?",
    a: "AI assistants and search crawlers generally read the HTML a server sends them the first time, before any JavaScript runs. If your key content only appears after a script loads it into the page, a lot of these systems never see it at all — they see a blank shell. This site is built specifically so every page's real content is present on the very first response.",
  },
  {
    q: "What is structured data / schema markup, and why does it help?",
    a: "It's a small block of code on each page that states facts about your business in a format machines can parse directly — your name, phone number, service area, FAQ answers — instead of making a system guess by reading paragraphs. It's the difference between telling someone your hours and hoping they infer it from a sentence.",
  },
  {
    q: "Is AEO a replacement for SEO?",
    a: "No — they work together. Good AEO structure (clean HTML, clear answers, schema markup) tends to help traditional SEO too, and a technically solid SEO foundation is what makes AEO possible in the first place. We don't treat them as separate budgets.",
  },
  {
    q: "Can you actually prove this site does what you're describing?",
    a: "Yes — this is the working example. Every FAQ answer on this site is present in the raw HTML before any JavaScript runs, and the FAQ and business schema are both server-rendered, not injected after the page loads. Ask an AI assistant about Meridian Digital and you're testing the exact approach we build for you.",
  },
];

export const Route = createFileRoute("/services/aeo")({
  head: () => ({
    meta: [
      { title: "Answer Engine Optimisation (AEO) | Meridian Digital" },
      {
        name: "description",
        content:
          "When people ask AI assistants who's good near them, your business should be the answer. AEO for South African businesses — structured so machines can recommend you.",
      },
      { property: "og:title", content: "AEO | Meridian Digital" },
      {
        property: "og:description",
        content: "We structure your site so AI assistants can find and recommend you.",
      },
      { property: "og:url", content: `${SITE_URL}/services/aeo` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services/aeo` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Answer Engine Optimisation",
          provider: { "@type": "ProfessionalService", name: "Meridian Digital" },
          areaServed: ["South Africa", "Durban", "Pietermaritzburg"],
          description: "We structure sites so AI assistants can find and recommend the business.",
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
    ],
  }),
  component: AeoPage,
});

function AeoPage() {
  return (
    <>
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="label-eyebrow mb-4">Answer Engine Optimisation</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Be the answer, <span className="italic text-gold-soft">not the link.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              More people are starting their search for a business by asking an AI assistant
              directly, instead of scrolling a page of links. "Who's a good electrician near me,"
              "which security company covers Durban business parks" — the assistant picks one or two
              answers and names them. AEO is the work of making sure your business is one of the
              names it gives.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Why served HTML matters
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Many websites build their content with JavaScript that runs after the page loads —
                fine for a human with a modern browser, invisible to a lot of crawlers and AI
                systems that read the very first response from the server and don't wait around for
                scripts to finish. If your FAQ answers, service descriptions, or key details only
                appear after that script runs, a meaningful slice of the systems trying to recommend
                you never see them at all. Every page on this site is built so its real content is
                already there in that first response — no JavaScript required to read it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Why schema markup matters
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Schema markup is a small, structured block of code that states plain facts about
                your business — your name, phone number, the areas you serve, your FAQ answers — in
                a format machines can read directly, rather than inferring them from paragraphs of
                prose. It's the difference between a search engine guessing your hours from a
                sentence buried on a contact page, and being told exactly what they are in a format
                built for that purpose.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                This site is the working example
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                We don't just describe AEO — every page here demonstrates it. The FAQ answers on
                this site are present in the raw HTML before any script runs. This page's business
                schema and FAQ schema are rendered server-side, not injected after the fact. If you
                want proof this works rather than a sales pitch about it, ask an AI assistant about
                Meridian Digital and see what comes back.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">How it's priced</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                AEO is built into every site we make and maintained as part of the R3,200 monthly
                retainer alongside SEO and Google Business Profile management — it's not a separate
                add-on tier.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#060D18]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-ivory text-3xl md:text-4xl text-center mb-12">
              AEO <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know if AI assistants can currently find you at all?" />
    </>
  );
}
