import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { SERVICES, FAQS, SITE_URL } from "../lib/site-content";

const HOME_FAQ_QUESTIONS = [
  "How fast is 'days, not months'?",
  "What is the Visibility Audit?",
  "Do you only work with businesses in KwaZulu-Natal?",
  "I already have a website. Is there a point talking to you?",
];
const HOME_FAQS = FAQS.filter((f) => HOME_FAQ_QUESTIONS.includes(f.q));
const homeFaqJsonLd = buildFaqJsonLd(HOME_FAQS);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Digital — Web Design, SEO & AEO in South Africa" },
      {
        name: "description",
        content:
          "Custom websites, SEO and AI search visibility packages for South African businesses.",
      },
      {
        property: "og:title",
        content: "Meridian Digital — Web Design, SEO & AEO in South Africa",
      },
      {
        property: "og:description",
        content:
          "Websites, SEO, Google visibility and AI search packages for South African businesses.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(homeFaqJsonLd) }],
  }),
  component: Page,
});

/* ---------------- Hero canvas waves ---------------- */
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const mouse = useRef({ x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 });
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0,
      h = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = (e.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMove);

    const waves = [
      { color: "#C9A84C", opacity: 0.34, amp: 38, freq: 0.0042, speed: 0.0009, offset: 0.5 },
      { color: "#00B4D8", opacity: 0.18, amp: 50, freq: 0.0033, speed: 0.0006, offset: 0.58 },
      { color: "#E8D8A8", opacity: 0.14, amp: 30, freq: 0.0055, speed: 0.0011, offset: 0.46 },
      { color: "#E07B00", opacity: 0.1, amp: 60, freq: 0.0028, speed: 0.0004, offset: 0.66 },
    ];

    const draw = (t: number) => {
      // bg gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0A1628");
      g.addColorStop(1, "#060D18");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // smooth mouse
      mouse.current.sx += (mouse.current.x - mouse.current.sx) * 0.05;
      mouse.current.sy += (mouse.current.y - mouse.current.sy) * 0.05;

      waves.forEach((wv, i) => {
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = wv.color;
        ctx.globalAlpha = wv.opacity;
        ctx.shadowBlur = 18;
        ctx.shadowColor = wv.color;
        const baseY = h * wv.offset;
        for (let x = 0; x <= w; x += 4) {
          const dx = x / w - mouse.current.sx;
          const dy = wv.offset - mouse.current.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const boost = Math.max(0, 1 - dist * 2.2) * 18;
          const y = baseY + Math.sin(x * wv.freq + t * wv.speed + i) * (wv.amp + boost);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // single static frame
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}

function Dust() {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 18,
        dur: 22 + Math.random() * 26,
      })),
    [],
  );
  if (reduce) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: 0.5,
            boxShadow: "0 0 6px #C9A84C",
            animation: `drift-dust ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      <HeroCanvas />
      <Dust />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="label-eyebrow mb-6">Meridian Digital — South Africa</div>
        <h1 className="font-serif text-ivory leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <span className="italic block">Your customers are searching.</span>
          <span className="block">They're finding someone else.</span>
        </h1>
        <p className="mt-8 text-ivory/75 max-w-2xl mx-auto text-base md:text-[1.05rem] leading-relaxed font-light">
          We build websites and Google presence for South African businesses — so when someone
          searches for what you do, they find you, trust you, and phone you.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link to="/contact" className="btn-gold btn-gold-hover">
            Explore Packages
          </Link>
          <a
            href="https://wa.me/27658839408"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
        <p className="mt-6 text-slate-muted text-xs md:text-sm max-w-md mx-auto">
          Already have a website? Start with a R1,500 Visibility Audit, credited toward your first
          month when you proceed.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Problem section ---------------- */
const PROBLEMS = [
  {
    title: "We're invisible on Google.",
    body: "Customers search for your service in your area — and your competitors come up first, or you don't come up at all.",
  },
  {
    title: "Our website embarrasses us.",
    body: "It's outdated, slow on phones, or a Facebook page standing in for a real site. People judge before they call.",
  },
  {
    title: "We don't know what's broken.",
    body: "You've paid for websites or marketing before and can't tell what worked. Nobody explained anything in plain terms.",
  },
];

function Problem() {
  return (
    <section className="py-28 px-6 border-t border-b border-white/5 bg-[#0c1a30]">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-ivory text-4xl md:text-5xl text-center mb-16">
            Sound <span className="italic text-gold-soft">familiar?</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="bg-[#0A1628] border border-white/8 p-7 h-full">
                <p className="font-serif italic text-ivory text-lg mb-3">"{p.title}"</p>
                <p className="text-ivory/65 text-sm leading-relaxed font-light">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="text-center mt-14">
            <p className="text-ivory/80 font-light text-lg mb-8">
              Already have a website? We'll show you exactly what is working before you commit to a plan.
            </p>
            <Link to="/contact" className="btn-gold btn-gold-hover">
              Book a Visibility Audit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Services (compressed overview) ---------------- */
function ServicesPreview() {
  return (
    <section id="services-preview" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">Services</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl">
              Four bearings. <span className="italic text-gold-soft">One outcome.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.bearing} delay={i * 0.08}>
              <div className="bg-[#0c1a30]/85 border border-white/8 p-6 h-full hover:border-gold/40 transition-colors">
                <span className="font-mono text-gold text-xs tracking-[0.25em]">{s.bearing}</span>
                <h3 className="font-serif text-ivory text-xl mt-3 mb-2">{s.title}</h3>
                <p className="text-ivory/60 text-sm leading-relaxed font-light">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="text-gold hover:text-gold-soft text-sm tracking-wide transition-colors"
            >
              See the full breakdown, plus how we build it →
            </Link>
          </div>
          <p className="text-center text-ivory/50 text-sm mt-4">
            Run a trade business?{" "}
            <Link
              to="/for/plumbers-electricians"
              className="text-gold hover:text-gold-soft underline underline-offset-2 transition-colors"
            >
              See our digital marketing for plumbers and electricians
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Packages ---------------- */
const WEBSITE_PACKAGES = [
  { name: "Get Online", price: "R10,000", sub: "once-off build + R599/month Meridian Care", items: ["Custom site, up to 6 pages", "Mobile-first, fast-loading design", "Domain, SSL & managed hosting", "Backups, security & maintenance", "Google Analytics & technical support"], best: "A professional website with ongoing care." },
  { name: "Get Found", price: "R7,500", sub: "once-off build + R3,500/month visibility retainer", items: ["Everything in Get Online", "Monthly on-page SEO", "Google Business Profile management", "Keyword tracking & monthly report", "Local search improvements"], best: "Businesses ready to rank on Google and Maps consistently." },
  { name: "Get Chosen", price: "R7,500", sub: "once-off build + R6,500/month + growth bonus", items: ["Everything in Get Found", "AI search visibility", "Local map ranking optimisation", "Dedicated tracked call & lead number", "Quarterly strategy review"], best: "Full SEO, AI visibility and growth tracking.", bonus: true },
];

const VISIBILITY_PACKAGES = [
  { name: "SEO Essentials", price: "R3,500", sub: "per month · no lock-in", items: ["Monthly on-page SEO", "Google Business Profile management", "Keyword tracking & monthly report", "Local search improvements", "Cancel anytime, no contract"], best: "Existing sites seeking Google and Maps visibility." },
  { name: "SEO + AI Growth", price: "R6,500", sub: "per month + growth bonus", items: ["Everything in SEO Essentials", "AI search visibility", "Local map ranking optimisation", "Dedicated tracked call & lead number", "Quarterly strategy review"], best: "Businesses that want full visibility and growth tracking.", bonus: true },
];

function PackageCard({ pkg }: { pkg: (typeof WEBSITE_PACKAGES)[number] }) {
  return (
    <div className="bg-[#0c1a30] border border-white/10 p-6 text-left h-full">
      {pkg.bonus && <div className="text-gold text-[0.65rem] tracking-[0.15em] mb-3">GROWTH BONUS INCLUDED</div>}
      <h3 className="font-serif text-ivory text-2xl">{pkg.name}</h3>
      <p className="font-serif text-gold text-2xl mt-4">{pkg.price}</p>
      <p className="text-ivory/60 text-sm mt-1 min-h-10">{pkg.sub}</p>
      <ul className="mt-6 space-y-2 text-ivory/70 text-sm font-light">{pkg.items.map((item) => <li key={item}>— {item}</li>)}</ul>
      {pkg.bonus && <p className="text-gold-soft/80 text-xs mt-5">Bonus: R75 per tracked lead above baseline*</p>}
      <p className="text-ivory/55 text-xs leading-relaxed mt-6">Best for: {pkg.best}</p>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-[#060D18]">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <div className="label-eyebrow mb-4">Packages & Pricing</div>
          <h2 className="font-serif text-ivory text-3xl md:text-5xl max-w-3xl mx-auto leading-tight">
            Choose where you are. <span className="italic text-gold-soft">We’ll take it from there.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}><h3 className="font-serif text-ivory text-2xl mt-14 mb-6">Website + Visibility</h3><p className="text-ivory/65 max-w-2xl mx-auto mb-8">For a new website or one that needs replacing. Every tier includes a custom build; the difference is what happens after launch.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{WEBSITE_PACKAGES.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}</div></Reveal>
        <Reveal delay={0.18}><div className="mt-14 border border-gold/30 bg-[#11203A] p-7"><div className="label-eyebrow mb-3">Existing Website?</div><h3 className="font-serif text-ivory text-2xl">Visibility Audit — R1,500 once-off</h3><p className="text-ivory/70 max-w-2xl mx-auto mt-3 font-light">We check your site’s technical health, local search presence and AI visibility. It is credited toward your first month if you proceed.</p></div></Reveal>
        <Reveal delay={0.22}><h3 className="font-serif text-ivory text-2xl mt-14 mb-6">SEO & AI Visibility</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">{VISIBILITY_PACKAGES.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}</div><p className="text-slate-muted text-xs mt-6">*Growth bonus is R75 per tracked lead above the agreed monthly baseline, capped monthly.</p><Link to="/contact" className="btn-gold btn-gold-hover mt-8">Talk through your package</Link></Reveal>
      </div>
    </section>
  );
}

/* ---------------- Home FAQ ---------------- */
function HomeFaq() {
  return (
    <section className="py-24 px-6 bg-[#060D18]">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="label-eyebrow mb-4">FAQ</div>
            <h2 className="font-serif text-ivory text-3xl md:text-4xl">
              Quick <span className="italic text-gold-soft">questions.</span>
            </h2>
          </div>
        </Reveal>
        <FaqAccordion items={HOME_FAQS} />
        <Reveal delay={0.1}>
          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="text-gold hover:text-gold-soft text-sm tracking-wide transition-colors"
            >
              See all FAQs →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Closing CTA ---------------- */
function ClosingCta() {
  return (
    <section id="contact" className="py-28 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="label-eyebrow mb-4">Get Started</div>
          <h2 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
            Start with a <span className="italic text-gold-soft">Visibility Audit.</span>
          </h2>
          <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md mx-auto mb-10">
            R1,500 once-off for an honest view of your website, local search and AI visibility — credited toward your first month when you proceed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/contact" className="btn-gold btn-gold-hover">
              Book a Visibility Audit
            </Link>
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
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <ServicesPreview />
      <Pricing />
      <HomeFaq />
      <ClosingCta />
    </>
  );
}
