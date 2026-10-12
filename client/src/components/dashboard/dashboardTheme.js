/**
 * Shared look for the role dashboards and the demo login cards.
 *
 * WHERE TO ADD: new file, drop it in client/src/components/dashboard/.
 *
 * Class names are written out in full on purpose - Tailwind only generates
 * classes it can find as complete strings, so do not build them dynamically.
 * Needs the colour tokens from the landing page's tailwind.config.js
 * (navy, card, steel, steeldim, teal, amber, ink, inkdim).
 */
import {
  MessageSquare,
  FileText,
  Upload,
  Wrench,
  ShieldCheck,
  Users,
  Activity,
  Clock,
  AlertTriangle,
  ClipboardList,
  ClipboardCheck,
  Gauge,
  Search,
  UserPlus,
  ScrollText,
  Server,
  BookOpen,
  Eye,
  CircleCheck,
} from 'lucide-react';

// Icons are referenced by name in config files, e.g. icon: 'Wrench'
export const ICONS = {
  MessageSquare,
  FileText,
  Upload,
  Wrench,
  ShieldCheck,
  Users,
  Activity,
  Clock,
  AlertTriangle,
  ClipboardList,
  ClipboardCheck,
  Gauge,
  Search,
  UserPlus,
  ScrollText,
  Server,
  BookOpen,
  Eye,
  CircleCheck,
};

// Status colours for pills, hints and bars
export const TONES = {
  ok: { text: 'text-teal', pill: 'bg-teal/10 text-teal border-teal/30', bar: 'bg-teal' },
  warn: { text: 'text-amber', pill: 'bg-amber/10 text-amber border-amber/30', bar: 'bg-amber' },
  danger: { text: 'text-red-400', pill: 'bg-red-500/10 text-red-400 border-red-500/30', bar: 'bg-red-400' },
  info: { text: 'text-sky-400', pill: 'bg-sky-400/10 text-sky-400 border-sky-400/30', bar: 'bg-sky-400' },
  muted: { text: 'text-inkdim', pill: 'bg-white/5 text-inkdim border-steeldim/50', bar: 'bg-steel' },
};

// One accent per role - used only for the role pill, icon chips and hover borders
export const ACCENTS = {
  teal: { text: 'text-teal', soft: 'bg-teal/10', border: 'border-teal/30', hover: 'hover:border-teal/60' },
  sky: { text: 'text-sky-400', soft: 'bg-sky-400/10', border: 'border-sky-400/30', hover: 'hover:border-sky-400/60' },
  amber: { text: 'text-amber', soft: 'bg-amber/10', border: 'border-amber/30', hover: 'hover:border-amber/60' },
  violet: { text: 'text-violet-400', soft: 'bg-violet-400/10', border: 'border-violet-400/30', hover: 'hover:border-violet-400/60' },
  rose: { text: 'text-rose-400', soft: 'bg-rose-400/10', border: 'border-rose-400/30', hover: 'hover:border-rose-400/60' },
};
