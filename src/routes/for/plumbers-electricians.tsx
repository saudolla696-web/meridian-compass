import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "We already get work through word of mouth. Do we really need a website?",
    a: "Word of mouth is how people hear your name. A website is what happens next — when someone searches your name, or searches 'emergency plumber near me' with no name at all, to check you're legitimate before they call. Without one, you're relying entirely on the referral closing the deal by itself.",
  },
  {
    q: "How does displaying our PIRB or DoL registration actually help?",
    a: "It answers the question every cautious customer is already asking silently: 'is this person actually licensed to do this?' Displaying registration details prominently — not buried on a contact page — turns a trust question into a non-issue before it's even asked.",
  },
  {
    q: "Can people actually find us for emergency call-outs?",
    a: "That depends on whether your site and Google Business Profile are built around how people actually search during an emergency — short, urgent, location-specific phrases, usually on a phone, usually wanting a phone number immediately. That's a different build to a general 'about us' website.",
  },
  {
    q: "Why WhatsApp instead of just a contact form?",
    a: "Because that's how your customers already prefer to communicate for urgent, practical jobs. A contact form with a 2-day reply time loses a burst pipe emergency. A WhatsApp link that opens with your number pre-filled removes friction at the exact moment someone's ready to reach out.",
  },
  {
    q: "What if we're a two-person operation, not a big company?",
    a: "That's most of who we build for. The site doesn't need to look like a national franchise — it needs to look credible, load fast on a phone, and make it obvious you're licensed, local, and reachable right now.",
  },
];

export const Route = createFileRoute("/for/plumbers-electricians")({
  head: () => ({
    meta: [
      { title: "Websites for Plumbers & Electricians in South Africa | Meridian Digital" },
      {
        name: "description",
        content:
          "Websites built for plumbers and electricians — PIRB and DoL registration displayed as trust signals, emergency call-out search behaviour, and a WhatsApp-first enquiry flow.",
      },
      { property: "og:title", content: "Websites for Plumbers & Electricians | Meridian Digital" },
      {
        property: "og:description",
        content: "Licensing displayed, emergency-search built for, WhatsApp-first enquiries.",
      },
      { property: "og:url", content: `${SITE_URL}/for/plumbers-electricians` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/for/plumbers-electricians` }],
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
            <div className="label-eyebrow mb-4">Plumbers & Electricians</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Licensed. Local. <span className="italic text-gold-soft">Findable.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              You're PIRB-registered or DoL-registered, you show up on time, and you do the job
              properly. None of that matters if the person searching "emergency plumber near me" at
              11pm can't find you, or finds you but can't tell you're actually licensed before they
              call someone else instead.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Licensing as a conversion asset, not a footnote
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A lot of trade websites bury their registration details in small print at the bottom
                of a page, if they mention them at all. That's a missed opportunity. Customers
                calling a plumber or electrician are often already anxious about being overcharged
                or dealing with someone unqualified — displaying your PIRB or Department of Labour
                registration prominently, near the top of the page and again near the contact
                details, directly answers that anxiety before it's voiced. It's the same
                trust-signal approach we use for FSP-licensed brokers and attorneys: put the
                credential where the decision is being made.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Built for how emergency searches actually work
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Someone searching for a plumber at 11pm is not browsing — they're in a hurry, almost
                always on a phone, and looking for the fastest path to a phone number or a message.
                That means the site needs to load fast on mobile data, put your number and service
                area above the fold, and avoid making anyone hunt through a menu to find out if you
                cover their suburb. General-purpose "about us" websites are built for browsing.
                Emergency-callout businesses need to be built for urgency.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                WhatsApp-first, because that's where the job actually gets booked
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Most trade enquiries in South Africa happen over WhatsApp, not a contact form —
                people want to send a photo of the leak or the fuse box, ask a quick question, and
                get a straight answer. We build the enquiry flow around that reality: a WhatsApp
                button that opens with your number and a sensible pre-filled message, not a form
                that sits unanswered until someone checks their inbox.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                What we usually find on an existing trades site
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                A site built years ago with an outdated service list, no mention of licensing at
                all, and a contact page that's just an email address nobody checks during a
                call-out. Fixing that isn't a redesign for its own sake — it's making sure the site
                actually does the one job it needs to do: convince someone in a hurry that you're
                licensed, local, and reachable right now.
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
                . The same regulatory-trust-signal approach also applies if you're an{" "}
                <Link
                  to="/for/attorneys"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  attorney
                </Link>{" "}
                or a{" "}
                <Link
                  to="/for/financial-advisors-brokers"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  financial adviser or broker
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
              Questions from <span className="italic text-gold-soft">trades businesses.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know if emergency searches can actually find you?" />
    </>
  );
}
