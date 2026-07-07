import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { SERVICES, STEPS, SITE_URL } from "../../lib/site-content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Web Design, Search Visibility, CRM & AEO | Meridian Digital" },
      {
        name: "description",
        content:
          "The full breakdown of what Meridian Digital builds: brand-true web design, search visibility, systems & CRM, and Answer Engine Optimisation — plus how we run the build, start to finish.",
      },
      { property: "og:title", content: "Services | Meridian Digital" },
      {
        property: "og:description",
        content:
          "Web design, search visibility, systems & CRM, and Answer Engine Optimisation — four bearings, one outcome.",
      },
      { property: "og:url", content: `${SITE_URL}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: ServicesPage,
});

function CompassBackdrop() {
  return (
    <div
      className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none"
      aria-hidden
    >
      <div className="relative w-[420px] h-[420px]">
        <div className="absolute inset-0 rounded-full border border-gold/15" />
        <div className="absolute inset-10 rounded-full border border-gold/10" />
        <div className="absolute inset-20 rounded-full border border-gold/8" />
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-[2px] h-[160px] bg-gradient-to-t from-transparent via-gold/30 to-gold" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[2px] h-[140px] bg-gradient-to-b from-teal/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
        </div>
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-gold/60 text-xs tracking-[0.3em]">
          N
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gold/40 text-xs tracking-[0.3em]">
          S
        </span>
        <span className="absolute top-1/2 -translate-y-1/2 left-2 text-gold/40 text-xs tracking-[0.3em]">
          W
        </span>
        <span className="absolute top-1/2 -translate-y-1/2 right-2 text-gold/40 text-xs tracking-[0.3em]">
          E
        </span>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <section className="py-28 px-6 relative overflow-hidden">
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
                      <span className="font-mono text-gold text-sm tracking-[0.25em]">
                        {s.bearing}
                      </span>
                      <span className="text-slate-muted text-xs uppercase tracking-[0.3em]">
                        {s.dir}
                      </span>
                    </div>
                    <h3 className="font-serif text-ivory text-2xl md:text-3xl mb-4">{s.title}</h3>
                    <p className="text-ivory/70 leading-relaxed text-[0.95rem] font-light">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-24 px-6 text-center border-t border-white/5">
        <Reveal>
          <h2 className="font-serif text-ivory text-3xl md:text-4xl mb-8">
            Want to know where <span className="italic text-gold-soft">yours</span> stands?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/contact" className="btn-gold btn-gold-hover">
              Get Your Free Audit
            </Link>
            <Link
              to="/"
              hash="founding"
              hashScrollIntoViewOptions={{ behavior: "smooth" }}
              className="text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
