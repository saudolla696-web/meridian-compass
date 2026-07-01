import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { ContactForm } from "../components/site/ContactForm";
import { SERVICES, SITE_URL } from "../lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Digital — Web Design, SEO & AEO in KwaZulu-Natal" },
      {
        name: "description",
        content:
          "Meridian Digital builds brand-true websites, search visibility, and answer-engine presence for KwaZulu-Natal businesses. Engineered in a day, built to be found, chosen, and remembered.",
      },
      {
        property: "og:title",
        content: "Meridian Digital — Web Design, SEO & AEO in KwaZulu-Natal",
      },
      {
        property: "og:description",
        content:
          "Websites, search presence, and growth systems engineered in a single day — built to be found, chosen, and remembered.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Page,
});

const HEADER_OFFSET = 84;

function smoothScroll(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

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
        <img
          src="/logo-lockup.png"
          alt="Meridian Digital"
          className="mx-auto w-[200px] md:w-[220px] mb-10"
        />
        <div className="label-eyebrow mb-6">Meridian Digital — KwaZulu-Natal</div>
        <h1 className="font-serif text-ivory leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <span className="italic block">Every business</span>
          <span className="block">has its meridian.</span>
        </h1>
        <p className="mt-8 text-ivory/75 max-w-2xl mx-auto text-base md:text-[1.05rem] leading-relaxed font-light">
          A meridian is the line the sun crosses at its highest point — the instant a position is
          fixed beyond doubt. We build the websites, search presence, and growth systems that fix
          yours: engineered in a single day, built to be found, chosen, and remembered.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScroll("#contact");
            }}
            className="btn-gold btn-gold-hover"
          >
            Chart My Course
          </a>
          <a
            href="#services-preview"
            onClick={(e) => {
              e.preventDefault();
              smoothScroll("#services-preview");
            }}
            className="text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
          >
            See how we build ↓
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Philosophy strip ---------------- */
function Philosophy() {
  return (
    <section className="py-28 px-6 border-t border-b border-white/5 bg-[#0c1a30]">
      <Reveal>
        <p className="max-w-3xl mx-auto text-center font-serif italic text-ivory/90 text-2xl md:text-3xl leading-relaxed">
          "A position isn't real until it's fixed. We exist to fix yours — in search, in front of
          customers, and in the minds of the people deciding who to trust."
        </p>
      </Reveal>
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
    { v: "R3,200", l: "Per month thereafter" },
    { v: "12", l: "Months locked in" },
    { v: "10", l: "Founding places, total" },
  ];
  return (
    <section id="founding" className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-[#11203A] border border-gold/20 px-8 md:px-16 py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-gold" />
        <Reveal>
          <div className="label-eyebrow mb-4">Founding Client Programme</div>
          <h2 className="font-serif text-ivory text-3xl md:text-5xl max-w-3xl mx-auto leading-tight">
            Ten businesses. One year.{" "}
            <span className="italic text-gold-soft">A direct line to the people building it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-y border-white/10 py-10">
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
        <Reveal delay={0.2}>
          <p className="text-ivory/70 max-w-2xl mx-auto mt-10 text-sm md:text-base leading-relaxed font-light">
            No call centre, no account handoff — you deal directly with the people who build and run
            it. Once the cohort is full, the rate closes with it. Spots remaining? Ask us directly —
            we'll tell you straight.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-sm shrink-0">
              SO
            </div>
            <div className="text-left">
              <p className="text-ivory text-sm font-medium">Saud Olla</p>
              <p className="text-slate-muted text-xs tracking-wide">Founder, Meridian Digital</p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScroll("#contact");
            }}
            className="btn-gold btn-gold-hover mt-8"
          >
            Reserve a Founding Place
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <Reveal>
          <div>
            <div className="label-eyebrow mb-4">Contact</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl mb-6 leading-tight">
              Let's chart <span className="italic text-gold-soft">your course.</span>
            </h2>
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

/* ---------------- Page ---------------- */
function Page() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ServicesPreview />
      <Founding />
      <Contact />
    </>
  );
}
