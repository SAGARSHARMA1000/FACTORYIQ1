import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';

export default function ClosingCta() {
  return (
    <section
      id="closing-cta"
      className="relative w-full bg-[#0A1628] text-white select-none border-t border-[#1F314F]/60 pt-16 sm:pt-20 pb-20 sm:pb-28 px-6 sm:px-10 md:px-14 lg:px-20 transition-colors overflow-hidden"
      style={{
        backgroundColor: '#0A1628',
        color: '#FFFFFF',
        fontFamily: "'Space Mono', 'Geist Mono', monospace",
      }}
    >
      {/* Subtle Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #19CDB8 1px, transparent 1px), linear-gradient(to bottom, #19CDB8 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Radiant Electric Teal Glow Behind Main Action Box */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#19CDB8]/[0.06] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Architectural Blueprint Framing Line with Coordinates */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#19CDB8] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#19CDB8] uppercase">
                SEC.05 // TERMINAL ACTIVATION &amp; TRIAL DEPLOYMENT
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#8FA4B8]/60">
              <span>ZERO MIGRATION DOWNTIME</span>
              <span>•</span>
              <span>LIVE DEMO READY</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="h-[1.5px] bg-[#1F314F] flex-1 max-w-[85%]" />
            <div className="w-3 h-3 border border-[#19CDB8] rotate-45 -ml-1.5 bg-[#0A1628]" />
          </div>
        </div>

        {/* Central Architectural Terminal Frame */}
        <div className="border-2 border-[#1F314F] bg-[#0E1E38] p-8 sm:p-12 lg:p-16 relative shadow-2xl">
          {/* Corner Notch Accents */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#19CDB8]" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#19CDB8]" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#19CDB8]" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#19CDB8]" />

          {/* Top Status Bar within Terminal Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#1F314F] gap-3">
            <div className="flex items-center gap-2 text-[11px] text-[#19CDB8] font-mono tracking-widest uppercase">
              <Terminal size={14} />
              <span>TERMINAL READY // FACTORYIQ INSTANT SEARCH ENGINE</span>
            </div>

            <div className="flex items-center gap-2 text-[10.5px] text-[#8FA4B8] font-mono">
              <span className="h-2 w-2 rounded-full bg-[#19CDB8] animate-ping" />
              <span className="text-white font-semibold">100% OPERATIONAL</span>
              <span>•</span>
              <span>RESPONSE TIME &lt; 0.9s</span>
            </div>
          </div>

          {/* Main Headline & Narrative */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#19CDB8]/10 border border-[#19CDB8]/30 text-[#19CDB8] text-[10.5px] font-bold tracking-[0.2em] font-mono uppercase">
              <Sparkles size={12} /> INDUSTRIAL KNOWLEDGE INTELLIGENCE
            </div>

            <h2
              className="text-white font-bold uppercase leading-[1.06] tracking-[0.02em] text-[32px] sm:text-[44px] md:text-[54px] lg:text-[58px]"
              style={{
                fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif",
                lineHeight: 1.06,
                letterSpacing: '0.02em',
              }}
            >
              STOP SEARCHING BINDERS.
              <br />
              <span className="text-[#19CDB8]">START ASKING FACTORYIQ.</span>
            </h2>

            <p className="text-[13.5px] sm:text-[15px] leading-relaxed text-[#DCE8F0]/90 font-mono max-w-2xl mx-auto pt-2">
              Ingest your first batch of equipment manuals, P&IDs, and maintenance records in five minutes.
              Empower every plant technician with cited, verified answers right on their phone.
            </p>

            {/* Industrial Specification Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left pt-6 pb-4">
              <div className="bg-[#0A1628] border border-[#1F314F] p-3.5 font-mono">
                <div className="flex items-center gap-2 text-[#19CDB8] text-[11px] font-bold uppercase mb-1">
                  <CheckCircle2 size={13} />
                  <span>Zero Reformatting</span>
                </div>
                <p className="text-[10.5px] text-[#8FA4B8] leading-relaxed">
                  Extracts text & tables directly from PDF, scanned OCR, CAD, & Excel.
                </p>
              </div>

              <div className="bg-[#0A1628] border border-[#1F314F] p-3.5 font-mono">
                <div className="flex items-center gap-2 text-[#19CDB8] text-[11px] font-bold uppercase mb-1">
                  <CheckCircle2 size={13} />
                  <span>Exact Citations</span>
                </div>
                <p className="text-[10.5px] text-[#8FA4B8] leading-relaxed">
                  Every answer links to the precise document page and drawing coordinate.
                </p>
              </div>

              <div className="bg-[#0A1628] border border-[#1F314F] p-3.5 font-mono">
                <div className="flex items-center gap-2 text-[#19CDB8] text-[11px] font-bold uppercase mb-1">
                  <CheckCircle2 size={13} />
                  <span>Statutory Radar</span>
                </div>
                <p className="text-[10.5px] text-[#8FA4B8] leading-relaxed">
                  Autonomous gap detection across Factory Act, OISD, and PESO rules.
                </p>
              </div>

              <div className="bg-[#0A1628] border border-[#1F314F] p-3.5 font-mono">
                <div className="flex items-center gap-2 text-[#19CDB8] text-[11px] font-bold uppercase mb-1">
                  <CheckCircle2 size={13} />
                  <span>Air-Gapped Ready</span>
                </div>
                <p className="text-[10.5px] text-[#8FA4B8] leading-relaxed">
                  Runs securely on MongoDB Atlas or behind enterprise plant firewalls.
                </p>
              </div>
            </div>

            {/* Action Buttons in Industrial Brushed Metal & Electric Teal Styling */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/app"
                className="group relative inline-flex items-center justify-center gap-3 bg-[#19CDB8] hover:bg-[#19CDB8]/90 text-[#0A1628] font-bold text-[12px] sm:text-[13px] tracking-[0.16em] uppercase px-8 py-4 transition-all duration-200 shadow-[0_0_25px_rgba(25,205,184,0.35)] hover:shadow-[0_0_35px_rgba(25,205,184,0.5)] cursor-pointer"
                style={{ fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif" }}
              >
                <MessageSquare size={16} />
                <span>TRY THE LIVE SHOP-FLOOR DEMO</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
{/* 
              <a
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 bg-[#112240] hover:bg-[#1A335E] border border-[#19CDB8]/50 hover:border-[#19CDB8] text-white font-bold text-[12px] sm:text-[13px] tracking-[0.16em] uppercase px-7 py-4 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif" }}
              >
                <span>OPEN ROLE DASHBOARD</span>
                <ArrowUpRight size={15} className="text-[#19CDB8] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="/app/documents"
                className="group inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-mono text-[11px] sm:text-[12px] tracking-[0.15em] uppercase px-6 py-4 transition-all duration-200"
              >
                <FileText size={14} className="text-[#8FA4B8]" />
                <span>UPLOAD DOCUMENTS</span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Blueprint Verification Strip */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-[#1F314F]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.15em] font-semibold uppercase text-[#8FA4B8]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#19CDB8] rounded-none shadow-[0_0_8px_#19CDB8]" />
              <span className="text-white">
                BUILT FOR ET AI HACKATHON 2026 // PROBLEM STATEMENT #08
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[#8FA4B8]/60">FACTORYIQ INDUSTRIAL BRAIN</span>
              <a
                href="#home"
                className="inline-flex items-center gap-1.5 text-[#19CDB8] hover:text-white transition-colors"
              >
                <span>RETURN TO TOP</span>
                <ArrowRight size={12} className="-rotate-90" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
