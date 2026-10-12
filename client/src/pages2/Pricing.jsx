const TIERS = [
  {
    name: 'Pilot',
    price: 'Free',
    period: 'for one facility',
    features: ['Up to 500 documents', 'Plain-English Q&A', 'Source citations', 'Email support'],
    cta: 'Start a pilot',
    highlighted: false,
  },
  {
    name: 'Plant',
    price: '₹45,000',
    period: '/ month',
    features: [
      'Unlimited documents',
      'Knowledge gap detection',
      'Compliance mapping',
      'Mobile field access',
      'Priority support',
    ],
    cta: 'Talk to sales',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'multi-plant',
    features: [
      'Everything in Plant',
      'On-premise deployment',
      'Role-based access per facility',
      'Dedicated integration support',
    ],
    cta: 'Contact us',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-navymid/40 py-28 px-6 border-y border-steeldim/40">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-16">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-white leading-tight">
            Start with one plant
          </h2>
          <p className="mt-4 text-[15px] text-inkdim leading-relaxed">
            Prove it on your most document-heavy facility, then roll out
            across the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl px-6 py-7 border ${
                tier.highlighted
                  ? 'border-teal/50 bg-navy'
                  : 'border-steeldim/50 bg-navy/60'
              }`}
            >
              <h3 className="text-sm font-medium text-white">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold text-white">{tier.price}</span>
                <span className="text-xs text-inkdim">{tier.period}</span>
              </div>

              <ul className="mt-6 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="text-[13px] text-inkdim flex items-start gap-2">
                    <span className="text-teal mt-0.5">·</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/app"
                className={`mt-8 block text-center text-[13px] font-medium rounded-md py-2.5 transition-colors ${
                  tier.highlighted
                    ? 'bg-teal text-navy hover:bg-teal/90'
                    : 'border border-steeldim text-white hover:border-teal/50'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
