import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "I already have a Google Business Profile. Why would I need help with it?",
    a: "Most profiles we look at are missing photos, have incomplete or outdated categories and service lists, or haven't had a post or a reply to a review in over a year. Having a profile isn't the same as having one that's actually working for you.",
  },
  {
    q: "How do reviews affect ranking?",
    a: "Review count, rating, and how recently you responded all factor into the local map ranking, alongside how relevant and complete your profile is. A profile with five recent, replied-to reviews often outperforms one with fifty ignored ones.",
  },
  {
    q: "What's the difference between setup and ongoing management?",
    a: "Setup is a once-off job: claiming and verifying the listing, filling in every field correctly, adding photos, setting the right categories. Management is what keeps it working — posts, review responses, keeping hours and services current, and watching for competitor or duplicate-listing issues.",
  },
  {
    q: "Can you help if my listing was suspended or flagged?",
    a: "Often, yes — most suspensions come down to inconsistent business information across the web or a policy issue with the listing itself. We'll tell you plainly what's wrong before promising a fix.",
  },
  {
    q: "Do you handle review responses for me?",
    a: "Yes, as part of the monthly retainer. Reviews get a considered, on-brand response — not a copy-pasted 'Thank you for your feedback' that reads like nobody's actually reading them.",
  },
];

export const Route = createFileRoute("/services/google-business-profile")({
  head: () => ({
    meta: [
      { title: "Google Business Profile Management | Meridian Digital" },
      {
        name: "description",
        content:
          "The Google map listing that drives local calls — set up properly, optimised, and kept active. Google Business Profile management for KwaZulu-Natal businesses.",
      },
      { property: "og:title", content: "Google Business Profile | Meridian Digital" },
      {
        property: "og:description",
        content: "The map listing that drives local calls, set up properly and kept active.",
      },
      { property: "og:url", content: `${SITE_URL}/services/google-business-profile` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services/google-business-profile` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Google Business Profile Management",
          provider: { "@type": "ProfessionalService", name: "Meridian Digital" },
          areaServed: ["Durban", "Pietermaritzburg", "KwaZulu-Natal"],
          description: "The Google map listing that drives local calls, set up and kept active.",
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(FAQS)) },
    ],
  }),
  component: GbpPage,
});

function GbpPage() {
  return (
    <>
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="label-eyebrow mb-4">Google Business Profile</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              The map listing that <span className="italic text-gold-soft">drives calls.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              When someone searches "plumber near me" or "attorney in Pietermaritzburg," the first
              thing they see isn't a list of websites — it's the map pack: three businesses with a
              star rating, a photo, and a phone number. If you're not in it, or your listing is thin
              and outdated, you're invisible at exactly the moment someone's ready to call.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Why the map pack matters more than most websites
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                For local searches — "near me," a suburb name, a town name — Google increasingly
                shows the map pack above the regular organic results. People trust it because it
                shows real signals at a glance: rating, review count, hours, distance. A business
                with a properly optimised profile can out-rank a competitor with a far more
                expensive website, simply because the profile is complete, accurate, and active.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Setup versus ongoing management
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light mb-4">
                <strong className="text-ivory">Setup</strong> is a once-off job done properly:
                claiming and verifying the listing if it isn't already, correcting the business
                category and service list, adding real photos, and making sure your name, address,
                and phone number match exactly across your website and every other place they appear
                online — inconsistencies here quietly hurt your ranking.
              </p>
              <p className="text-ivory/70 leading-relaxed font-light">
                <strong className="text-ivory">Ongoing management</strong> is what keeps a profile
                working instead of going stale: regular posts, responding to reviews, updating hours
                around holidays, and watching for duplicate or fake competitor listings that can
                siphon off calls that should be coming to you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                A review strategy that doesn't feel fake
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Reviews aren't just social proof — they're a ranking signal, and how you respond
                matters as much as the star rating itself. We help set up a simple, honest way to
                ask happy customers for a review at the right moment, and we write considered,
                specific responses to the reviews you get — good and bad — instead of a generic
                copy-pasted line that makes it obvious nobody's reading them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                The most common mistakes we see
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Wrong or outdated business categories, service areas that don't match where the
                business actually operates, hours that haven't been updated since a public holiday
                two years ago, and photos that are either missing or years old. Individually each
                one looks minor. Together they tell Google — and the customer looking at the listing
                — that nobody's actively managing it, which quietly costs both ranking and trust.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 bg-[#0c1a30] border border-white/8 p-8">
              <h2 className="font-serif text-ivory text-xl mb-3">How it's priced</h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Google Business Profile setup and ongoing management is included in the R3,200
                monthly retainer alongside SEO and AEO — one number, not three separate invoices for
                three parts of the same problem.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#060D18]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-ivory text-3xl md:text-4xl text-center mb-12">
              Google Business Profile <span className="italic text-gold-soft">questions.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Not sure how your listing actually looks to customers?" />
    </>
  );
}
