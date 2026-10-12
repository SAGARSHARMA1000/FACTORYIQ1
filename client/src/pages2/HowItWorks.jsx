const STEPS = [
  {
    n: '1',
    title: 'Upload',
    body: 'Drop in PDFs, drawings, work orders, or scanned forms. No cleanup or reformatting needed.',
  },
  {
    n: '2',
    title: 'Index',
    body: 'Documents are read, chunked, and converted into a searchable form in the background.',
  },
  {
    n: '3',
    title: 'Ask',
    body: 'Type a question the way you\'d ask a colleague. No keywords, no filters, no folders to search.',
  },
  {
    n: '4',
    title: 'Get a cited answer',
    body: 'Every answer points back to the exact document and page it came from — verifiable, not guessed.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-navymid/40 py-28 px-6 border-y border-steeldim/40">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-16">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-white leading-tight">
            From document to answer in four steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative">
              <span className="text-xs font-medium text-teal tabular-nums">{step.n}</span>
              <h3 className="mt-3 text-[15px] font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-[13.5px] text-inkdim leading-relaxed">{step.body}</p>
              {i < STEPS.length - 1 && (
                <span className="hidden md:block absolute top-1.5 -right-4 w-8 h-px bg-steeldim" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
