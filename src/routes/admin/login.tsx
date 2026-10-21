import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../../lib/supabase";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (active && data.user?.app_metadata?.role === "admin") {
        void navigate({ to: "/admin" });
      }
    });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("error");
      setMessage("Admin sign-in is not configured yet.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      setStatus("error");
      setMessage("Your email or password is not recognised.");
      return;
    }

    if (data.user.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      setStatus("error");
      setMessage("This account does not have administrator access.");
      return;
    }

    await navigate({ to: "/admin" });
  }

  return (
    <main className="min-h-screen bg-navy-deep px-6 pt-32 pb-20 text-ivory">
      <section className="mx-auto max-w-md border border-white/10 bg-navy/50 p-7 sm:p-9">
        <p className="text-gold text-xs uppercase tracking-[0.24em]">Meridian Digital</p>
        <h1 className="mt-4 font-serif text-4xl">Admin sign in</h1>
        <p className="mt-4 text-sm leading-6 text-slate-muted">
          This area is for authorised Meridian administrators only.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-ivory/85">
            Email address
            <input
              className="mt-2 w-full border border-white/15 bg-navy-deep px-3 py-3 text-ivory outline-none transition-colors placeholder:text-slate-muted focus:border-gold"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm text-ivory/85">
            Password
            <input
              className="mt-2 w-full border border-white/15 bg-navy-deep px-3 py-3 text-ivory outline-none transition-colors placeholder:text-slate-muted focus:border-gold"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {status === "error" && <p className="text-sm text-red-300">{message}</p>}
          <button className="btn-gold w-full justify-center" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link
          to="/admin/reset-password"
          className="mt-5 inline-block text-sm text-slate-muted underline underline-offset-4 hover:text-gold"
        >
          Forgot your password?
        </Link>

        <Link to="/" className="mt-5 inline-block text-sm text-slate-muted underline underline-offset-4 hover:text-gold">
          Return to website
        </Link>
      </section>
    </main>
  );
}
