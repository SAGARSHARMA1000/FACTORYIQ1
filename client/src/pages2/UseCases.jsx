import React, { useState } from 'react';
import {
  Flame,
  Droplets,
  Zap,
  Cpu,
  FlaskConical,
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const SECTOR_USE_CASES = [
  {
    id: 'steel-heavy-manufacturing',
    sector: 'Steel & Heavy Manufacturing',
    index: '01',
    icon: Flame,
    tag: 'SECTOR.01 // METALLURGY & HEAVY ASSETS',
    badge: 'Blast Furnace & Rolling Mills',
    headline: 'Instant Retrieval Across 30+ Years of Faded Paper Blueprints',
    summary:
      'Continuous casting machines and hot strip mills operate under severe thermal shock. FactoryIQ turns decades of paper archives into an instant troubleshooting layer when mill stands jam.',
    sampleQuery: 'Roll neck bearing clearance and synthetic grease grade for Stand #4?',
    sampleAnswer:
      'Clearance spec is 0.45mm–0.60mm. Required lubricant is Mobilith SHC 460 Heavy Synthetic. Note: ECN #2024-88 replaced mechanical grease nipples with automated Lincoln dual-line injectors.',
    citation: 'RollingMill_Stand4_Drawings_1998_Rev6.pdf (Sheet 12, P&ID-804)',
    metrics: [
      { label: 'Unplanned Mill Downtime', change: '-38%', note: 'faster roll-change troubleshooting' },
      { label: 'Paper Archives Indexed', change: '42,000+', note: 'drawings, OEM manuals & work orders' },
      { label: 'Lookup Latency', change: '0.82s', note: 'down from 45 min physical search' },
    ],
    image:
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
    capabilities: [
      'P&ID vector search on scanned 1990s CAD schematics',
      'Hydraulic roll-balance pressure cross-referencing',
      'Preventative breakdown correlation across seasonal shifts',
    ],
  },
  {
    id: 'oil-gas-refining',
    sector: 'Oil, Gas & Petrochemical Refining',
    index: '02',
    icon: Droplets,
    tag: 'SECTOR.02 // REFINING & CRACKING',
    badge: 'Hydrocrackers & Tank Farms',
    headline: 'Hazardous Plant Operations with Zero-Delay Safety Compliance',
    summary:
      'Refineries cannot afford a single unverified gasket specification in hydrocarbon service. Field operators query P&ID tags directly on rugged mobile phones before breaking flange containment.',
    sampleQuery: 'Isolation valve lockout procedure and nitrogen purge pressure for Column C-102?',
    sampleAnswer:
      'Step 1: Blind flange 12" suction at valve XV-102A. Step 2: Inject N2 purge at 4.2 bar until LEL reading is < 1%. Step 3: Verify OISD-116 safety permit signoff by Shift Superintendent.',
    citation: 'SOP_Hydrocracker_Purge_Rev5.pdf (Page 18, Section 3.2)',
    metrics: [
      { label: 'Turnaround Turn-Time', change: '-24%', note: 'faster isolation package assembly' },
      { label: 'Statutory Compliance', change: '100%', note: 'aligned with OISD-116 & PESO' },
      { label: 'Safety Violations', change: '0', note: 'audited against latest safety bulletins' },
    ],
    image:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80',
    capabilities: [
      'Flange rating and spiral-wound gasket metallurgy lookups',
      'Automatic flagging of expired hydrotest certificates',
      'Emergency depressurization valve sequencing during upsets',
    ],
  },
  {
    id: 'power-energy',
    sector: 'Thermal & Renewable Power Generation',
    index: '03',
    icon: Zap,
    tag: 'SECTOR.03 // GRID & GENERATION',
    badge: 'Turbines & Sub-stations',
    headline: 'Connecting SCADA Alarm History with OEM Vibration Manuals',
    summary:
      'When a 500MW generator trips on high thrust bearing temperature, technicians cross-reference SCADA event sequences with OEM diagnostic flowcharts in sub-second time.',
    sampleQuery: 'Emergency trip threshold for LP turbine shaft axial displacement?',
    sampleAnswer:
      'Alarm at +0.40mm / -0.40mm. Master trip initiates automatically at +0.65mm / -0.65mm. Prior trip #TR-201 on Unit 2 was traced to oil debris fouling the proximity sensor bracket.',
    citation: 'OEM_BHEL_Turbine_Manual_Vol2.pdf (Page 112, Table 4.6)',
    metrics: [
      { label: 'Trip Diagnosis Time', change: '85% faster', note: 'instant correlation with SCADA logs' },
      { label: 'Generation Availability', change: '+3.4%', note: 'avoided multi-hour grid curtailments' },
      { label: 'Root-Cause Speed', change: '< 2 mins', note: 'multi-document RAG synthesis' },
    ],
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    capabilities: [
      'Instant axial shift and bearing vibration diagnostic guides',
      'Boiler tube thickness NDT inspection record synthesis',
      '400kV gas-insulated switchgear (GIS) maintenance procedures',
    ],
  },
  {
    id: 'automotive-gigafactories',
    sector: 'Automotive & EV Gigafactories',
    index: '04',
    icon: Cpu,
    tag: 'SECTOR.04 // ROBOTICS & BATTERY CELLS',
    badge: 'Robotic Weld & Curing Lines',
    headline: 'Tracing Batch Quality Defects Back Through Supplier Specs',
    summary:
      'High-speed robotic lines generate terabytes of inspection sheets. When weld torque or battery pouch seal thickness drifts, FactoryIQ traces the defect to exact vendor lots and tool calibration files.',
    sampleQuery: 'Ultrasonic horn weld frequency and pneumatic clamp pressure for Module 4?',
    sampleAnswer:
      'Operating frequency: 20 kHz ± 250 Hz. Clamp pressure: 3.4 bar. If tab tear test falls below 140 N, replace sonotrode tip (Part #SN-882) as mandated in Quality Alert QA-902.',
    citation: 'Battery_Module_Assembly_SOP_v3.pdf (Page 31, Spec Sheet)',
    metrics: [
      { label: 'Quality Scrap Rate', change: '-32%', note: 'rapid parameter readjustments' },
      { label: 'Line Stoppage Hours', change: '-45%', note: 'instant robotic troubleshooting' },
      { label: 'Supplier Root Cause', change: '4x faster', note: 'cross-linked mill test certs' },
    ],
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80',
    capabilities: [
      'Robotic welding fault code cross-referencing',
      'Battery dry room environmental SOP compliance',
      'Traceability across incoming raw material test certificates (COA)',
    ],
  },
  {
    id: 'pharma-specialty-chem',
    sector: 'Pharma & Specialty Chemical Processing',
    index: '05',
    icon: FlaskConical,
    tag: 'SECTOR.05 // CGMP & SPECIALTY BATCH',
    badge: 'Cleanrooms & Glass Reactors',
    headline: 'Audit-Proof cGMP Traceability & CIP/SIP Sterilization Specs',
    summary:
      'Regulatory compliance leaves no room for ambiguity. Operators verify Clean-in-Place (CIP) chemical concentrations, spray ball pressures, and FDA 21 CFR Part 11 records instantly.',
    sampleQuery: 'Holding temperature and caustic soda wash duration for 5000L Bioreactor R-01?',
    sampleAnswer:
      'Maintain 2.0% w/w NaOH solution at 75°C–80°C for 45 minutes at minimum 2.5 bar spray pressure. Final rinse water conductivity must read < 1.3 µS/cm before batch release.',
    citation: 'Validation_Master_Plan_CIP_R01.pdf (Protocol Val-084, Pg 9)',
    metrics: [
      { label: 'Batch Release Delays', change: '-60%', note: 'streamlined deviation investigations' },
      { label: 'Audit Inspection Prep', change: '1 Day', note: 'down from 2 weeks of manual collation' },
      { label: 'SOP Version Control', change: '100%', note: 'zero superseded protocols utilized' },
    ],
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80',
    capabilities: [
      'Instant validation protocol (IQ/OQ/PQ) document retrieval',
      'Cleanroom differential pressure threshold troubleshooting',
      'Cross-batch deviation pattern analysis for QA/QC teams',
    ],
  },
];

export default function UseCases() {
  const [activeSector, setActiveSector] = useState(0);
  const current = SECTOR_USE_CASES[activeSector];

  return (
    <section
      id="use-cases"
      className="relative w-full bg-[#0A1628] text-white select-none border-t border-[#1F314F]/60 pt-16 sm:pt-20 pb-20 sm:pb-28 px-6 sm:px-10 md:px-14 lg:px-20 transition-colors overflow-hidden"
      style={{
        backgroundColor: '#0A1628',
        color: '#FFFFFF',
        fontFamily: "'Space Mono', 'Geist Mono', monospace",
      }}
    >
      {/* Subtle Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #19CDB8 1px, transparent 1px), linear-gradient(to bottom, #19CDB8 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Architectural Blueprint Framing Line with Coordinates */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#19CDB8] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#19CDB8] uppercase">
                SEC.04 // SECTOR DEPLOYMENTS SPECIFICATION
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8FA4B8]/60">
              <span>ASSET READINESS</span>
              <span>•</span>
              <span>HEAVY INDUSTRY TESTED</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="h-[1.5px] bg-[#1F314F] flex-1 max-w-[85%]" />
            <div className="w-3 h-3 border border-[#19CDB8] rotate-45 -ml-1.5 bg-[#0A1628]" />
          </div>
        </div>

        {/* Section Header Grid: Architectural Display Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 mb-12 sm:mb-16">
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-px w-6 bg-[#19CDB8]" />
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8FA4B8]">
                PROVEN IN HIGH-STAKES ENVIRONMENTS
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
              BUILT FOR PLANTS,
              <br />
              <span className="text-[#19CDB8]">NOT AIR-CONDITIONED OFFICES.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between lg:pl-6">
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#DCE8F0]/80 font-mono">
              Whether you manage an integrated steel plant, an oil refinery, or a high-speed
              battery manufacturing facility, your operators face the same reality:
              unplanned trips cost tens of thousands per minute while critical answers remain
              trapped in unindexed binders.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-[#8FA4B8]">
              <span className="text-[#19CDB8]">SELECT SECTOR //</span>
              <span>EXPLORE MISSION-CRITICAL PLAYBOOKS</span>
            </div>
          </div>
        </div>

        {/* Sector Navigation Selector (Industrial Blueprint Tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10">
          {SECTOR_USE_CASES.map((uc, index) => {
            const Icon = uc.icon;
            const isSelected = activeSector === index;
            return (
              <button
                key={uc.id}
                type="button"
                onClick={() => setActiveSector(index)}
                className={`relative px-4 py-3.5 border transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#112240] border-[#19CDB8] shadow-[0_0_20px_rgba(25,205,184,0.18)] translate-y-[-2px]'
                    : 'bg-[#0D1C34]/80 border-[#1F314F] hover:border-[#19CDB8]/50 hover:bg-[#112240]/80'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#19CDB8] shadow-[0_0_8px_#19CDB8]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#8FA4B8]">
                    {uc.index}
                  </span>
                  <Icon
                    size={16}
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
                    {uc.sector.split(' ')[0]} {uc.sector.split(' ')[1] || ''}
                  </p>
                  <span
                    className={`text-[9.5px] font-mono tracking-wider uppercase block mt-1 truncate ${
                      isSelected ? 'text-[#19CDB8]' : 'text-[#8FA4B8]/60'
                    }`}
                  >
                    {uc.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Sector Detailed Engineering Dossier */}
        <div className="border border-[#1F314F] bg-[#0E1E38] p-6 sm:p-8 lg:p-10 relative shadow-2xl animate-fade-in">
          {/* Corner Notch Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#19CDB8]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#19CDB8]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#19CDB8]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#19CDB8]" />

          {/* Dossier Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#1F314F] gap-2">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#19CDB8]/20 border border-[#19CDB8]/40 text-[#19CDB8] text-[10px] font-bold tracking-[0.2em] font-mono uppercase">
                {current.tag}
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#8FA4B8] uppercase">
                FIELD RECORD // {current.index}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#8FA4B8] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19CDB8]" />
              <span>SHOP-FLOOR VERIFIED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Deep-Dive Sector Narrative & Metrics */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#19CDB8]/10 border border-[#19CDB8]/40 flex items-center justify-center text-[#19CDB8] shrink-0">
                  {React.createElement(current.icon, { size: 20 })}
                </div>
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold uppercase text-white leading-tight"
                    style={{ fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif" }}
                  >
                    {current.sector}
                  </h3>
                  <p className="text-[10.5px] font-mono tracking-[0.15em] text-[#19CDB8] uppercase mt-0.5">
                    {current.headline}
                  </p>
                </div>
              </div>

              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#DCE8F0]/90 font-mono">
                {current.summary}
              </p>

              {/* Three Real Field Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {current.metrics.map((m) => (
                  <div key={m.label} className="bg-[#0A1628] border border-[#1F314F] p-3.5 font-mono">
                    <span className="text-2xl font-bold text-[#19CDB8] tracking-tight block">
                      {m.change}
                    </span>
                    <p className="text-[11px] font-bold text-white uppercase mt-0.5">
                      {m.label}
                    </p>
                    <p className="text-[10px] text-[#8FA4B8] leading-tight mt-1">
                      {m.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Real Industrial Query Simulation Box */}
              <div className="p-4 bg-[#0A1628] border border-[#19CDB8]/30 font-mono text-[11.5px] space-y-2">
                <div className="flex items-center justify-between text-[10px] text-[#19CDB8] uppercase tracking-wider border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Search size={12} /> FIELD OPERATOR LIVE QUERY EXAMPLE
                  </span>
                  <span className="text-gray-400">P&ID CITED</span>
                </div>

                <p className="text-[#8FA4B8]">
                  Worker: <span className="text-white font-medium">"{current.sampleQuery}"</span>
                </p>
                <p className="text-gray-200 leading-relaxed">
                  FactoryIQ: {current.sampleAnswer}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[#19CDB8] text-[10px]">
                  <FileText size={11} />
                  <span>{current.citation}</span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Curated Plant Floor Image with HUD Telemetry */}
            <div className="lg:col-span-5 relative">
              <div className="relative border-2 border-[#1F314F] overflow-hidden group shadow-xl">
                <img
                  src={current.image}
                  alt={current.sector}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover filter contrast-[1.1] brightness-[0.9] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent pointer-events-none" />

                {/* HUD Top Corner Badge */}
                <div className="absolute top-3.5 left-3.5 bg-[#0A1628]/90 backdrop-blur-md border border-[#19CDB8]/40 text-[#19CDB8] text-[9.5px] px-2.5 py-1 tracking-[0.2em] font-mono uppercase flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19CDB8] animate-ping" />
                  <span>CRITICAL ASSET RUNTIME</span>
                </div>

                {/* HUD Bottom Spec Checklist */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white bg-[#0A1628]/90 backdrop-blur-sm p-3 border border-white/10">
                  <p className="text-[10px] text-[#19CDB8] uppercase font-mono tracking-wider mb-1.5">
                    KEY CAPABILITIES DEPLOYED:
                  </p>
                  <div className="space-y-1">
                    {current.capabilities.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-gray-200">
                        <CheckCircle2 size={12} className="text-[#19CDB8] shrink-0" />
                        <span className="truncate">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Blueprint Verification Strip */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-[#1F314F]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.15em] font-semibold uppercase text-[#8FA4B8]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#19CDB8] rounded-none shadow-[0_0_8px_#19CDB8]" />
              <span className="text-white">
                ENTERPRISE READY • ADAPTED TO AIR-GAPPED PLANT DCS &amp; HYBRID MULTI-SITE CLUSTERS
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[#8FA4B8]/60">5 VERTICALS TESTED</span>
              <a
                href="#demo"
                className="inline-flex items-center gap-1.5 text-[#19CDB8] hover:text-white transition-colors"
              >
                <span>ACTIVATE YOUR PLANT BRAIN</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
