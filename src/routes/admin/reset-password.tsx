import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../../lib/supabase";

export const Route = createFileRoute("/admin/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) setHasRecoverySession(true);
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) setHasRecoverySession(true);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function requestReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setStatus("error");
      setMessage("Password reset is not configured yet.");
      return;
    }

    setStatus("loading");
    setMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setStatus("error");
      if (error.status === 429 || /rate limit|too many requests/i.test(error.message)) {
        setMessage("A reset email was requested recently. Wait one minute, then use the newest reset email only.");
      } else {
        setMessage("We could not send the reset email. Please check your connection and try again.");
      }
      return;
    }

    setStatus("sent");
    setMessage("If that address is an administrator account, a reset link is on its way.");
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    if (password.length < 10) {
      setStatus("error");
      setMessage("Choose a password with at least 10 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("The passwords do not match.");
      return;
    }

    setStatus("loading");
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setMessage("Your reset link may have expired. Request a new one and try again.");
      return;
    }

    await supabase.auth.signOut();
    await navigate({ to: "/admin/login" });
  }

  return (
    <main className="min-h-screen bg-navy-deep px-6 pt-32 pb-20 text-ivory">
      <section className="mx-auto max-w-md border border-white/10 bg-navy/50 p-7 sm:p-9">
        <p className="text-gold text-xs uppercase tracking-[0.24em]">Meridian Digital</p>
        <h1 className="mt-4 font-serif text-4xl">Reset password</h1>
        <p className="mt-4 text-sm leading-6 text-slate-muted">
          {hasRecoverySession
            ? "Choose a new password for your administrator account."
            : "Enter your administrator email and we will send you a secure reset link."}
        </p>

        {hasRecoverySession ? (
          <form className="mt-8 space-y-5" onSubmit={updatePassword}>
            <label className="block text-sm text-ivory/85">
              New password
              <input
                className="mt-2 w-full border border-white/15 bg-navy-deep px-3 py-3 text-ivory outline-none transition-colors focus:border-gold"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <label className="block text-sm text-ivory/85">
              Confirm new password
              <input
                className="mt-2 w-full border border-white/15 bg-navy-deep px-3 py-3 text-ivory outline-none transition-colors focus:border-gold"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
            {status === "error" && <p className="text-sm text-red-300">{message}</p>}
            <button className="btn-gold w-full justify-center" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Saving…" : "Save new password"}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={requestReset}>
            <label className="block text-sm text-ivory/85">
              Administrator email
              <input
                className="mt-2 w-full border border-white/15 bg-navy-deep px-3 py-3 text-ivory outline-none transition-colors focus:border-gold"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            {status === "error" && <p className="text-sm text-red-300">{message}</p>}
            {status === "sent" && <p className="text-sm text-emerald-200">{message}</p>}
            <button className="btn-gold w-full justify-center" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}

        <Link to="/admin/login" className="mt-7 inline-block text-sm text-slate-muted underline underline-offset-4 hover:text-gold">
          Return to sign in
        </Link>
      </section>
    </main>
  );
}
