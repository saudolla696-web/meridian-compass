import { createFileRoute, notFound } from "@tanstack/react-router";
import { Reveal } from "../../components/site/Reveal";
import { CASE_STUDIES, SITE_URL } from "../../lib/site-content";

export const Route = createFileRoute("/case-studies/$id")({
  loader: ({ params }) => {
    const study = CASE_STUDIES.find((c) => c.id === params.id);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.name} — Case Study | Meridian Digital`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.body },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.body },
        { property: "og:url", content: `${SITE_URL}/case-studies/${loaderData.id}` },
        ...(loaderData.image
          ? [{ property: "og:image", content: `${SITE_URL}${loaderData.image}` }]
          : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/case-studies/${loaderData.id}` }],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const study = Route.useLoaderData();
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-10">
            <div className="label-eyebrow mb-4">Case Study</div>
            <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-3">{study.name}</h1>
            <p className="text-slate-muted text-sm tracking-wide">{study.meta}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-[#0c1a30] border border-white/8 overflow-hidden mb-10">
            <div className="bg-[#060D18] border-b border-white/8 px-4 py-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a4a60]" />
              <div className="ml-3 flex-1 bg-[#0A1628] rounded-sm px-3 py-1 text-[0.7rem] text-slate-muted truncate font-mono">
                {study.domain}
              </div>
            </div>
            <div
              className="relative aspect-[16/9] flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0A1628 0%, #11203A 60%, #0c1a30 100%)",
              }}
            >
              {study.image ? (
                <img
                  src={study.image}
                  alt={`${study.name} website screenshot`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <span className="font-serif italic text-gold-soft/40 text-8xl select-none">
                  {study.initials}
                </span>
              )}
            </div>
          </div>
        </Reveal>
        {study.disclosure && (
          <Reveal delay={0.15}>
            <div className="bg-[#11203A] border border-gold/25 p-6 mb-10">
              <p className="text-ivory/85 leading-relaxed font-light text-[0.95rem]">
                {study.disclosure}
              </p>
            </div>
          </Reveal>
        )}

        {study.brief || study.whatWeBuilt || study.trustEngineering || study.results ? (
          <div className="space-y-10">
            {study.brief && (
              <Reveal delay={0.2}>
                <div>
                  <h2 className="font-serif text-ivory text-xl mb-2">The brief</h2>
                  <p className="text-ivory/70 leading-relaxed font-light">{study.brief}</p>
                </div>
              </Reveal>
            )}
            {study.whatWeBuilt && (
              <Reveal delay={0.25}>
                <div>
                  <h2 className="font-serif text-ivory text-xl mb-2">What we built</h2>
                  <p className="text-ivory/70 leading-relaxed font-light">{study.whatWeBuilt}</p>
                </div>
              </Reveal>
            )}
            {study.trustEngineering && (
              <Reveal delay={0.3}>
                <div>
                  <h2 className="font-serif text-ivory text-xl mb-2">Trust engineering</h2>
                  <p className="text-ivory/70 leading-relaxed font-light">
                    {study.trustEngineering}
                  </p>
                </div>
              </Reveal>
            )}
            {study.results && (
              <Reveal delay={0.35}>
                <div>
                  <h2 className="font-serif text-ivory text-xl mb-2">Results</h2>
                  <p className="text-ivory/70 leading-relaxed font-light">{study.results}</p>
                </div>
              </Reveal>
            )}
          </div>
        ) : (
          <Reveal delay={0.2}>
            <p className="text-ivory/70 leading-relaxed font-light text-lg">{study.body}</p>
          </Reveal>
        )}
        {/* TESTIMONIAL PENDING — confirm with client before publishing */}
      </div>
    </section>
  );
}
