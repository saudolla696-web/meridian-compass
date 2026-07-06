import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitContactForm } from "../../lib/supabase";
import { Reveal } from "./Reveal";

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-slate-muted text-[0.7rem] tracking-[0.2em] uppercase mb-2">
        {label}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        type="text"
        className="w-full bg-[#0A1628] border border-white/10 px-4 py-3 text-ivory text-sm focus:border-gold transition-colors outline-none placeholder:text-slate-muted/50"
      />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const loadedAt = useRef<string>(String(Date.now()));
  useEffect(() => {
    loadedAt.current = String(Date.now());
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      business: String(fd.get("business") || ""),
      website: String(fd.get("website") || ""),
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
    } catch {
      setStatus("err");
    }
  };

  return (
    <Reveal delay={0.1}>
      <form
        onSubmit={onSubmit}
        className="bg-[#0c1a30] border border-white/8 p-8 md:p-10 space-y-5"
      >
        {/* honeypot - off-screen, not display:none */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
          aria-hidden
        >
          <label>
            Leave empty
            <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <Field label="Your name" name="name" required />
        <Field label="Business name" name="business" required />
        <Field
          label="Website or Facebook page URL"
          name="website"
          placeholder="Leave blank if you don't have one — that's fine"
        />
        <Field label="Phone or email — where should we send the audit?" name="contact" required />
        <div>
          <label className="block text-slate-muted text-[0.7rem] tracking-[0.2em] uppercase mb-2">
            Anything specific bothering you?
          </label>
          <textarea
            name="message"
            rows={4}
            className="w-full bg-[#0A1628] border border-white/10 px-4 py-3 text-ivory text-sm focus:border-gold transition-colors outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold btn-gold-hover w-full disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send Me My Free Audit"}
        </button>
        {status === "ok" && (
          <p className="text-teal text-sm">
            Got it. Your audit will be with you within 2 business days. If you gave us a phone
            number, it'll arrive on WhatsApp.
          </p>
        )}
        {status === "err" && (
          <p className="text-amber text-sm">
            Something went wrong. Please try the phone or WhatsApp link.
          </p>
        )}
      </form>
    </Reveal>
  );
}
