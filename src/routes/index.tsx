import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { FaqAccordion, buildFaqJsonLd } from "../components/site/FaqAccordion";
import { BrowserCard } from "../components/site/BrowserCard";
import { CASE_STUDIES, SERVICES, STEPS, FAQS, SITE_URL } from "../lib/site-content";

const HOME_FAQ_QUESTIONS = [
  "How fast is 'days, not months'?",
  "What is Answer Engine Optimisation (AEO), in plain terms?",
  "Do you only work with businesses in KwaZulu-Natal?",
  "I already have a website. Is there a point talking to you?",
];
const HOME_FAQS = FAQS.filter((f) => HOME_FAQ_QUESTIONS.includes(f.q));
const homeFaqJsonLd = buildFaqJsonLd(HOME_FAQS);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Web Design, SEO & AEO Agency in KZN | Meridian Digital" },
      {
        name: "description",
        content:
          "Get a website that earns trust and search visibility that brings enquiries. Web design, SEO, Google Business Profile and AEO for KwaZulu-Natal businesses.",
      },
      {
        property: "og:title",
        content: "Meridian Digital — Web Design, SEO & AEO in South Africa",
      },
      {
        property: "og:description",
        content:
          "Web design, SEO and AI search visibility that helps KwaZulu-Natal businesses win more enquiries.",
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
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
        <div className="label-eyebrow mb-6">Meridian Digital — KwaZulu-Natal, South Africa</div>
        <h1 className="font-serif text-ivory leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <span className="italic block">Be the business they find</span>
          <span className="block">— and the one they choose.</span>
        </h1>
        <p className="mt-8 text-ivory/75 max-w-2xl mx-auto text-base md:text-[1.05rem] leading-relaxed font-light">
          Websites, Google visibility and AI search optimisation for KwaZulu-Natal businesses that
          need more qualified enquiries — not another pretty site that sits unnoticed.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link to="/contact" className="btn-gold btn-gold-hover">
            Book a Visibility Audit
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
        <p className="mt-6 text-slate-muted text-xs md:text-sm max-w-lg mx-auto">
          Web design, SEO, Google Business Profile and AEO — scoped in writing before any work
          begins. You own the domain, the site and every credential.
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
              Already have a website? We'll show you exactly what is working before you commit to
              anything.
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

/* ---------------- Capabilities ---------------- */
const CAPABILITIES = [
  { name: "Enquiry & lead forms", note: "Validated, spam-protected and built to convert." },
  { name: "WhatsApp & live chat", note: "Direct conversation triggers for phone-in-hand buyers." },
  { name: "Booking & scheduling", note: "Availability, confirmations and calendar flows." },
  { name: "E-commerce", note: "Product catalogues, carts and secure checkout." },
  { name: "Google Business Profile", note: "Set up, optimised and kept active." },
  { name: "On-page SEO & schema", note: "Technical foundations search engines can read." },
  {
    name: "Analytics & reporting",
    note: "Traffic, enquiries and conversion insight in plain language.",
  },
  { name: "CRM & payment integrations", note: "Connect the tools your team already uses." },
];

function Capabilities() {
  return (
    <section className="py-28 px-6 bg-[#060D18] border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="label-eyebrow mb-4">Capabilities</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl">
              Built around <span className="italic text-gold-soft">your business.</span>
            </h2>
            <p className="text-ivory/65 font-light max-w-2xl mx-auto mt-5">
              Mix the features that matter into one clear project plan. No disconnected line items,
              no surprises after launch.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="border border-white/8 bg-[#0c1a30]/70 p-5 h-full hover:border-gold/40 transition-colors">
                <h3 className="font-serif text-ivory text-lg mb-1.5">{c.name}</h3>
                <p className="text-ivory/55 text-xs leading-relaxed font-light">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Approach ---------------- */
const PILLARS = [
  {
    label: "Radical transparency",
    body: "You receive every account credential — domain, hosting, source files and CMS logins. We do not hold your website hostage, and nothing is hidden behind proprietary lock-in.",
  },
  {
    label: "Senior attention",
    body: "We keep the number of new builds small so the people you meet are the people doing the work. Your launch date is agreed in writing before anything begins.",
  },
  {
    label: "Care without lock-in",
    body: "Ongoing care is optional. We can keep the site secure and improving every month, or hand over full control after launch. Either way, the choice stays yours.",
  },
];

function Approach() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">The Meridian Approach</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl leading-tight">
              Clear scope. <span className="italic text-gold-soft">Full ownership.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <div className="border border-white/8 bg-[#0c1a30]/85 p-8 h-full">
                <span className="font-mono text-gold text-xs tracking-[0.25em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-ivory text-2xl mt-4 mb-3">{p.label}</h3>
                <p className="text-ivory/65 text-sm leading-relaxed font-light">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
function Process() {
  return (
    <section id="process" className="py-28 px-6 bg-[#060D18] border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="label-eyebrow mb-4">Process</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl">
              One line. <span className="italic text-gold-soft">Four points.</span>
            </h2>
            <p className="text-ivory/65 font-light max-w-xl mx-auto mt-5">
              From first conversation to launch, and the monthly checks that follow.
            </p>
          </div>
        </Reveal>

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          <div className="absolute top-[18px] left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="grid grid-cols-4 gap-6 relative">
            {STEPS.map((st, i) => (
              <Reveal key={st.title} delay={i * 0.1}>
                <div className="text-center px-2">
                  <div className="relative mx-auto w-9 h-9 rounded-full bg-[#0A1628] border-2 border-gold flex items-center justify-center mb-6">
                    <span className="text-gold text-xs font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-ivory text-2xl mb-3">{st.title}</h3>
                  <p className="text-ivory/65 text-sm leading-relaxed font-light">{st.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-10">
            {STEPS.map((st, i) => (
              <Reveal key={st.title}>
                <div className="relative">
                  <div className="absolute -left-10 top-1 w-9 h-9 rounded-full bg-[#0A1628] border-2 border-gold flex items-center justify-center">
                    <span className="text-gold text-xs font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-ivory text-2xl mb-2">{st.title}</h3>
                  <p className="text-ivory/65 text-sm leading-relaxed font-light">{st.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Selected work ---------------- */
function SelectedWork() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">Selected Work</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl">
              A look at <span className="italic text-gold-soft">how we build.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CASE_STUDIES.map((p, i) => (
            <BrowserCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <Reveal delay={0.25}>
          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="text-gold hover:text-gold-soft text-sm tracking-wide transition-colors"
            >
              Read the full case studies →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Home FAQ ---------------- */
function HomeFaq() {
  return (
    <section className="py-24 px-6 bg-[#060D18] border-y border-white/5">
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
            An honest view of your website, local search and AI visibility — so you can see what is
            working, what needs attention, and what to do next.
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
      <Capabilities />
      <Approach />
      <Process />
      <SelectedWork />
      <HomeFaq />
      <ClosingCta />
    </>
  );
}
