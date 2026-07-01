import { useState } from "react";
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { FAQS, SITE_URL } from "../lib/site-content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Meridian Digital" },
      {
        name: "description",
        content:
          "Straight answers about Meridian Digital's pricing, the Founding Client Programme, Answer Engine Optimisation, and what the monthly retainer covers.",
      },
      { property: "og:title", content: "FAQ | Meridian Digital" },
      {
        property: "og:description",
        content:
          "Straight answers, no sales script — pricing, AEO, the Founding Client Programme, and more.",
      },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
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
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 text-left py-6 group"
                  >
                    <span className="font-serif text-ivory text-lg md:text-xl group-hover:text-gold-soft transition-colors">
                      {f.q}
                    </span>
                    <span
                      className="text-gold text-2xl leading-none mt-1 shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    aria-hidden={!isOpen}
                  >
                    <p className="text-ivory/70 leading-relaxed font-light pb-6 pr-10 text-[0.95rem]">
                      {f.a}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
