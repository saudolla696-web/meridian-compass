import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function AuditCta({ heading = "Want to know where yours stands?" }: { heading?: string }) {
  return (
    <section className="py-24 px-6 text-center border-t border-white/5">
      <Reveal>
        <h2 className="font-serif text-ivory text-3xl md:text-4xl mb-8">{heading}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
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
      </Reveal>
    </section>
  );
}
