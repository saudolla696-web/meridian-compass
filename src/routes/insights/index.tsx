import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AmbientBackdrop } from "../../components/site/AmbientBackdrop";
import { INSIGHTS } from "../../lib/insights-content";
import { SITE_URL, buildBreadcrumbJsonLd } from "../../lib/site-content";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
]);

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Web Design & SEO Insights for KZN Businesses | Meridian" },
      {
        name: "description",
        content:
          "Practical web design, local SEO and AI-search guidance for KwaZulu-Natal businesses that want more visibility and enquiries.",
      },
      { property: "og:title", content: "Insights | Meridian Digital" },
      {
        property: "og:description",
        content: "Practical notes on web design, SEO, and AEO — no jargon.",
      },
      { property: "og:url", content: `${SITE_URL}/insights` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/insights` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) }],
  }),
  component: InsightsIndex,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InsightsIndex() {
  return (
    <section className="relative isolate py-28 px-6 overflow-hidden">
      <AmbientBackdrop />
      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="label-eyebrow mb-4">Insights</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl leading-tight">
              Notes on getting <span className="italic text-gold-soft">found.</span>
            </h1>
          </div>
        </Reveal>

        {INSIGHTS.length === 0 ? (
          <Reveal>
            <p className="text-ivory/60 text-center leading-relaxed font-light">
              Nothing published yet — check back soon.
            </p>
          </Reveal>
        ) : (
          <div className="space-y-6">
            {INSIGHTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  to="/insights/$slug"
                  params={{ slug: post.slug }}
                  className="group block bg-[#0c1a30]/85 border border-white/8 p-8 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-[0.2em] text-slate-muted">
                    <span>{post.category}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-3 transition-colors duration-300 group-hover:text-gold-soft">
                    {post.title}
                  </h2>
                  <p className="text-ivory/70 leading-relaxed font-light">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
