import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { AuditCta } from "../../components/site/AuditCta";
import { INSIGHTS } from "../../lib/insights-content";
import { SITE_URL, ORGANIZATION_ID, buildBreadcrumbJsonLd } from "../../lib/site-content";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = INSIGHTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} | Meridian Digital Insights`;
    const url = `${SITE_URL}/insights/${loaderData.slug}`;
    const blogPostingJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: loaderData.title,
      description: loaderData.excerpt,
      datePublished: loaderData.date,
      dateModified: loaderData.date,
      author: { "@type": "Person", name: "Saud Zeyn Olla" },
      publisher: { "@id": ORGANIZATION_ID },
      mainEntityOfPage: url,
      url,
    };
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(blogPostingJsonLd) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: loaderData.title, path: `/insights/${loaderData.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  component: InsightPost,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function InsightPost() {
  const post = Route.useLoaderData();
  return (
    <>
      <section className="py-28 px-6">
        <article className="max-w-2xl mx-auto">
          <Reveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-[0.2em] text-slate-muted">
                <span>{post.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h1 className="font-serif text-ivory text-4xl md:text-5xl leading-tight">
                {post.title}
              </h1>
            </div>
          </Reveal>

          <div className="space-y-6">
            {post.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-ivory/70 leading-relaxed font-light text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 pt-8 border-t border-white/5">
              <Link
                to="/insights"
                className="text-gold hover:text-gold-soft text-sm tracking-wide transition-colors"
              >
                ← Back to Insights
              </Link>
            </div>
          </Reveal>
        </article>
      </section>

      <AuditCta />
    </>
  );
}
