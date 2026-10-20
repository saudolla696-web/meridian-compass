import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../../lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminHomePage,
});

function AdminHomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!supabase) {
      void navigate({ to: "/admin/login" });
      return;
    }

    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      if (data.user?.app_metadata?.role !== "admin") {
        void navigate({ to: "/admin/login" });
        return;
      }
      setEmail(data.user.email ?? "Administrator");
    });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function signOut() {
    await supabase?.auth.signOut();
    await navigate({ to: "/admin/login" });
  }

  return (
    <main className="min-h-screen bg-navy-deep px-6 pt-32 pb-20 text-ivory">
      <section className="mx-auto max-w-2xl border border-white/10 bg-navy/50 p-7 sm:p-9">
        <p className="text-gold text-xs uppercase tracking-[0.24em]">Meridian Digital</p>
        <h1 className="mt-4 font-serif text-4xl">Admin area</h1>
        <p className="mt-4 text-sm leading-6 text-slate-muted">Signed in as {email}.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-ghost-gold">View website</Link>
          <button className="text-sm text-slate-muted underline underline-offset-4 hover:text-gold" onClick={signOut}>
            Sign out
          </button>
        </div>
      </section>
    </main>
  );
}
