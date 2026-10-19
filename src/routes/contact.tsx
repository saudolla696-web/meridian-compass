import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { ContactForm } from "../components/site/ContactForm";
import { SITE_URL, buildBreadcrumbJsonLd } from "../lib/site-content";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Visibility Audit — Meridian Digital" },
      {
        name: "description",
        content:
          "Book a R1,500 Visibility Audit of your website, local search presence and AI visibility. Credited toward your first month if you proceed.",
      },
      { property: "og:title", content: "Book a Visibility Audit | Meridian Digital" },
      {
        property: "og:description",
        content: "An honest R1,500 audit of your website, local search and AI visibility.",
      },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <Reveal>
          <div>
            <div className="label-eyebrow mb-4">Visibility Audit</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Start with a <span className="italic text-gold-soft">Visibility Audit.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md mb-5">
              For R1,500 once-off, we check your existing site’s technical health, local search
              presence and AI visibility. If you proceed with a monthly plan, the audit is credited
              toward your first month.
            </p>
            <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md">
              We’ll tell you plainly what is working, what needs attention, and whether your site
              needs rebuilding before we recommend a plan.
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
