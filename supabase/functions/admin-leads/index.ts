import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://www.meridiandigital.co.za",
  "https://meridiandigital.co.za",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
]);

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin && allowedOrigins.has(origin)
      ? origin
      : "https://www.meridiandigital.co.za",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request) => {
  const headers = corsHeaders(request.headers.get("Origin"));

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, headers);
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return json({ error: "Authentication required" }, 401, headers);
  }

  const projectUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const token = authorization.slice("Bearer ".length);

  const authClient = createClient(projectUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: { user }, error: userError } = await authClient.auth.getUser(token);

  if (userError || !user) {
    return json({ error: "Your session has expired. Please sign in again." }, 401, headers);
  }

  if (user.app_metadata?.role !== "admin") {
    return json({ error: "Administrator access is required." }, 403, headers);
  }

  const adminClient = createClient(projectUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: leads, error: leadsError } = await adminClient
    .from("contact_submissions")
    .select("id, created_at, name, business, website, contact, message, status, source_url")
    .order("created_at", { ascending: false })
    .limit(100);

  if (leadsError) {
    console.error("Unable to load leads", leadsError);
    return json({ error: "Unable to load leads right now." }, 500, headers);
  }

  return json({ leads: leads ?? [] }, 200, headers);
});
