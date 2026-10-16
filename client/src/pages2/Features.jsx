import React, { useState } from 'react';
import {
  Inbox,
  MessageSquare,
  Wrench,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileSearch,
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Activity,
  Search,
  FileText,
} from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'universal-ingestion',
    index: '01',
    icon: Inbox,
    title: 'Reads Everything You Already Have',
    subtitle: 'MULTI-MODAL INGESTION // ZERO MANUAL RETAGGING',
    body: 'PDF manuals, scanned legacy P&IDs (via embedded Tesseract OCR), maintenance spreadsheets, and email archives — parsed, chunked, and vectorized into MongoDB Atlas without any document reformatting.',
    tag: 'SYS.INGEST // MULTI-FORMAT',
    badge: '100% Zero-Loss',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    specs: [
      { label: 'Supported Formats', value: 'PDF, DWG, PNG (OCR), XLSX, DOCX, CSV' },
      { label: 'Extraction Pipeline', value: 'Tesseract OCR + pdf-parse + Mammoth' },
      { label: 'Vector Density', value: '1536-dimensional semantic chunking' },
    ],
    livePreview: {
      type: 'ingest',
      title: 'Real-Time Vector Ingestion Telemetry',
      items: [
        { name: 'Slurry_Pump_P104B_Manual.pdf', size: '14.2 MB', status: 'INDEXED', chunks: '124 chunks' },
        { name: 'Boiler_P&ID_DWG_Rev04.png', size: '28.6 MB', status: 'OCR VERIFIED', chunks: '86 chunks' },
        { name: 'Maintenance_Log_2025_Q4.xlsx', size: '4.8 MB', status: 'SYNCHRONIZED', chunks: '312 chunks' },
      ],
    },
  },
  {
    id: 'rag-qa',
    index: '02',
    icon: MessageSquare,
    title: 'Answers in Plain Language with Citations',
    subtitle: 'NATURAL LANGUAGE RAG // ZERO HALLUCINATION',
    body: 'Ask "What is the mechanical seal face tolerance and flush piping plan for Pump-104B?" and get a direct engineering answer with the exact document name, page number, and section citation.',
    tag: 'SYS.COGNITION // PINPOINT RAG',
    badge: '< 0.9s Latency',
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80',
    specs: [
      { label: 'Query Resolution', value: '< 900ms round-trip latency' },
      { label: 'Source Verification', value: 'Page-level & drawing coordinate citation' },
      { label: 'Model Provider', value: 'OpenAI GPT-4o / Claude RAG fallback' },
    ],
    livePreview: {
      type: 'query',
      title: 'Shop-Floor RAG Query Sample',
      question: 'When was Turbine T-101 thrust bearing clearance last measured?',
      answer: 'Measured at 0.014" on Oct 12, 2025 during turnaround #TA-4. Tolerance limit is 0.012"–0.016". Next check due within 2,000 running hours.',
      citation: 'Source: T101_Turnaround_Log.pdf (Page 44, Sec 2.3)',
    },
  },
  {
    id: 'maintenance-patterns',
    index: '03',
    icon: Wrench,
    title: 'Spots Recurring Maintenance Patterns',
    subtitle: 'CROSS-SYSTEM CORRELATION // ROOT CAUSE AI',
    body: 'Cross-references disconnected SAP work orders, OEM equipment manuals, and shift inspection logs to uncover hidden failure patterns across mechanical, electrical, and hydraulic subsystems.',
    tag: 'SYS.ANALYTICS // PATTERN DETECT',
    badge: 'Root Cause AI',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    specs: [
      { label: 'Data Cross-Linking', value: 'SAP PM + OEM Manuals + SCADA alerts' },
      { label: 'Pattern Detection', value: 'Bearing heat anomalies vs lube schedules' },
      { label: 'Downtime Impact', value: 'Reduces repeat component trips by 42%' },
    ],
    livePreview: {
      type: 'pattern',
      title: 'Automated Root-Cause Correlation',
      finding: 'Compressor C-201 suffered 3 valve seal failures in 90 days.',
      diagnosis: 'Cross-referencing WO #4829 with OEM Bulletin #BL-19 revealed inlet gas temperature exceeded 65°C, causing premature fluoroelastomer seal hardening.',
      recommendation: 'Switch to FFKM (Perfluoroelastomer) seals as per Addendum 4.',
    },
  },
  {
    id: 'compliance-auditing',
    index: '04',
    icon: ShieldCheck,
    title: 'Tracks Statutory Compliance & Safety Gaps',
    subtitle: 'CONTINUOUS REGULATORY GOVERNANCE // AUDIT READY',
    body: 'Continuously maps plant operating procedures against Factory Act 1948, OISD-116, PESO, and OSHA statutory requirements, automatically flagging expired certificates and missing procedures.',
    tag: 'SYS.GOVERNANCE // STATUTORY AUDIT',
    badge: '100% Audit Ready',
    image:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80',
    specs: [
      { label: 'Compliance Standards', value: 'Factory Act 1948, OISD, PESO, OSHA' },
      { label: 'Audit Preemption', value: 'Flags missing coverage 60 days before audits' },
      { label: 'Certificate Radar', value: 'Autonomous pressure vessel test expiry tracking' },
    ],
    livePreview: {
      type: 'compliance',
      title: 'Real-Time Compliance Gap Radar',
      alerts: [
        { code: 'PESO-RULE-18', item: 'Solvent Tank #4 Hydrostatic Test', status: 'DUE IN 14 DAYS', severity: 'HIGH' },
        { code: 'OISD-116', item: 'Fire Water Deluge Valve XV-09 Inspection', status: 'VERIFIED OK', severity: 'CLEARED' },
        { code: 'FACT-ACT-SEC31', item: 'Boiler #2 Relief Valve Recalibration Cert', status: 'OVERDUE (3 DAYS)', severity: 'CRITICAL' },
      ],
    },
  },
  {
    id: 'near-miss-intelligence',
    index: '05',
    icon: Zap,
    title: 'Surfaces What Was Missed in Shift Handovers',
    subtitle: 'EARLY WARNING INTELLIGENCE // SHOP FLOOR RADAR',
    body: 'Finds systemic patterns across shift handovers, incident reports, and near-miss logs that no single review would catch on its own, alerting plant managers before minor anomalies cause plant trips.',
    tag: 'SYS.EARLY_WARNING // NEAR MISS',
    badge: '24/7 Radar',
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80',
    specs: [
      { label: 'Log Synthesis', value: 'Shift handover sheets, logbooks, WhatsApp notes' },
      { label: 'Anomaly Threshold', value: 'Multi-shift recurring vibration & thermal drift' },
      { label: 'Executive Alerts', value: 'Automated briefing delivered to plant leadership' },
    ],
    livePreview: {
      type: 'nearmiss',
      title: 'Shift Handover Anomaly Synthesis',
      summary: '3 separate shifts reported "unusual hum on Cooling Water Pump 2B" over 72 hours.',
      synthesis: 'No single technician flagged it as critical. FactoryIQ cross-referenced motor amp logs and detected 12% current surge indicating early bearing seizure.',
      action: 'Preventative switch to Pump 2A avoided an estimated 8-hour chemical train outage.',
    },
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const activeCapability = CAPABILITIES[activeTab];

  return (
    <section
      id="features"
      className="relative w-full bg-[#0A1628] text-white select-none border-t border-[#1F314F]/60 pt-16 sm:pt-20 pb-20 sm:pb-28 px-6 sm:px-10 md:px-14 lg:px-20 transition-colors overflow-hidden"
      style={{
        backgroundColor: '#0A1628',
        color: '#FFFFFF',
        fontFamily: "'Space Mono', 'Geist Mono', monospace",
      }}
    >
      {/* Subtle Dark Industrial Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #19CDB8 1px, transparent 1px), linear-gradient(to bottom, #19CDB8 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Radiant Teal Ambient Backlight Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#19CDB8]/[0.035] blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Architectural Blueprint Framing Line with Coordinates */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#19CDB8] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#19CDB8] uppercase">
                SEC.03 // AUTONOMOUS CAPABILITIES SPECIFICATION
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8FA4B8]/60">
              <span>CORE ARCHITECTURE V2.6</span>
              <span>•</span>
              <span>VECTOR COGNITION LAYER</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="h-[1.5px] bg-[#1F314F] flex-1 max-w-[85%]" />
            <div className="w-3 h-3 border border-[#19CDB8] rotate-45 -ml-1.5 bg-[#0A1628]" />
          </div>
        </div>

        {/* Section Header: Dark Architectural Display Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 mb-12 sm:mb-16">
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-px w-6 bg-[#19CDB8]" />
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8FA4B8]">
                INDUSTRIAL KNOWLEDGE PLATFORM
              </p>
            </div>
            <h2
              className="text-white font-bold uppercase leading-[1.08] tracking-[0.02em] text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px]"
              style={{
                fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif",
                lineHeight: 1.08,
                letterSpacing: '0.02em',
              }}
            >
              ONE UNIFIED LAYER.
              <br />
              <span className="text-[#19CDB8]">FIVE AUTONOMOUS JOBS.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-6">
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#DCE8F0]/80 font-mono">
              FactoryIQ isn't a search bar bolted onto a file server. Each
              capability below runs continuously in the background on every
              document, P&ID drawing, and maintenance record you upload.
            </p>

            {/* Quick Stats Pill Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="bg-[#112240] border border-[#1F314F] px-3 py-1.5 text-[10.5px] tracking-[0.15em] text-[#DCE8F0] uppercase">
                <span className="text-[#19CDB8] font-bold">100%</span> CITATION ACCURACY
              </span>
              <span className="bg-[#112240] border border-[#1F314F] px-3 py-1.5 text-[10.5px] tracking-[0.15em] text-[#DCE8F0] uppercase">
                <span className="text-[#19CDB8] font-bold">&lt; 1s</span> SEARCH LATENCY
              </span>
              <span className="bg-[#112240] border border-[#1F314F] px-3 py-1.5 text-[10.5px] tracking-[0.15em] text-[#DCE8F0] uppercase">
                <span className="text-[#19CDB8] font-bold">ZERO</span> CLOUD LOCK-IN
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Capabilities Navigation Selector (Brushed Industrial Pill Strip) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10">
          {CAPABILITIES.map((cap, index) => {
            const Icon = cap.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-3.5 border transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#112240] border-[#19CDB8] shadow-[0_0_20px_rgba(25,205,184,0.18)] translate-y-[-2px]'
                    : 'bg-[#0D1C34]/80 border-[#1F314F] hover:border-[#19CDB8]/50 hover:bg-[#112240]/80'
                }`}
              >
                {/* Active Indicator Top Light Beam */}
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#19CDB8] shadow-[0_0_8px_#19CDB8]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#8FA4B8]">
                    {cap.index}
                  </span>
                  <Icon
                    size={15}
                    className={`transition-colors ${
                      isSelected ? 'text-[#19CDB8]' : 'text-[#8FA4B8] group-hover:text-white'
                    }`}
                  />
                </div>

                <div>
                  <p
                    className={`text-[12px] font-bold uppercase tracking-tight line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-[#8FA4B8] group-hover:text-white'
                    }`}
                    style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    {cap.title.split(' ')[0]} {cap.title.split(' ')[1] || ''}
                  </p>
                  <span
                    className={`text-[9.5px] font-mono tracking-wider uppercase block mt-1 ${
                      isSelected ? 'text-[#19CDB8]' : 'text-[#8FA4B8]/60'
                    }`}
                  >
                    {cap.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Active Capability Deep-Dive Dossier (Dark Industrial Architecture) */}
        <div className="border border-[#1F314F] bg-[#0E1E38] p-6 sm:p-8 lg:p-10 relative shadow-2xl animate-fade-in">
          {/* Architectural Top Corner Notches */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#19CDB8]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#19CDB8]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#19CDB8]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#19CDB8]" />

          {/* Dossier Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#1F314F] gap-2">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#19CDB8]/20 border border-[#19CDB8]/40 text-[#19CDB8] text-[10px] font-bold tracking-[0.2em] font-mono uppercase">
                {activeCapability.tag}
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#8FA4B8] uppercase">
                CAPABILITY {activeCapability.index} // 05
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#8FA4B8] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19CDB8]" />
              <span>ACTIVE SUBSYSTEM TELEMETRY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Description, Specs, and Architectural Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#19CDB8]/10 border border-[#19CDB8]/40 flex items-center justify-center text-[#19CDB8] shrink-0">
                  {React.createElement(activeCapability.icon, { size: 20 })}
                </div>
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold uppercase text-white leading-tight"
                    style={{ fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif" }}
                  >
                    {activeCapability.title}
                  </h3>
                  <p className="text-[10.5px] font-mono tracking-[0.15em] text-[#19CDB8] uppercase mt-0.5">
                    {activeCapability.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#DCE8F0]/90 font-mono">
                {activeCapability.body}
              </p>

              {/* Technical Specifications Table */}
              <div className="pt-2 border-t border-[#1F314F] space-y-2">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#8FA4B8] uppercase mb-2">
                  ENGINEERING SPECIFICATIONS:
                </p>
                {activeCapability.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#1F314F]/60 text-[12px] gap-1"
                  >
                    <span className="text-[#8FA4B8] font-mono">{spec.label}</span>
                    <span className="text-white font-semibold font-mono">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Live Preview Terminal Snippet based on Feature Type */}
              <div className="mt-5 p-4 bg-[#0A1628] border border-[#19CDB8]/30 font-mono text-[11.5px] space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#19CDB8] uppercase tracking-wider border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Activity size={12} /> {activeCapability.livePreview.title}
                  </span>
                  <span className="text-gray-400">STATUS: LIVE</span>
                </div>

                {activeCapability.livePreview.type === 'ingest' && (
                  <div className="space-y-1.5">
                    {activeCapability.livePreview.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-gray-300 py-0.5">
                        <span className="truncate max-w-[200px] sm:max-w-none text-white">{item.name}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[#8FA4B8]">{item.chunks}</span>
                          <span className="text-[#19CDB8] text-[9.5px] px-1.5 py-0.5 bg-[#19CDB8]/10 border border-[#19CDB8]/30">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeCapability.livePreview.type === 'query' && (
                  <div className="space-y-2">
                    <p className="text-[#8FA4B8]">
                      Q: <span className="text-white">"{activeCapability.livePreview.question}"</span>
                    </p>
                    <p className="text-gray-200">
                      A: {activeCapability.livePreview.answer}
                    </p>
                    <p className="text-[#19CDB8] text-[10.5px]">
                      {activeCapability.livePreview.citation}
                    </p>
                  </div>
                )}

                {activeCapability.livePreview.type === 'pattern' && (
                  <div className="space-y-2">
                    <p className="text-[#E74C3C] font-semibold">
                      [Anomaly]: {activeCapability.livePreview.finding}
                    </p>
                    <p className="text-gray-300">
                      [Correlation]: {activeCapability.livePreview.diagnosis}
                    </p>
                    <p className="text-[#19CDB8]">
                      [Action]: {activeCapability.livePreview.recommendation}
                    </p>
                  </div>
                )}

                {activeCapability.livePreview.type === 'compliance' && (
                  <div className="space-y-1.5">
                    {activeCapability.livePreview.alerts.map((al) => (
                      <div key={al.item} className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-gray-300">{al.code}: {al.item}</span>
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 border ${
                            al.severity === 'CRITICAL'
                              ? 'bg-red-500/20 text-red-400 border-red-500/40'
                              : al.severity === 'HIGH'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : 'bg-[#19CDB8]/20 text-[#19CDB8] border-[#19CDB8]/40'
                          }`}
                        >
                          {al.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeCapability.livePreview.type === 'nearmiss' && (
                  <div className="space-y-1.5">
                    <p className="text-amber-400">
                      [Raw Incident Logs]: {activeCapability.livePreview.summary}
                    </p>
                    <p className="text-gray-300">
                      [AI Synthesis]: {activeCapability.livePreview.synthesis}
                    </p>
                    <p className="text-[#19CDB8] font-bold">
                      [Outcome]: {activeCapability.livePreview.action}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: High-Res Curated Industrial Imagery with Dark HUD Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative border-2 border-[#1F314F] overflow-hidden group shadow-xl">
                <img
                  src={activeCapability.image}
                  alt={activeCapability.title}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover filter contrast-[1.1] brightness-[0.9] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette & Industrial HUD Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent pointer-events-none" />

                {/* HUD Top Corner Badge */}
                <div className="absolute top-3.5 left-3.5 bg-[#0A1628]/90 backdrop-blur-md border border-[#19CDB8]/40 text-[#19CDB8] text-[9.5px] px-2.5 py-1 tracking-[0.2em] font-mono uppercase flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19CDB8] animate-ping" />
                  <span>PLANT FLOOR TELEMETRY // ACTIVE</span>
                </div>

                {/* HUD Bottom Info Bar */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white bg-[#0A1628]/85 backdrop-blur-sm p-3 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-[#19CDB8] uppercase font-mono tracking-wider">
                    <span>ASSET RADAR</span>
                    <span>100% OPERATIONAL</span>
                  </div>
                  <p className="text-[12px] font-semibold text-white truncate mt-1">
                    {activeCapability.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Blueprint Verification Strip */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-[#1F314F]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.15em] font-semibold uppercase text-[#8FA4B8]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#19CDB8] rounded-none shadow-[0_0_8px_#19CDB8]" />
              <span className="text-white">
                ALL FIVE CAPABILITIES OPERATE SIMULTANEOUSLY ON EVERY INGESTED ASSET
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[#8FA4B8]/60">FACTORYIQ INTELLIGENCE SUITE</span>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 text-[#19CDB8] hover:text-white transition-colors"
              >
                <span>HOW IT WORKS ARCHITECTURE</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
