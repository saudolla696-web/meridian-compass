import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { ContactForm } from "../components/site/ContactForm";
import { SITE_URL } from "../lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get Your Free Audit — Meridian Digital" },
      {
        name: "description",
        content:
          "Get a free 10-point audit of your website and Google presence from Meridian Digital. Three specific things to fix, in plain language — no obligation.",
      },
      { property: "og:title", content: "Get Your Free Audit | Meridian Digital" },
      {
        property: "og:description",
        content: "No obligation, no jargon — the three most important things to fix, for free.",
      },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <Reveal>
          <div>
            <div className="label-eyebrow mb-4">Free Audit</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Get your free <span className="italic text-gold-soft">10-point audit.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md mb-5">
              Tell us your business name and website (or Facebook page — no website is exactly the
              kind of thing we find). Within 2 business days we'll send you a short audit: the three
              most important things broken or missing in your online presence, and what fixing them
              would do.
            </p>
            <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md">
              No meeting required. No obligation. If you never speak to us again, you'll still know
              exactly what to fix.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="tel:+27658839408" className="btn-ghost-gold">
                065 883 9408
              </a>
              <a
                href="https://wa.me/27658839408"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-gold"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
        <div>
          <ContactForm />
          <p className="text-slate-muted text-sm mt-6 text-center">
            Prefer to talk? Call or WhatsApp{" "}
            <a href="tel:+27658839408" className="text-gold hover:text-gold-soft transition-colors">
              065 883 9408
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
