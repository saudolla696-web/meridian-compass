import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

const logoMarkUrl = "/logo-mark.png";

const NAV_LINKS = [
  { to: "/services" as const, label: "Services" },
  { to: "/case-studies" as const, label: "Case Studies" },
  { to: "/insights" as const, label: "Insights" },
  { to: "/" as const, hash: "founding", label: "Pricing" },
  { to: "/faq" as const, label: "FAQ" },
];

const SERVICE_AREA_LINKS = [
  { to: "/web-design-durban" as const, label: "Web Design Durban" },
  { to: "/web-design-pietermaritzburg" as const, label: "Web Design Pietermaritzburg" },
  { to: "/web-design-umhlanga" as const, label: "Web Design Umhlanga" },
  { to: "/web-design-pinetown" as const, label: "Web Design Pinetown" },
  { to: "/web-design-ballito" as const, label: "Web Design Ballito" },
];

const INDUSTRY_LINKS = [
  { to: "/for/plumbers-electricians" as const, label: "Plumbers & Electricians" },
  { to: "/for/financial-advisors-brokers" as const, label: "Financial Advisors & Brokers" },
  { to: "/for/attorneys" as const, label: "Attorneys" },
];

export function Nav() {
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
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A1628]/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <img src={logoMarkUrl} alt="" className="h-7 w-auto" />
          <span className="font-serif text-ivory text-xl tracking-wide leading-none">MERIDIAN</span>
          <span className="text-slate-muted text-[0.6rem] tracking-[0.25em] uppercase mt-1">
            Digital
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              hashScrollIntoViewOptions={{ behavior: "smooth" }}
              className="text-ivory/80 hover:text-gold text-sm tracking-wide transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="text-ivory/80 hover:text-gold text-sm tracking-wide transition-colors flex items-center gap-1">
              Industries
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden
                className="mt-px"
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
            <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-150 z-10">
              <div className="bg-[#0c1a30] border border-white/10 py-2 min-w-[240px] shadow-xl">
                {INDUSTRY_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="block px-4 py-2.5 text-sm text-ivory/80 hover:text-gold hover:bg-white/5 transition-colors whitespace-nowrap"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/contact" className="btn-ghost-gold">
            Get Your Free Audit
          </Link>
        </nav>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-ivory p-3 -mr-1 relative z-[60]"
        >
          <div
            className="w-6 h-[2px] bg-ivory mb-1.5"
            style={{
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
              transition: "transform .25s",
            }}
          />
          <div
            className="w-6 h-[2px] bg-ivory mb-1.5"
            style={{ opacity: open ? 0 : 1, transition: "opacity .2s" }}
          />
          <div
            className="w-6 h-[2px] bg-ivory"
            style={{
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              transition: "transform .25s",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-[68px] bg-black/40 z-[55]"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-[#060D18] border-t border-white/5 relative z-[56]"
            >
              <nav className="px-6 py-4 flex flex-col">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    hash={l.hash}
                    hashScrollIntoViewOptions={{ behavior: "smooth" }}
                    onClick={() => setOpen(false)}
                    className="text-ivory/90 text-base tracking-wide py-3.5 border-b border-white/5 active:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="text-slate-muted/50 text-[0.65rem] uppercase tracking-[0.2em] pt-4 pb-1">
                  Industries
                </div>
                {INDUSTRY_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-ivory/70 text-sm tracking-wide py-2.5 border-b border-white/5 active:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="text-slate-muted/50 text-[0.65rem] uppercase tracking-[0.2em] pt-4 pb-1">
                  Service Areas
                </div>
                {SERVICE_AREA_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-ivory/70 text-sm tracking-wide py-2.5 border-b border-white/5 active:bg-white/5 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-ghost-gold self-start mt-5 mb-2"
                >
                  Get Your Free Audit
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
