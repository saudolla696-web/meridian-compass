import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { FaqAccordion, buildFaqJsonLd } from "../../components/site/FaqAccordion";
import { SITE_URL } from "../../lib/site-content";

const FAQS = [
  {
    q: "Why does displaying our FSP licence number matter so much?",
    a: "Because a client considering handing you their money is, reasonably, checking whether you're allowed to give them financial advice in the first place. A clearly displayed FSP number — not buried in a PDF disclosure nobody reads — answers that question immediately instead of leaving it as a nagging doubt.",
  },
  {
    q: "Our clients mostly come from referrals. Why do we need a strong website?",
    a: "Referrals get you the introduction. What happens next is the referred person searching your name or your firm's name to check you out before they call — and increasingly, asking an AI assistant the same thing. A thin or outdated website undermines a referral that was otherwise a warm lead.",
  },
  {
    q: "How do you handle compliance-aware content?",
    a: "We write plainly about what you do and how you work without making performance claims, guarantees, or anything that could read as advice rather than information — content that describes your process and credentials rather than promising outcomes.",
  },
  {
    q: "Can the site help with referral checking specifically?",
    a: "Yes — clear credentials, a straightforward explanation of your process, and genuine information about your background (not stock photography and vague mission statements) all give a referred prospect the specific reassurance they're looking for before the first call.",
  },
  {
    q: "Do you work with independent brokers as well as advisory firms?",
    a: "Yes — the approach is the same whether you're a sole practitioner or a small firm: license displayed prominently, credibility built through real information rather than marketing language, and a site that works as hard checking you out as your referral network does recommending you.",
  },
];

export const Route = createFileRoute("/for/financial-advisors-brokers")({
  head: () => ({
    meta: [
      { title: "Websites for Financial Advisors & Brokers | Meridian Digital" },
      {
        name: "description",
        content:
          "Websites for FSP-licensed financial advisors and brokers — licence display, referral-checking credibility, and compliance-aware content, built for South African firms.",
      },
      {
        property: "og:title",
        content: "Websites for Financial Advisors & Brokers | Meridian Digital",
      },
      {
        property: "og:description",
        content: "FSP licence displayed, compliance-aware content, built for referral checking.",
      },
      { property: "og:url", content: `${SITE_URL}/for/financial-advisors-brokers` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/for/financial-advisors-brokers` }],
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
            <div className="label-eyebrow mb-4">Financial Advisors & Brokers</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Credibility, before the <span className="italic text-gold-soft">first call.</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">
              A prospective client considering handing you their money almost always checks you out
              online first — even off the back of a strong referral. What they find in those first
              two minutes either confirms the referral or quietly undermines it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Your FSP licence, displayed like it matters
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Being licensed to give financial advice is the baseline requirement a client needs
                confirmed before they trust you with anything — and yet on most advisor and broker
                websites, the FSP number is either missing entirely or buried in a disclosure PDF
                nobody opens. Displaying it prominently, near your name and credentials, closes that
                question before it's asked instead of leaving a prospect to go digging for
                reassurance elsewhere.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Built for the referral-checking moment
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Referrals bring the introduction; the website does the convincing that comes after
                it. A prospect referred to you will typically search your name, your firm's name, or
                both — and increasingly, ask an AI assistant what it can find about you. A site that
                clearly states who you are, what you're licensed to do, and how you actually work
                gives that referral something solid to land on. A thin or outdated site does the
                opposite — it plants doubt exactly where a referral was supposed to remove it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Compliance-aware content, not vague marketing language
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                We write about what you do and how you work without drifting into performance
                promises, return guarantees, or anything that could be read as advice rather than
                general information — content that describes your process, experience, and
                credentials plainly, rather than the vague "financial freedom" language that reads
                as marketing rather than substance to anyone in the industry.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12">
              <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-4">
                Why this matters more for regulated professions
              </h2>
              <p className="text-ivory/70 leading-relaxed font-light">
                Unlike a retail business, a client can't easily judge the quality of financial
                advice before receiving it — so they rely heavily on proxy signals: licensing,
                clarity, professionalism, and how seriously the practice presents itself. A thin or
                generic website undercuts exactly the signals a prospective client is looking for,
                regardless of how good the advice itself actually is.
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
                  to="/for/plumbers-electricians"
                  className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
                >
                  licensed trade business
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
              Questions from <span className="italic text-gold-soft">advisors and brokers.</span>
            </h2>
          </Reveal>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <AuditCta heading="Want to know what a referral finds when they check you out?" />
    </>
  );
}
