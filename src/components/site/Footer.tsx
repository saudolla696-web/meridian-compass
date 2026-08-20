import { Link } from "@tanstack/react-router";

const logoMarkUrl = "/logo-mark.png";

export function Footer() {
  return (
    <footer className="bg-[#060D18] border-t border-white/5 py-14 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <img src={logoMarkUrl} alt="" className="h-6 w-auto" />
          <span className="font-serif text-ivory text-lg tracking-wide">MERIDIAN</span>
          <span className="text-slate-muted text-[0.55rem] tracking-[0.25em] uppercase mt-1">
            Digital
          </span>
        </div>
        <p className="text-slate-muted text-xs tracking-wide mb-1">
          A division of Meridian Holdings Group
        </p>
        <div className="flex items-center justify-center gap-x-4 gap-y-1 flex-wrap">
          <a
            href="https://www.linkedin.com/company/meridian-digital-holdings/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-muted hover:text-gold text-xs tracking-wide underline underline-offset-2 transition-colors"
          >
            Follow on LinkedIn
          </a>
          <a
            href="https://www.instagram.com/meridian_digital_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-muted hover:text-gold text-xs tracking-wide underline underline-offset-2 transition-colors"
          >
            Follow on Instagram
          </a>
        </div>
        <div className="mt-8 mb-2">
          <Link to="/contact" className="btn-gold btn-gold-hover">
            Get Your Free Audit
          </Link>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 mb-6">
          <Link
            to="/services"
            className="text-slate-muted hover:text-gold text-xs tracking-wide transition-colors"
          >
            Services
          </Link>
          <Link
            to="/case-studies"
            className="text-slate-muted hover:text-gold text-xs tracking-wide transition-colors"
          >
            Case Studies
          </Link>
          <Link
            to="/insights"
            className="text-slate-muted hover:text-gold text-xs tracking-wide transition-colors"
          >
            Insights
          </Link>
          <Link
            to="/faq"
            className="text-slate-muted hover:text-gold text-xs tracking-wide transition-colors"
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className="text-slate-muted hover:text-gold text-xs tracking-wide transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="mt-6 mb-6 pt-6 border-t border-white/5 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="text-slate-muted/50 text-[0.6rem] uppercase tracking-[0.2em] mb-3">
              Services
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link
                to="/services/web-design"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Web Design
              </Link>
              <Link
                to="/services/seo"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                SEO
              </Link>
              <Link
                to="/services/aeo"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                AEO
              </Link>
              <Link
                to="/services/google-business-profile"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Google Business Profile
              </Link>
            </nav>
          </div>
          <div className="mb-6">
            <div className="text-slate-muted/50 text-[0.6rem] uppercase tracking-[0.2em] mb-3">
              Industries
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link
                to="/for/plumbers-electricians"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Plumbers & Electricians
              </Link>
              <Link
                to="/for/financial-advisors-brokers"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Financial Advisors & Brokers
              </Link>
              <Link
                to="/for/attorneys"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Attorneys
              </Link>
            </nav>
          </div>
          <div>
            <div className="text-slate-muted/50 text-[0.6rem] uppercase tracking-[0.2em] mb-3">
              Service Areas
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link
                to="/web-design-durban"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Web Design Durban
              </Link>
              <Link
                to="/web-design-pietermaritzburg"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Web Design Pietermaritzburg
              </Link>
              <Link
                to="/web-design-umhlanga"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Web Design Umhlanga
              </Link>
              <Link
                to="/web-design-pinetown"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Web Design Pinetown
              </Link>
              <Link
                to="/web-design-ballito"
                className="text-slate-muted/70 hover:text-gold text-[0.7rem] tracking-wide transition-colors"
              >
                Web Design Ballito
              </Link>
            </nav>
          </div>
        </div>
        <p className="text-slate-muted/70 text-xs">
          © 2026 Meridian Digital. KwaZulu-Natal, South Africa.
        </p>
      </div>
    </footer>
  );
}
