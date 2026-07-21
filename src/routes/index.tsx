import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { SERVICES, SITE_URL } from "../lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Digital — Web Design, SEO & AEO in South Africa" },
      {
        name: "description",
        content:
          "Free 10-point audit of your website and Google presence. Meridian Digital builds websites and search visibility for South African businesses — live in days, not months.",
      },
      {
        property: "og:title",
        content: "Meridian Digital — Web Design, SEO & AEO in South Africa",
      },
      {
        property: "og:description",
        content:
          "Websites, search presence, and Google visibility for South African businesses — live in days, not months. Free audit, no obligation.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
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
            Get Your Free Audit
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
          Free 10-point audit of your website and Google presence. Three specific things to fix —
          useful whether you hire us or not.
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
              We'll show you exactly what's broken — for free — before you spend a rand.
            </p>
            <Link to="/contact" className="btn-gold btn-gold-hover">
              Get Your Free Audit
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
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Founding ---------------- */
function Founding() {
  const stats = [
    { v: "R6,500", l: "Once-off build" },
    { v: "R3,200", l: "Optional monthly care" },
    { v: "12", l: "Months at this rate" },
  ];
  return (
    <section id="founding" className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-[#11203A] border border-gold/20 px-8 md:px-16 py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-gold" />
        <Reveal>
          <div className="label-eyebrow mb-4">Founding Client Rate</div>
          <h2 className="font-serif text-ivory text-3xl md:text-5xl max-w-3xl mx-auto leading-tight">
            The Founding Client rate{" "}
            <span className="italic text-gold-soft">— and why it exists.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-3 gap-8 md:gap-4 border-y border-white/10 py-10">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-serif text-gold text-2xl sm:text-3xl md:text-4xl mb-2">
                  {s.v}
                </div>
                <div className="text-slate-muted text-[0.7rem] uppercase tracking-[0.18em]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-ivory/70 max-w-2xl mx-auto mt-10 text-sm md:text-base leading-relaxed font-light">
            The R6,500 build is once-off, full stop. The R3,200 monthly retainer is there if you
            want it — ongoing SEO/AEO, Google Business Profile management, and a direct line for
            changes — but it's your call, not a condition of the build. Plenty of clients start with
            the build alone and add the retainer later, or not at all.
          </p>
        </Reveal>
        <Reveal delay={0.19}>
          <p className="text-ivory/70 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed font-light">
            What's one new customer worth to you? For most of the businesses we work with —
            plumbers, electricians, brokers, attorneys — a single new client covers the retainer for
            months. If you do take it and your website isn't producing at least that, it's costing
            you more than we do.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-ivory/70 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed font-light">
            We're early. You can see that — we've shown you our own work, not a wall of logos. Early
            is worth something to you: founder pricing, founder attention, and a partner with
            everything to prove.
          </p>
          <p className="text-ivory/70 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed font-light">
            In exchange, we ask for one thing: when we get you results, we publish them. Your
            business becomes a named case study on this page — real numbers, your words.
          </p>
          <p className="text-ivory/80 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed">
            That's the trade. Founding rates end when the case-study page fills up.
          </p>
          <Link to="/contact" className="btn-gold btn-gold-hover mt-8">
            Get Your Free Audit
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Founder ---------------- */
function Founder() {
  return (
    <section className="py-28 px-6 bg-[#0c1a30] border-t border-b border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-14 items-start">
        <Reveal>
          <div className="mx-auto md:mx-0 w-[180px] md:w-full aspect-square bg-[#0A1628] border border-white/10 flex items-center justify-center text-center p-4">
            <span className="text-slate-muted text-xs leading-relaxed">
              [FILL: founder photo — add to /public and reference here before publishing]
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="label-eyebrow mb-4">Who you're dealing with</div>
          <p className="text-ivory/80 leading-relaxed font-light mb-5">
            Meridian Digital is run by Saud Zeyn Olla, founder of the Meridian Holdings Group,
            serving businesses across South Africa. When you call, you get the person who builds
            your site and answers for the results — not an account manager, not a call centre, not a
            ticket number.
          </p>
          <p className="text-ivory/70 leading-relaxed font-light mb-8">
            We're a young agency and we don't pretend otherwise. What you get in exchange:
            founder-level attention on your project, straight answers about what's working and what
            isn't, and pricing that reflects where we are — not where the big agencies' overheads
            are.
          </p>
          <div className="flex flex-wrap gap-4">
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
            {/* [FILL: site email address — add a mailto: link here once confirmed] */}
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
            Get your free <span className="italic text-gold-soft">10-point audit.</span>
          </h2>
          <p className="text-ivory/70 leading-relaxed font-light text-[1.02rem] max-w-md mx-auto mb-10">
            No obligation, no jargon — just the three most important things to fix in your online
            presence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/contact" className="btn-gold btn-gold-hover">
              Get Your Free Audit
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
      <Founding />
      <Founder />
      <ClosingCta />
    </>
  );
}
