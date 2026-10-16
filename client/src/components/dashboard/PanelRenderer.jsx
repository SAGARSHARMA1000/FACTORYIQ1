/**
 * Renders one dashboard panel. The panel `type` in the role config picks the body:
 *   'list'   - rows with a title, small meta line and an optional status pill
 *   'table'  - columns + rows (a cell can be a string or { text, tone })
 *   'bars'   - labelled progress bars
 *   'access' - what this role can and cannot do (taken from config/demoUsers.js)
 *
 * WHERE TO ADD: new file, drop it in client/src/components/dashboard/.
 * To add a new panel type, add a component below and a case in the switch.
 */
import { Check, X } from 'lucide-react';
import { TONES } from './dashboardTheme.js';
import { getDemoUser } from '../../config/demoUsers.js';

function Pill({ tone = 'muted', children }) {
  return (
    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TONES[tone].pill}`}>
      {children}
    </span>
  );
}

function ListBody({ items }) {
  return (
    <ul className="divide-y divide-steeldim/40 font-mono">
      {items.map((item) => (
        <li key={item.title} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
          <div className="min-w-0">
            <p className="text-[13.5px] text-white">{item.title}</p>
            {item.meta && <p className="mt-0.5 text-[12px] text-inkdim">{item.meta}</p>}
          </div>
          {item.tag && <Pill tone={item.tag.tone}>{item.tag.text}</Pill>}
        </li>
      ))}
    </ul>
  );
}

function TableBody({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-steeldim/40 text-[11.5px] text-inkdim">
            {columns.map((col) => (
              <th key={col} className="py-2 pr-4 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-steeldim/30">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 pr-4 text-ink">
                  {typeof cell === 'object' ? <Pill tone={cell.tone}>{cell.text}</Pill> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BarsBody({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="text-ink">{item.label}</span>
            <span className="text-inkdim tabular-nums">{item.display ?? `${item.value}%`}</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-steeldim/60">
            <div
              className={`h-1.5 rounded-full ${TONES[item.tone || 'ok'].bar}`}
              style={{ width: `${Math.min(Math.max(item.value, 0), 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function AccessBody({ role }) {
  const demo = getDemoUser(role);
  if (!demo) return <p className="text-[13px] text-inkdim">No access summary for this role.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-[11.5px] font-medium text-inkdim">You can</p>
        <ul className="space-y-2">
          {demo.can.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13px] text-ink">
              <Check size={14} className="mt-0.5 shrink-0 text-teal" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {demo.cannot.length > 0 && (
        <div>
          <p className="mb-2 text-[11.5px] font-medium text-inkdim">You cannot</p>
          <ul className="space-y-2">
            {demo.cannot.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] text-inkdim">
                <X size={14} className="mt-0.5 shrink-0 text-inkdim/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function PanelRenderer({ panel, role }) {
  let body = null;
  switch (panel.type) {
    case 'list':
      body = <ListBody items={panel.items} />;
      break;
    case 'table':
      body = <TableBody columns={panel.columns} rows={panel.rows} />;
      break;
    case 'bars':
      body = <BarsBody items={panel.items} />;
      break;
    case 'access':
      body = <AccessBody role={role} />;
      break;
    default:
      body = <p className="text-[13px] text-inkdim">Unknown panel type: {panel.type}</p>;
  }

  return (
    <section className={`font-mono rounded-xl border border-steeldim/50 bg-card px-6 py-5 ${panel.span === 2 ? 'lg:col-span-2' : ''}`}>
      <div className="mb-4">
        <h2 className="text-[14px] font-medium text-white">{panel.title}</h2>
        {panel.subtitle && <p className="mt-0.5 text-[12px] text-inkdim">{panel.subtitle}</p>}
      </div>
      {body}
    </section>
  );
}
