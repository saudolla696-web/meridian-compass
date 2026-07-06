import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export type FaqItem = { q: string; a: string };

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => {
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
  );
}
