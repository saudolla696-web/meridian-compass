import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export interface ContactFormPayload {
  name: string;
  business: string;
  contact: string;
  message: string;
  _hp: string;
  _loadedAt: string;
}

export async function submitContactForm(payload: ContactFormPayload) {
  const { data, error } = await supabase.functions.invoke('contact-submit', {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || 'Submission failed');
  }

  return data as { ok: boolean; error?: string };
}
