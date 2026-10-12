const USE_CASES = [
  {
    industry: 'Steel & heavy manufacturing',
    body: 'Give maintenance teams instant access to equipment history across decades of paper records.',
  },
  {
    industry: 'Oil, gas & refining',
    body: 'Keep safety procedures and compliance documentation current and instantly searchable in the field.',
  },
  {
    industry: 'Power & energy',
    body: 'Connect inspection reports, SCADA logs, and OEM manuals into one place technicians can query.',
  },
  {
    industry: 'EV & component manufacturing',
    body: 'Trace quality issues back through incoming inspection records and supplier documentation.',
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative bg-navy py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-16">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-white leading-tight">
            Built for plants, not offices
          </h2>
          <p className="mt-4 text-[15px] text-inkdim leading-relaxed">
            Any asset-intensive operation with years of accumulated
            documentation benefits from the same core capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.industry}
              className="rounded-xl border border-steeldim/50 px-6 py-6 hover:border-teal/30 transition-colors"
            >
              <h3 className="text-[15px] font-medium text-white">{uc.industry}</h3>
              <p className="mt-2 text-[13.5px] text-inkdim leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
