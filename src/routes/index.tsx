import { useEffect, useRef, useState, useMemo, type FormEvent } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { submitContactForm } from "../lib/supabase";

const logoMarkUrl = "/logo-mark.png";
const logoLockupUrl = "/logo-lockup.png";

export const Route = createFileRoute("/")({
  component: Page,
});

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#proof", label: "Proof" },
  { href: "#founding", label: "Founding Cohort" },
  { href: "#faq", label: "FAQ" },
];

const HEADER_OFFSET = 84;

function smoothScroll(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

/* ---------------- Reveal ---------------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (reduce) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: reduce ? "none" : `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    // Defer to the next frame so the closing menu's layout settles before
    // the scroll target's position is measured, since otherwise the two can race.
    requestAnimationFrame(() => smoothScroll(href));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A1628]/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
        <a href="#top" onClick={(e) => { e.preventDefault(); setOpen(false); smoothScroll("#top"); }} className="flex items-center gap-2.5">
          <img src={logoMarkUrl} alt="" className="h-7 w-auto" />
          <span className="font-serif text-ivory text-xl tracking-wide leading-none">MERIDIAN</span>
          <span className="text-slate-muted text-[0.6rem] tracking-[0.25em] uppercase mt-1">Digital</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
              className="text-ivory/80 hover:text-gold text-sm tracking-wide transition-colors">{l.label}</a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav("#contact"); }} className="btn-ghost-gold">Chart My Course</a>
        </nav>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-ivory p-3 -mr-1 relative z-[60]"
        >
          <div className="w-6 h-[2px] bg-ivory mb-1.5" style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none", transition: "transform .25s" }} />
          <div className="w-6 h-[2px] bg-ivory mb-1.5" style={{ opacity: open ? 0 : 1, transition: "opacity .2s" }} />
          <div className="w-6 h-[2px] bg-ivory" style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none", transition: "transform .25s" }} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-[68px] bg-black/40 z-[55]"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-[#060D18] border-t border-white/5 relative z-[56]"
            >
              <nav className="px-6 py-4 flex flex-col">
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                    className="text-ivory/90 text-base tracking-wide py-3.5 border-b border-white/5 active:bg-white/5 transition-colors">{l.label}</a>
                ))}
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav("#contact"); }} className="btn-ghost-gold self-start mt-5 mb-2">Chart My Course</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
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
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
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
          const dx = (x / w) - mouse.current.sx;
          const dy = wv.offset - mouse.current.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const boost = Math.max(0, 1 - dist * 2.2) * 18;
          const y = baseY + Math.sin(x * wv.freq + t * wv.speed + i) * (wv.amp + boost);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
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
  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 18,
    dur: 22 + Math.random() * 26,
  })), []);
  if (reduce) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span key={p.id} className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            width: p.size, height: p.size,
            opacity: 0.5,
            boxShadow: "0 0 6px #C9A84C",
            animation: `drift-dust ${p.dur}s linear ${p.delay}s infinite`,
          }} />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      <HeroCanvas />
      <Dust />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <img src={logoLockupUrl} alt="Meridian Digital" className="mx-auto w-[200px] md:w-[220px] mb-10" />
        <div className="label-eyebrow mb-6">Meridian Digital — KwaZulu-Natal</div>
        <h1 className="font-serif text-ivory leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <span className="italic block">Every business</span>
          <span className="block">has its meridian.</span>
        </h1>
        <p className="mt-8 text-ivory/75 max-w-2xl mx-auto text-base md:text-[1.05rem] leading-relaxed font-light">
          A meridian is the line the sun crosses at its highest point — the instant a position is fixed beyond doubt. We build the websites, search presence, and growth systems that fix yours: engineered in a single day, built to be found, chosen, and remembered.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a href="#contact" onClick={(e) => { e.preventDefault(); smoothScroll("#contact"); }} className="btn-gold btn-gold-hover">Chart My Course</a>
          <a href="#process" onClick={(e) => { e.preventDefault(); smoothScroll("#process"); }}
            className="text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors">
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
          "A position isn't real until it's fixed. We exist to fix yours — in search, in front of customers, and in the minds of the people deciding who to trust."
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------- Services ---------------- */
const SERVICES = [
  { bearing: "000°", dir: "North", title: "Web Design & Build", body: "A fully built, brand-true website — live in a single day, not a season of revisions. Modern tools, designed like a flagship, not a template." },
  { bearing: "090°", dir: "East", title: "Search Visibility", body: "Found by the people already looking for you. We tune your presence for Google's results, Google's map, and the customers nearby who need you today." },
  { bearing: "180°", dir: "South", title: "Systems & CRM", body: "A Google Business Profile that converts, and a CRM that remembers every lead so you don't have to. The quiet infrastructure behind real growth." },
  { bearing: "270°", dir: "West", title: "Answer Engine Optimisation", body: "The next search engine doesn't scroll — it answers. We structure your business to be the answer an AI gives, not the link it skips past." },
];

function CompassBackdrop() {
  return (
    <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none" aria-hidden>
      <div className="relative w-[420px] h-[420px]">
        <div className="absolute inset-0 rounded-full border border-gold/15" />
        <div className="absolute inset-10 rounded-full border border-gold/10" />
        <div className="absolute inset-20 rounded-full border border-gold/8" />
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-[2px] h-[160px] bg-gradient-to-t from-transparent via-gold/30 to-gold" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[2px] h-[140px] bg-gradient-to-b from-teal/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
        </div>
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-gold/60 text-xs tracking-[0.3em]">N</span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gold/40 text-xs tracking-[0.3em]">S</span>
        <span className="absolute top-1/2 -translate-y-1/2 left-2 text-gold/40 text-xs tracking-[0.3em]">W</span>
        <span className="absolute top-1/2 -translate-y-1/2 right-2 text-gold/40 text-xs tracking-[0.3em]">E</span>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">Services</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl">
              Four bearings. <span className="italic text-gold-soft">One outcome.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          <CompassBackdrop />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.bearing} delay={i * 0.08}>
                <div className="bg-[#0c1a30]/85 backdrop-blur-sm border border-white/8 p-8 md:p-10 h-full hover:border-gold/40 transition-colors">
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="font-mono text-gold text-sm tracking-[0.25em]">{s.bearing}</span>
                    <span className="text-slate-muted text-xs uppercase tracking-[0.3em]">{s.dir}</span>
                  </div>
                  <h3 className="font-serif text-ivory text-2xl md:text-3xl mb-4">{s.title}</h3>
                  <p className="text-ivory/70 leading-relaxed text-[0.95rem] font-light">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
const STEPS = [
  { title: "Chart", body: "We map your business, your customers, and your competitors before a single pixel is placed." },
  { title: "Build", body: "Your site takes shape within a day — brand-matched, written with intent, built on modern infrastructure." },
  { title: "Calibrate", body: "SEO, AEO, Google Business Profile, and CRM are wired in, so the build doesn't sit idle the moment it's live." },
  { title: "Launch", body: "You go live — and we stay on, checking the instruments every month so growth doesn't quietly stall." },
];

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
                    <span className="text-gold text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
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
                    <span className="text-gold text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
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

/* ---------------- Proof ---------------- */
const PROOF = [
  { initials: "CMM", slug: "countrymilemotors.co.za", name: "Country Mile Motors", meta: "Used Vehicle Dealership · Harding, KZN", body: "Full static site and client proposal built from a standing start — stock listings, financing enquiries, and a dealership that finally looks the part online." },
  { initials: "BC", slug: "bottegacoffee.co.za", name: "Bottega Coffee", meta: "Halaal Coffee Shop · Pietermaritzburg & Durban", body: "Comprehensive rebuild across two locations — menu, story, and find-us all rebuilt to match the brand actually behind the counter." },
  { initials: "SHW", slug: "sterlinghamiltonwright.co.za", name: "Sterling Hamilton Wright", meta: "FSP-Licensed Insurance Brokerage · Pietermaritzburg", body: "A regulated financial services brand needed a site that reads as trustworthy on sight — licence number visible, language plain, nothing oversold." },
];

function BrowserCard({ p, i }: { p: typeof PROOF[number]; i: number }) {
  return (
    <Reveal delay={i * 0.1}>
      <div className="bg-[#0c1a30] border border-white/8 overflow-hidden hover:border-gold/30 transition-colors h-full flex flex-col">
        <div className="bg-[#060D18] border-b border-white/8 px-4 py-2.5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
          <div className="ml-3 flex-1 bg-[#0A1628] rounded-sm px-3 py-1 text-[0.7rem] text-slate-muted truncate font-mono">{p.slug}</div>
        </div>
        <div className="relative aspect-[16/10] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0A1628 0%, #11203A 60%, #0c1a30 100%)" }}>
          <span className="font-serif italic text-gold-soft/40 text-7xl select-none">{p.initials}</span>
          <span className="absolute bottom-3 right-3 text-[0.6rem] tracking-[0.25em] uppercase text-slate-muted/70 border border-slate-muted/30 px-2 py-0.5">Screenshot pending</span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-serif text-ivory text-xl mb-1">{p.name}</h3>
          <p className="text-slate-muted text-xs tracking-wide mb-4">{p.meta}</p>
          <p className="text-ivory/70 text-sm leading-relaxed font-light">{p.body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Proof() {
  return (
    <section id="proof" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">Proof</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl max-w-3xl mx-auto leading-tight">
              Three businesses. Three different problems. <span className="italic text-gold-soft">Same route.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROOF.map((p, i) => <BrowserCard key={p.name} p={p} i={i} />)}
        </div>
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
            Ten businesses. One year. <span className="italic text-gold-soft">A direct line to the people building it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-y border-white/10 py-10">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-serif text-gold text-2xl sm:text-3xl md:text-4xl mb-2">{s.v}</div>
                <div className="text-slate-muted text-[0.7rem] uppercase tracking-[0.18em]">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-ivory/70 max-w-2xl mx-auto mt-10 text-sm md:text-base leading-relaxed font-light">
            No call centre, no account handoff — you deal directly with the people who build and run it. Once the cohort is full, the rate closes with it. Spots remaining? Ask us directly — we'll tell you straight.
          </p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); smoothScroll("#contact"); }} className="btn-gold btn-gold-hover mt-10">
            Reserve a Founding Place
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "If you build it in a day, how is it not cheap?", a: "Speed comes from the workflow, not from cutting corners — modern AI-assisted tools handle the scaffolding so the time we'd normally spend on boilerplate goes into your actual brand, copy, and structure instead. The build is fast. The thinking behind it isn't rushed." },
  { q: "What is Answer Engine Optimisation (AEO), in plain terms?", a: "SEO gets you ranked in a list of links. AEO gets your business named directly when someone asks an AI assistant a question — 'best coffee shop in Pietermaritzburg,' 'Toyota dealership near Harding.' It's structuring your site and listings so the answer engines have a clear, correct answer to give, with your business as the source." },
  { q: "What happens once the Founding Client Programme is full?", a: "The R6,500 once-off and R3,200 per month rate is locked for the first ten businesses only. After that, pricing moves to standard rates. Existing Founding Clients keep their locked terms for the full 12 months regardless." },
  { q: "Do you only work with businesses in KwaZulu-Natal?", a: "KZN is home turf and where we meet clients in person, but the build process itself works anywhere in South Africa. If you're outside the area, ask — most of the work happens the same way regardless of postcode." },
  { q: "I already have a website. Is there a point talking to you?", a: "Usually, yes — most existing sites we audit are missing Google Business Profile setup, have no AEO structure, or haven't been touched since they were built. We'll tell you plainly what's working and what isn't before recommending anything." },
  { q: "What does the R3,200 monthly retainer actually cover?", a: "Ongoing SEO and AEO maintenance, Google Business Profile management, CRM upkeep, and a direct line to make changes — not a support ticket queue. The site doesn't go live and get abandoned." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 px-6 bg-[#060D18] border-y border-white/5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="label-eyebrow mb-4">FAQ</div>
            <h2 className="font-serif text-ivory text-4xl md:text-5xl">
              Straight answers, <span className="italic text-gold-soft">no sales script.</span>
            </h2>
          </div>
        </Reveal>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 text-left py-6 group"
                  >
                    <span className="font-serif text-ivory text-lg md:text-xl group-hover:text-gold-soft transition-colors">{f.q}</span>
                    <span className="text-gold text-2xl leading-none mt-1 shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="text-ivory/70 leading-relaxed font-light pb-6 pr-10 text-[0.95rem]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const loadedAt = useRef<string>(String(Date.now()));
  useEffect(() => { loadedAt.current = String(Date.now()); }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      business: String(fd.get("business") || ""),
      contact: String(fd.get("contact") || ""),
      message: String(fd.get("message") || ""),
      _hp: String(fd.get("_hp") || ""),
      _loadedAt: loadedAt.current,
    };
    setStatus("sending");
    try {
      const result = await submitContactForm(payload);
      if (result.ok) {
        setStatus("ok");
        (e.target as HTMLFormElement).reset();
      } else setStatus("err");
    } catch { setStatus("err"); }
  };

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
              Tell us about the business. We'll tell you, plainly, what it would take to get you found, chosen, and remembered — no obligation, no jargon.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="tel:+27658839408" className="btn-ghost-gold">065 883 9408</a>
              <a href="https://wa.me/27658839408" target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
                Message on WhatsApp →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="bg-[#0c1a30] border border-white/8 p-8 md:p-10 space-y-5">
            {/* honeypot - off-screen, not display:none */}
            <div style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }} aria-hidden>
              <label>Leave empty<input type="text" name="_hp" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <Field label="Name" name="name" required />
            <Field label="Business" name="business" required />
            <Field label="Phone or Email" name="contact" required />
            <div>
              <label className="block text-slate-muted text-[0.7rem] tracking-[0.2em] uppercase mb-2">What are you trying to fix?</label>
              <textarea name="message" rows={4} required
                className="w-full bg-[#0A1628] border border-white/10 px-4 py-3 text-ivory text-sm focus:border-gold transition-colors outline-none resize-none" />
            </div>
            <button type="submit" disabled={status === "sending"} className="btn-gold btn-gold-hover w-full disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
            {status === "ok" && <p className="text-teal text-sm">Thank you — we'll be in touch shortly.</p>}
            {status === "err" && <p className="text-amber text-sm">Something went wrong. Please try the phone or WhatsApp link.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-slate-muted text-[0.7rem] tracking-[0.2em] uppercase mb-2">{label}</label>
      <input
        name={name}
        required={required}
        type="text"
        className="w-full bg-[#0A1628] border border-white/10 px-4 py-3 text-ivory text-sm focus:border-gold transition-colors outline-none"
      />
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[#060D18] border-t border-white/5 py-14 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <img src={logoMarkUrl} alt="" className="h-6 w-auto" />
          <span className="font-serif text-ivory text-lg tracking-wide">MERIDIAN</span>
          <span className="text-slate-muted text-[0.55rem] tracking-[0.25em] uppercase mt-1">Digital</span>
        </div>
        <p className="text-slate-muted text-xs tracking-wide mb-1">A division of Meridian Holdings Group</p>
        <p className="text-slate-muted/70 text-xs">© 2026 Meridian Digital. KwaZulu-Natal, South Africa.</p>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Page() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Philosophy />
        <Services />
        <Process />
        <Proof />
        <Founding />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
