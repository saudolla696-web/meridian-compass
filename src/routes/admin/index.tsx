import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../../lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminHomePage,
});

function AdminHomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = useCallback(async () => {
    if (!supabase) return;

    setIsLoading(true);
    setError("");
    const { data, error: functionError } = await supabase.functions.invoke("admin-leads");

    if (functionError || !Array.isArray(data?.leads)) {
      setError("We could not load the lead register. Refresh the page or sign in again.");
      setIsLoading(false);
      return;
    }

    setLeads(data.leads as Lead[]);
    setIsLoading(false);
  }, []);

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
      void loadLeads();
    });

    return () => {
      active = false;
    };
  }, [loadLeads, navigate]);

  async function signOut() {
    await supabase?.auth.signOut();
    await navigate({ to: "/admin/login" });
  }

  return (
    <main className="min-h-screen bg-navy-deep px-6 pt-32 pb-20 text-ivory">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 border border-white/10 bg-navy/50 p-7 sm:flex-row sm:items-end sm:p-9">
          <div>
            <p className="text-gold text-xs uppercase tracking-[0.24em]">Meridian Digital</p>
            <h1 className="mt-4 font-serif text-4xl">Lead register</h1>
            <p className="mt-3 text-sm leading-6 text-slate-muted">Secure submissions from your website contact form. Signed in as {email}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-ghost-gold" onClick={() => void loadLeads()} disabled={isLoading}>
              {isLoading ? "Refreshing…" : "Refresh leads"}
            </button>
            <Link to="/" className="btn-ghost-gold">View website</Link>
            <button className="text-sm text-slate-muted underline underline-offset-4 hover:text-gold" onClick={signOut}>Sign out</button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <LeadMetric label="All leads" value={leads.length} />
          <LeadMetric label="New" value={leads.filter((lead) => lead.status === "new").length} />
          <LeadMetric label="Contacted" value={leads.filter((lead) => lead.status === "contacted").length} />
          <LeadMetric label="Qualified" value={leads.filter((lead) => lead.status === "qualified").length} />
        </div>

        <section className="mt-5 border border-white/10 bg-navy/50">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
            <h2 className="font-serif text-2xl">Website enquiries</h2>
            <span className="text-xs uppercase tracking-[0.16em] text-slate-muted">Latest first</span>
          </div>
          {error ? <p className="p-7 text-sm text-red-200">{error}</p> : null}
          {!error && isLoading ? <p className="p-7 text-sm text-slate-muted">Loading your leads…</p> : null}
          {!error && !isLoading && leads.length === 0 ? (
            <p className="p-7 text-sm leading-6 text-slate-muted">No leads yet. New contact-form enquiries will appear here automatically.</p>
          ) : null}
          {!error && !isLoading && leads.length > 0 ? <LeadTable leads={leads} /> : null}
        </section>
      </section>
    </main>
  );
}

type Lead = {
  id: string;
  created_at: string;
  name: string;
  business: string;
  website: string | null;
  contact: string;
  message: string | null;
  status: "new" | "contacted" | "qualified" | "closed";
};

function LeadMetric({ label, value }: { label: string; value: number }) {
  return <div className="border border-white/10 bg-navy/50 px-5 py-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-muted">{label}</p><p className="mt-2 font-serif text-3xl text-gold">{value}</p></div>;
}

function LeadTable({ leads }: { leads: Lead[] }) {
  return <div className="overflow-x-auto"><table className="min-w-[800px] w-full text-left text-sm"><thead className="border-b border-white/10 text-[0.66rem] uppercase tracking-[0.14em] text-slate-muted"><tr><th className="px-5 py-4 font-medium sm:px-7">Received</th><th className="px-5 py-4 font-medium">Contact</th><th className="px-5 py-4 font-medium">Enquiry</th><th className="px-5 py-4 font-medium">Status</th></tr></thead><tbody>{leads.map((lead) => <tr className="border-b border-white/5 align-top last:border-0" key={lead.id}><td className="whitespace-nowrap px-5 py-5 text-slate-muted sm:px-7">{new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lead.created_at))}</td><td className="px-5 py-5"><p className="font-medium text-ivory">{lead.name}</p><p className="mt-1 text-slate-muted">{lead.business}</p><p className="mt-2 text-gold">{lead.contact}</p>{lead.website ? <a className="mt-1 block max-w-48 truncate text-xs text-slate-muted underline underline-offset-4 hover:text-gold" href={lead.website} target="_blank" rel="noreferrer">{lead.website}</a> : null}</td><td className="max-w-sm px-5 py-5 leading-6 text-slate-muted">{lead.message || "—"}</td><td className="px-5 py-5"><span className="border border-gold/30 px-2 py-1 text-xs capitalize text-gold">{lead.status}</span></td></tr>)}</tbody></table></div>;
}
