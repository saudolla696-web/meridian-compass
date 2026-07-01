import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <section className="py-32 px-6 min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="label-eyebrow mb-4">404</div>
        <h1 className="font-serif text-ivory text-4xl md:text-5xl mb-6">
          Off the <span className="italic text-gold-soft">charted route.</span>
        </h1>
        <p className="text-ivory/70 leading-relaxed font-light mb-10">
          The page you're looking for doesn't exist, or has moved. Let's get you back on course.
        </p>
        <Link to="/" className="btn-gold btn-gold-hover">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
