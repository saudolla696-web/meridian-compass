import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { INSIGHTS } from "../../lib/insights-content";
import { SITE_URL, buildBreadcrumbJsonLd } from "../../lib/site-content";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
]);

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Meridian Digital" },
      {
        name: "description",
        content:
          "Notes on web design, SEO, and Answer Engine Optimisation from Meridian Digital — practical, no-jargon writing for South African businesses.",
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
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
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
                  className="block bg-[#0c1a30]/85 border border-white/8 p-8 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-[0.2em] text-slate-muted">
                    <span>{post.category}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h2 className="font-serif text-ivory text-2xl md:text-3xl mb-3">{post.title}</h2>
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
