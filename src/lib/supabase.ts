import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Until VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set in Vercel's
// Environment Variables, this stays null instead of throwing at render time.
// createClient() validates its arguments immediately and throws if the URL
// is missing — that throw was happening on every server render before this guard.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export interface ContactFormPayload {
  name: string;
  business: string;
  website: string;
  contact: string;
  message: string;
  _hp: string;
  _loadedAt: string;
}

export async function submitContactForm(payload: ContactFormPayload) {
  if (!supabase) {
    return { ok: false, error: "Contact form is not configured yet." };
  }

  const { data, error } = await supabase.functions.invoke("contact-submit", {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || "Submission failed");
  }

  return data as { ok: boolean; error?: string };
}
