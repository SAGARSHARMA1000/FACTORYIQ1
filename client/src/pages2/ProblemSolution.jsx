import React, { useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Search,
  Clock,
  Layers,
  Users,
  ShieldAlert,
  Sparkles,
  Cpu,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const FRICTION_POINTS = [
  {
    id: 'search-time',
    stat: '35%',
    statSubtitle: 'OF SHIFT TIME DRAINED',
    label: 'Document Hunting on the Shop Floor',
    headline: 'Technicians spend 14+ hours every week digging for existing files.',
    detail:
      'Plant documentation exists in locked file cabinets, legacy shared drives, and unsearchable scanned PDFs. Workers waste critical turnaround hours verifying simple torque values and valve ratings.',
    tag: 'SYS.EFFICIENCY // LOSS',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    statBadge: '14 hrs/wk',
    metricComparison: {
      before: '45 mins average search time per incident',
      after: '1.2 seconds with FactoryIQ cited answers',
    },
    bulletPoints: [
      'Workers consult up to 4 disconnected repositories per shift',
      'High risk of using superseded engineering change notices (ECN)',
      'Unplanned downtime extends while waiting for documentation lookups',
    ],
  },
  {
    id: 'system-silos',
    stat: '7–12',
    statSubtitle: 'DISCONNECTED SILOS PER PLANT',
    label: 'Isolated Information Islands',
    headline: 'Drawings, SAP orders, and manuals never communicate.',
    detail:
      'P&IDs sit in engineering CAD drives, maintenance history is locked in SAP PM, safety procedures are filed in binders, and OEM manuals are kept on paper shelves. None talk to each other.',
    tag: 'SYS.ARCHITECTURE // FRAGMENTATION',
    image:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80',
    statBadge: '0% Interop',
    metricComparison: {
      before: 'Zero cross-system correlation during breakdowns',
      after: 'Unified semantic index across all 7+ data formats',
    },
    bulletPoints: [
      'Siloed maintenance logs prevent root-cause pattern analysis',
      'Physical paper binders are vulnerable to wear, spills, and loss',
      'Vendor manuals remain detached from actual machine service history',
    ],
  },
  {
    id: 'tribal-knowledge',
    stat: '25%',
    statSubtitle: 'OF SENIOR ENGINEERS RETIRING',
    label: 'The Tribal Knowledge Cliff',
    headline: 'Decades of undocumented plant intuition vanish at retirement.',
    detail:
      'When veteran lead engineers retire this decade, decades of unspoken machine quirks, emergency bypass procedures, and plant knowledge walk out the gate with them forever.',
    tag: 'SYS.WORKFORCE // RETENTION',
    image:
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
    statBadge: 'Critical Gap',
    metricComparison: {
      before: 'Knowledge stored only in individual memory',
      after: 'Continuous autonomous knowledge preservation & RAG recall',
    },
    bulletPoints: [
      'New apprentices repeat dangerous mistakes already solved years ago',
      'Turnaround shutdowns take 30% longer due to lost experience',
      'Crucial safety caveats never make it into official printed SOPs',
    ],
  },
];

const COMPARISON_SCENARIOS = [
  {
    title: 'Pump Seal Overhaul (P-104B)',
    query: 'What is the mechanical seal face tolerance and flush piping plan for Pump-104B?',
    legacy: {
      time: '52 minutes',
      steps: [
        'Checked 2 paper binders in maintenance office',
        'Found superseded 2019 manual missing retrofit bulletin',
        'Called retired lead tech on personal phone to confirm',
      ],
      result: 'Risk of seal blowout & incorrect flush fluid',
    },
    factoryiq: {
      time: '0.9 seconds',
      steps: [
        'Ingested P-104B OEM manual + 2024 retrofit bulletin automatically',
        'Pinpointed exact 0.002" clearance tolerance and Plan 53A schematic',
        'Flagged safety warning: high-pressure nitrogen accumulator required',
      ],
      result: 'Verified answer with clickable PDF page & P&ID citation',
    },
  },
  {
    title: 'Emergency Boiler Trip Procedure',
    query: 'Emergency steam drum blowdown valve sequence on Boiler #2 during level spike?',
    legacy: {
      time: '38 minutes',
      steps: [
        'Attempted to locate DCS operating manual in control room rack',
        'Discovered page 14-16 torn from physical binder',
        'Secondary engineer had to manually trace bypass lines',
      ],
      result: 'Delayed intervention causing secondary valve stress',
    },
    factoryiq: {
      time: '0.7 seconds',
      steps: [
        'Scanned SOP-BLR-04 and cross-referenced with P&ID drawing DWG-9921',
        'Returned 4-step sequence in plain language formatted for mobile',
        'Highlighted recent OISD compliance alert on valve XV-202',
      ],
      result: 'Actionable response in operator’s hand in sub-second time',
    },
  },
];

export default function ProblemSolution() {
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'solution' | 'comparison'
  const [activePoint, setActivePoint] = useState(0);
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <section
      id="problem-solution"
      className="w-full bg-[#FAFAF7] text-black select-none border-t border-black/40 pt-16 sm:pt-20 pb-20 sm:pb-28 px-6 sm:px-10 md:px-14 lg:px-20 transition-colors relative overflow-hidden"
      style={{
        backgroundColor: '#FAFAF7',
        color: '#000000',
        fontFamily: "'Space Mono', 'Geist Mono', monospace",
      }}
    >
      {/* Subtle Architectural Blueprint Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Blueprint Framing Line with Architectural Offset & Coordinates (Footer Theme) */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#19CDB8] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-black uppercase">
                SEC.02 // INDUSTRIAL BRAIN SPECIFICATION
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] text-black/50">
              <span>LAT: 28.6139° N</span>
              <span>•</span>
              <span>ET HACKATHON 2026 // PS-08</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="h-[1.5px] bg-black flex-1" />
            <div className="w-3 h-3 border border-black rotate-45 -ml-1.5 bg-[#FAFAF7]" />
          </div>
        </div>

        {/* Section Header Grid: Architectural Large Headline & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 mb-12 sm:mb-16">
          {/* Left Column: Heading in Footer Display Typography */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-px w-6 bg-[#19CDB8]" />
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70">
                THE ROOT OPERATIONAL BOTTLENECK
              </p>
            </div>
            <h2
              className="text-[#0e0f0f] font-bold uppercase leading-[1.08] tracking-[0.02em] text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px]"
              style={{
                fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif",
                lineHeight: 1.08,
                letterSpacing: '0.02em',
              }}
            >
              THE KNOWLEDGE WAS
              <br />
              <span className="text-black">NEVER MISSING.</span>
              <br />
              <span className="text-[#19CDB8]">IT WAS JUST SCATTERED.</span>
            </h2>
          </div>

          {/* Right Column: Mission Context & Architectural Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-6">
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#2B343B] font-mono">
              Every modern factory runs on hundreds of thousands of pages: P&ID drawings,
              vendor manuals, compliance filings, and maintenance work orders.
              Yet when an emergency occurs, technicians still spend over a third of their
              working hours manually hunting through unsearchable binders and folders.
            </p>

            {/* Interactive Mode Navigation Tabs (Matches Footer's Brushed Steel Buttons) */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('problem')}
                className={`px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'problem'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-[#b0b7bd]/30 text-black border-black/40 hover:bg-[#b0b7bd]/60'
                }`}
              >
                <AlertTriangle size={13} className={activeTab === 'problem' ? 'text-[#19CDB8]' : 'text-black'} />
                <span>01 // THE SCATTERED REALITY</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('solution')}
                className={`px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'solution'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-[#b0b7bd]/30 text-black border-black/40 hover:bg-[#b0b7bd]/60'
                }`}
              >
                <Sparkles size={13} className={activeTab === 'solution' ? 'text-[#19CDB8]' : 'text-black'} />
                <span>02 // THE FACTORYIQ ENGINE</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('comparison')}
                className={`px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'comparison'
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-[#b0b7bd]/30 text-black border-black/40 hover:bg-[#b0b7bd]/60'
                }`}
              >
                <Layers size={13} className={activeTab === 'comparison' ? 'text-[#19CDB8]' : 'text-black'} />
                <span>03 // LIVE FIELD BENCHMARK</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── VIEW 1: THE THREE FRICTION POINTS (THE SCATTERED REALITY) ── */}
        {activeTab === 'problem' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat Ribbon with Footer Brushed Steel Framing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {FRICTION_POINTS.map((item, index) => {
                const isSelected = activePoint === index;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActivePoint(index)}
                    className={`cursor-pointer border p-6 transition-all duration-300 relative group ${
                      isSelected
                        ? 'border-black bg-white shadow-lg translate-y-[-2px]'
                        : 'border-black/30 bg-[#F3F3EE] hover:border-black hover:bg-white'
                    }`}
                  >
                    {/* Architectural Corner Notches */}
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-black" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-black" />

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#19CDB8]">
                        {item.tag}
                      </span>
                      <span
                        className={`text-[9px] px-2 py-0.5 border font-semibold tracking-[0.1em] uppercase ${
                          isSelected
                            ? 'bg-black text-[#19CDB8] border-black'
                            : 'bg-black/5 text-black border-black/20'
                        }`}
                      >
                        {item.statBadge}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-black tabular-nums"
                        style={{ fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif" }}
                      >
                        {item.stat}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] font-bold tracking-[0.14em] text-black uppercase">
                      {item.statSubtitle}
                    </p>

                    <p className="mt-3 text-[12.5px] leading-relaxed text-[#525960] font-mono">
                      {item.label}
                    </p>

                    <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-semibold tracking-wider text-black">
                      <span>INSPECT DETAILS</span>
                      <ArrowRight
                        size={12}
                        className={`transition-transform duration-200 ${
                          isSelected ? 'translate-x-1 text-[#19CDB8]' : 'group-hover:translate-x-1'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Detail Blueprint Panel with High-Resolution Image & Deep Dive */}
            <div className="border border-black bg-white p-6 sm:p-8 lg:p-10 shadow-sm relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-black">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#19CDB8] rounded-none border border-black" />
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-black uppercase">
                    FIELD AUDIT DOSSIER // {FRICTION_POINTS[activePoint].tag}
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.2em] text-black/50 uppercase">
                  RECORD #{activePoint + 1} OF 3
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Detailed Text Analysis */}
                <div className="lg:col-span-7 space-y-4">
                  <h3
                    className="text-2xl sm:text-3xl font-bold uppercase text-black leading-tight"
                    style={{ fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif" }}
                  >
                    {FRICTION_POINTS[activePoint].headline}
                  </h3>

                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#2B343B]">
                    {FRICTION_POINTS[activePoint].detail}
                  </p>

                  {/* Bullet Points */}
                  <div className="pt-2 space-y-2.5">
                    {FRICTION_POINTS[activePoint].bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[12.5px] text-black">
                        <span className="h-1.5 w-1.5 mt-1.5 bg-black rounded-none shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Before vs After Metric Strip */}
                  <div className="mt-6 pt-5 border-t border-black/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#FAFAF7] border border-black/30 p-3.5">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-[#C0392B] uppercase">
                        CURRENT STATUS QUO
                      </p>
                      <p className="mt-1 text-[12px] text-black font-semibold">
                        {FRICTION_POINTS[activePoint].metricComparison.before}
                      </p>
                    </div>

                    <div className="bg-[#19CDB8]/10 border border-[#19CDB8] p-3.5">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-[#028090] uppercase">
                        WITH FACTORYIQ DEPLOYED
                      </p>
                      <p className="mt-1 text-[12px] text-black font-bold">
                        {FRICTION_POINTS[activePoint].metricComparison.after}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Authentic Industrial Image with Technical Blueprint Framing */}
                <div className="lg:col-span-5 relative">
                  <div className="relative border-2 border-black overflow-hidden group">
                    <img
                      src={FRICTION_POINTS[activePoint].image}
                      alt={FRICTION_POINTS[activePoint].label}
                      className="w-full h-[260px] sm:h-[320px] object-cover filter contrast-[1.05] grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Industrial HUD Blueprint Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Technical Crosshairs and Watermark */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-white/20 text-[#19CDB8] text-[9.5px] px-2.5 py-1 tracking-[0.2em] font-mono uppercase">
                      FACILITY TELEMETRY // VERIFIED
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#19CDB8]">
                        SHOP-FLOOR EVIDENCE
                      </p>
                      <p className="text-[12px] text-gray-200 truncate mt-0.5">
                        {FRICTION_POINTS[activePoint].label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── VIEW 2: THE FACTORYIQ ENGINE (THE UNIFIED BRAIN) ── */}
        {activeTab === 'solution' && (
          <div className="space-y-8 animate-fade-in">
            {/* Architecture 3-Step Flow in Blueprint Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="border border-black bg-white p-6 relative">
                <div className="flex items-center justify-between mb-4 border-b border-black pb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#19CDB8] uppercase">
                    STAGE 01 // MULTI-FORMAT
                  </span>
                  <span className="text-[10px] font-mono text-black/50">OCR &amp; PARSE</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-none border border-black bg-[#FAFAF7] flex items-center justify-center text-black">
                    <FileText size={16} />
                  </div>
                  <h4
                    className="text-lg font-bold uppercase text-black"
                    style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    Universal Ingestion
                  </h4>
                </div>
                <p className="text-[12.5px] text-[#525960] leading-relaxed">
                  Extracts text and tables from PDFs, scanned drawings (Tesseract OCR),
                  Excel sheets, and Word docs with zero manual re-tagging.
                </p>
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-2 text-[10px] font-bold text-black uppercase">
                  <CheckCircle2 size={12} className="text-[#19CDB8]" />
                  <span>PDF, XLSX, DOCX, PNG, TIFF</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-black bg-white p-6 relative">
                <div className="flex items-center justify-between mb-4 border-b border-black pb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#19CDB8] uppercase">
                    STAGE 02 // VECTOR COGNITION
                  </span>
                  <span className="text-[10px] font-mono text-black/50">RAG RETRIEVAL</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-none border border-black bg-[#19CDB8]/20 flex items-center justify-center text-black">
                    <Cpu size={16} />
                  </div>
                  <h4
                    className="text-lg font-bold uppercase text-black"
                    style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    Contextual AI Query
                  </h4>
                </div>
                <p className="text-[12.5px] text-[#525960] leading-relaxed">
                  Converts worker questions into semantic embeddings and queries top-5
                  matches in milliseconds, synthesizing exact answers without hallucination.
                </p>
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-2 text-[10px] font-bold text-black uppercase">
                  <CheckCircle2 size={12} className="text-[#19CDB8]" />
                  <span>CITED PAGE &amp; SECTION NUMBERS</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border border-black bg-white p-6 relative">
                <div className="flex items-center justify-between mb-4 border-b border-black pb-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#19CDB8] uppercase">
                    STAGE 03 // SAFETY &amp; AUDIT
                  </span>
                  <span className="text-[10px] font-mono text-black/50">GAP DETECTION</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-none border border-black bg-[#FAFAF7] flex items-center justify-center text-black">
                    <ShieldAlert size={16} />
                  </div>
                  <h4
                    className="text-lg font-bold uppercase text-black"
                    style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    Proactive Governance
                  </h4>
                </div>
                <p className="text-[12.5px] text-[#525960] leading-relaxed">
                  Continuously flags missing safety procedures, overdue equipment
                  inspections, and conflicting P&ID revisions before audits flag them.
                </p>
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-2 text-[10px] font-bold text-black uppercase">
                  <CheckCircle2 size={12} className="text-[#19CDB8]" />
                  <span>AUTOMATED COMPLIANCE AUDITS</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Terminal Preview: "What the Worker Sees" */}
            <div className="border-2 border-black bg-[#0A1628] text-white p-6 sm:p-8 relative shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/20">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#19CDB8] animate-pulse" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#19CDB8]">
                    TERMINAL // LIVE RAG WORKER INTERFACE
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.15em] text-gray-400 font-mono">
                  RESPONSE TIME: 0.84s • 100% CITED
                </span>
              </div>

              <div className="space-y-4 font-mono">
                <div className="bg-white/5 border border-white/10 p-4 rounded-none">
                  <div className="flex items-center gap-2 text-[11px] text-[#19CDB8] uppercase tracking-wider mb-1">
                    <Search size={13} />
                    <span>Worker Prompt (Shop Floor Mobile Input):</span>
                  </div>
                  <p className="text-sm sm:text-base text-white font-medium">
                    "When was Compressor C-201 last overhauled, and what lube oil viscosity grade is mandated?"
                  </p>
                </div>

                <div className="bg-[#112240] border border-[#19CDB8]/40 p-5 rounded-none space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#19CDB8] flex items-center gap-1.5">
                      <Sparkles size={13} /> FACTORYIQ VERIFIED ANSWER
                    </span>
                    <span className="text-[10px] bg-[#19CDB8]/20 text-[#19CDB8] px-2 py-0.5 border border-[#19CDB8]/40">
                      CONFIDENCE: 99.4%
                    </span>
                  </div>

                  <p className="text-[13.5px] text-gray-200 leading-relaxed">
                    Compressor C-201 completed its last scheduled Stage-3 overhaul on{' '}
                    <strong className="text-white">November 14, 2025</strong> by Lead Tech D. Kulkarni.
                    The mandated lubricant is <strong className="text-[#19CDB8]">ISO VG 46 Synthetic Turbine Oil</strong>.
                    Warning: Work order #WO-8824 notes that the suction filter differential pressure gauge was replaced with a temporary 0-10 bar analog dial and must be recalibrated before next startup.
                  </p>

                  {/* Source Citations Ribbon */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-gray-400 text-[10px] tracking-wider uppercase">Citations:</span>
                    <span className="bg-white/10 text-white px-2.5 py-1 border border-white/20 flex items-center gap-1.5 hover:bg-white/20 cursor-pointer transition-colors">
                      <FileText size={11} className="text-[#19CDB8]" />
                      <span>Compressor_C201_Service_Log.xlsx (Row 142)</span>
                    </span>
                    <span className="bg-white/10 text-white px-2.5 py-1 border border-white/20 flex items-center gap-1.5 hover:bg-white/20 cursor-pointer transition-colors">
                      <FileText size={11} className="text-[#19CDB8]" />
                      <span>OEM_Manual_AtlasCopco_S3.pdf (Page 28, Sec 4.1)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── VIEW 3: LIVE FIELD BENCHMARK (LEGACY VS FACTORYIQ) ── */}
        {activeTab === 'comparison' && (
          <div className="space-y-8 animate-fade-in">
            {/* Scenario Selector */}
            <div className="flex flex-wrap items-center gap-3">
              {COMPARISON_SCENARIOS.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setActiveScenario(index)}
                  className={`px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase border transition-all cursor-pointer ${
                    activeScenario === index
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black/30 hover:border-black'
                  }`}
                >
                  SCENARIO #{index + 1}: {scenario.title}
                </button>
              ))}
            </div>

            {/* Side-by-Side Dual Column Audit Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Traditional Legacy Search */}
              <div className="border-2 border-black bg-white p-6 sm:p-8 relative">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black">
                  <div className="flex items-center gap-2 text-[#C0392B]">
                    <Clock size={16} />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                      THE STATUS QUO // MANUAL HUNTING
                    </span>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#C0392B]">
                    {COMPARISON_SCENARIOS[activeScenario].legacy.time}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest">
                    INCIDENT QUERY:
                  </p>
                  <p className="text-[13px] font-semibold text-black mt-1">
                    "{COMPARISON_SCENARIOS[activeScenario].query}"
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-black/10">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-black uppercase">
                    TYPICAL OPERATOR TIMELINE:
                  </p>
                  {COMPARISON_SCENARIOS[activeScenario].legacy.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[12px] text-[#525960]">
                      <span className="text-[#C0392B] font-bold font-mono">0{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-black/20 bg-[#FBEBEA] border border-[#C0392B]/40 p-3.5">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-[#C0392B] uppercase">
                    UNAVOIDABLE OUTCOME
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-black">
                    {COMPARISON_SCENARIOS[activeScenario].legacy.result}
                  </p>
                </div>
              </div>

              {/* Right Column: FactoryIQ AI Intelligence */}
              <div className="border-2 border-black bg-white p-6 sm:p-8 relative shadow-md">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black">
                  <div className="flex items-center gap-2 text-[#028090]">
                    <Sparkles size={16} className="text-[#19CDB8]" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                      FACTORYIQ // UNIFIED RAG ENGINE
                    </span>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#028090]">
                    {COMPARISON_SCENARIOS[activeScenario].factoryiq.time}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest">
                    DIRECT VERIFIED ANSWER:
                  </p>
                  <p className="text-[13px] font-semibold text-black mt-1">
                    "{COMPARISON_SCENARIOS[activeScenario].query}"
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-black/10">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-black uppercase">
                    AUTONOMOUS RESOLUTION STEPS:
                  </p>
                  {COMPARISON_SCENARIOS[activeScenario].factoryiq.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[12px] text-black">
                      <span className="text-[#19CDB8] font-bold font-mono">✓</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-black/20 bg-[#19CDB8]/15 border border-[#19CDB8] p-3.5">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-[#028090] uppercase">
                    ENGINEERING BENEFIT
                  </p>
                  <p className="mt-1 text-[12px] font-bold text-black">
                    {COMPARISON_SCENARIOS[activeScenario].factoryiq.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Metric Bar & Architecture Verification Signature */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-black">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.15em] font-semibold uppercase text-black">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#19CDB8] rounded-none" />
              <span>DEPLOYMENT READY: ZERO CLOUD MIGRATION NECESSARY • ON-PREM &amp; ATLAS COMPLIANT</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-black/60">ET AI HACKATHON 2026 // PS-08</span>
              <a
                href="#features"
                className="inline-flex items-center gap-1.5 text-black hover:text-[#19CDB8] transition-colors"
              >
                <span>EXPLORE CAPABILITIES</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
