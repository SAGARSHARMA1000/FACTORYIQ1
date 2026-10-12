import { Inbox, MessageSquare, Wrench, ShieldCheck, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Inbox,
    title: 'Reads everything you already have',
    body: 'PDFs, scanned P&IDs, spreadsheets, and email archives — processed and indexed automatically, no reformatting required.',
  },
  {
    icon: MessageSquare,
    title: 'Answers in plain language',
    body: 'Ask "when was Pump-7 last serviced?" and get a direct answer with the exact document and page it came from.',
  },
  {
    icon: Wrench,
    title: 'Spots maintenance patterns',
    body: 'Cross-references work orders, OEM manuals, and inspection history to support root-cause analysis before failures repeat.',
  },
  {
    icon: ShieldCheck,
    title: 'Tracks compliance gaps',
    body: 'Maps procedures against Factory Act, OISD, and PESO requirements, flagging gaps before an audit finds them.',
  },
  {
    icon: Zap,
    title: 'Surfaces what\'s been missed',
    body: 'Finds systemic patterns across incidents and near-misses that no single review would catch on its own.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-navy py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-16">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-white leading-tight">
            One layer. Five jobs.
          </h2>
          <p className="mt-4 text-[15px] text-inkdim leading-relaxed">
            FactoryIQ isn't a search bar bolted onto your file server. Each
            capability below runs continuously, in the background, on every
            document you add.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                <Icon size={17} />
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-white">{title}</h3>
                <p className="mt-1.5 text-[13.5px] text-inkdim leading-relaxed max-w-md">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
