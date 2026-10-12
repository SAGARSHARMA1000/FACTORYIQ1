const FRICTION_POINTS = [
  {
    stat: '35%',
    label: 'of a technician\'s week',
    detail: 'spent searching for a document that already exists somewhere in the plant.',
  },
  {
    stat: '7–12',
    label: 'disconnected systems',
    detail: 'per plant — P&IDs in one place, work orders in another, procedures in a third.',
  },
  {
    stat: '25%',
    label: 'of senior engineers',
    detail: 'retiring this decade, taking undocumented plant knowledge with them.',
  },
];

export default function ProblemSolution() {
  return (
    <section className="relative bg-navy py-28 px-6 border-t border-steeldim/40">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-white leading-tight">
            The knowledge was never missing.
            <br />
            It was just scattered.
          </h2>
          <p className="mt-4 text-[15px] text-inkdim leading-relaxed">
            Every plant generates enormous amounts of documentation — and almost
            none of it talks to each other.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-steeldim/40 rounded-xl overflow-hidden">
          {FRICTION_POINTS.map((p) => (
            <div key={p.label} className="bg-navy px-7 py-9">
              <p className="text-4xl font-semibold text-teal tabular-nums">{p.stat}</p>
              <p className="mt-3 text-sm font-medium text-white">{p.label}</p>
              <p className="mt-1.5 text-[13px] text-inkdim leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
