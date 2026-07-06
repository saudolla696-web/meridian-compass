import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import type { CaseStudy } from "../../lib/site-content";

export function BrowserCard({ p, i }: { p: CaseStudy; i: number }) {
  return (
    <Reveal delay={i * 0.1}>
      <Link to="/case-studies/$id" params={{ id: p.id }} className="block">
        <div className="bg-[#0c1a30] border border-white/8 overflow-hidden hover:border-gold/30 transition-colors h-full flex flex-col">
          <div className="bg-[#060D18] border-b border-white/8 px-4 py-2.5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
            <div className="ml-3 flex-1 bg-[#0A1628] rounded-sm px-3 py-1 text-[0.7rem] text-slate-muted truncate font-mono">
              {p.domain}
            </div>
          </div>
          <div
            className="relative aspect-[16/10] flex items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0A1628 0%, #11203A 60%, #0c1a30 100%)" }}
          >
            {p.image ? (
              <img
                src={p.image}
                alt={`${p.name} website screenshot`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <>
                <span className="font-serif italic text-gold-soft/40 text-7xl select-none">
                  {p.initials}
                </span>
                <span className="absolute bottom-3 right-3 text-[0.6rem] tracking-[0.25em] uppercase text-slate-muted/70 border border-slate-muted/30 px-2 py-0.5">
                  Screenshot pending
                </span>
              </>
            )}
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-serif text-ivory text-xl mb-1">{p.name}</h3>
            <p className="text-slate-muted text-xs tracking-wide mb-3">{p.meta}</p>
            {p.disclosureLine && (
              <p className="text-gold-soft/90 text-xs italic font-light mb-3">{p.disclosureLine}</p>
            )}
            <p className="text-ivory/70 text-sm leading-relaxed font-light">{p.body}</p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
