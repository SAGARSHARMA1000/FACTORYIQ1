export default function ClosingCta() {
  return (
    <section className="relative bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto rounded-2xl border border-steeldim/50 px-8 py-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,201,167,0.08), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold tracking-tight text-white leading-tight">
            Stop searching. Start asking.
          </h2>
          <p className="mt-4 text-[15px] text-inkdim max-w-md mx-auto">
            Upload your first set of documents and ask FactoryIQ a question
            in the next five minutes.
          </p>
          <a
            href="/app"
            className="mt-8 inline-block bg-teal text-navy text-sm font-medium px-7 py-3 rounded-md hover:bg-teal/90 transition-colors"
          >
            Try the live demo
          </a>
        </div>
      </div>
    </section>
  );
}
