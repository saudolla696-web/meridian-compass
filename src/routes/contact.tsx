import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { ContactForm } from "../components/site/ContactForm";
import { SITE_URL } from "../lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meridian Digital" },
      {
        name: "description",
        content:
          "Tell Meridian Digital about your business and get a plain, no-obligation answer on what it would take to get you found, chosen, and remembered.",
      },
      { property: "og:title", content: "Contact | Meridian Digital" },
      {
        property: "og:description",
        content: "No obligation, no jargon — tell us what you're trying to fix.",
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
            <div className="label-eyebrow mb-4">Contact</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Let's chart <span className="italic text-gold-soft">your course.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md">
              Tell us about the business. We'll tell you, plainly, what it would take to get you
              found, chosen, and remembered — no obligation, no jargon.
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
                Message on WhatsApp →
              </a>
            </div>
          </div>
        </Reveal>
        <ContactForm />
      </div>
    </section>
  );
}
