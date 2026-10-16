import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Cpu,
  MessageSquare,
  CheckCircle2,
  FileText,
  Play,
  Pause,
  ArrowRight,
  Database,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  Search,
} from 'lucide-react';

const STEPS = [
  {
    n: '01',
    time: 'T + 0.0s',
    title: 'Ingest & OCR',
    subtitle: 'Upload',
    body: 'Drop in PDFs, drawings, work orders, or scanned forms. Ingested automatically without cleanup or reformatting.',
    tag: 'MULTI-MODAL INGESTION',
    metrics: '412 Pages • 3 Formats • 0.8s Parser',
    icon: Upload,
  },
  {
    n: '02',
    time: 'T + 1.4s',
    title: 'Neural Indexing',
    subtitle: 'Index',
    body: 'Documents are read, chunked, and converted into high-dimensional vector embeddings linked to your asset registry.',
    tag: 'VECTOR EMBEDDING',
    metrics: '14,280 Chunks • 1536-D Vectors • Graph Linked',
    icon: Cpu,
  },
  {
    n: '03',
    time: 'T + 2.8s',
    title: 'Semantic Query',
    subtitle: 'Ask',
    body: 'Type a question the way you\'d ask an expert colleague. No keywords, no query language, no folder searching.',
    tag: 'NATURAL LANGUAGE',
    metrics: 'Intent Resolved • 140ms Latency • Contextual',
    icon: MessageSquare,
  },
  {
    n: '04',
    time: 'T + 4.2s',
    title: 'Cited Verification',
    subtitle: 'Get a cited answer',
    body: 'Every answer points back to the exact document and page it came from — verifiable ground truth, not guessed.',
    tag: 'GROUND TRUTH CITATION',
    metrics: '100% Verifiable • Zero Hallucination • Audit Log',
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Auto-progress through the timeline steps every 4.5 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % STEPS.length);
          return 0;
        }
        return prev + 2;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [isPlaying, activeStep]);

  // Subtle interactive 3D tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 7, y: y * -7 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const current = STEPS[activeStep];

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#FAFAF7] text-black select-none border-t border-black/40 pt-16 sm:pt-20 pb-20 sm:pb-28 px-6 sm:px-10 md:px-14 lg:px-20 transition-colors overflow-hidden"
      style={{
        backgroundColor: '#FAFAF7',
        color: '#000000',
        fontFamily: "'Space Mono', 'Geist Mono', monospace",
      }}
    >
      {/* Background Architectural Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Teal Reflection in Light Background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-[#19CDB8]/[0.06] blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Top Architectural Blueprint Framing Line with Coordinates */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#19CDB8] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-black uppercase">
                SEC.03 // TIMELINE EXECUTION PIPELINE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] text-black/50">
              <span>LATENCY: &lt; 900MS</span>
              <span>•</span>
              <span>GROUND TRUTH CITATIONS</span>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <div className="h-[1.5px] bg-black flex-1 max-w-[85%]" />
            <div className="w-3 h-3 border border-black rotate-45 -ml-1.5 bg-[#FAFAF7]" />
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-px w-6 bg-[#19CDB8]" />
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-black/70">
                AUTONOMOUS RAG WORKFLOW
              </p>
            </div>
            <h2
              className="text-black font-bold uppercase leading-[1.08] tracking-[0.02em] text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px]"
              style={{
                fontFamily: "'Chakra Petch', 'Space Grotesk', sans-serif",
                lineHeight: 1.08,
                letterSpacing: '0.02em',
              }}
            >
              FROM DOCUMENT TO ANSWER <br />
              <span className="text-[#19CDB8]">IN FOUR PRECISE STEPS.</span>
            </h2>
            <p className="mt-4 text-[13.5px] sm:text-[14px] leading-relaxed text-[#2B343B] font-mono">
              FactoryIQ automates factory knowledge retrieval in real-time. Watch how raw
              industrial manuals become verified, cited answers in milliseconds.
            </p>
          </div>

          {/* Timeline Playback Controls (Brushed Architectural Style) */}
          <div className="flex items-center gap-3 bg-white border border-black px-4 py-2 self-start md:self-end shadow-sm">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 text-xs font-mono text-black hover:text-[#19CDB8] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#19CDB8]" />
                  <span className="font-bold tracking-wider">PAUSE TIMELINE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#19CDB8]" />
                  <span className="font-bold tracking-wider">PLAY TIMELINE</span>
                </>
              )}
            </button>
            <div className="h-4 w-px bg-black/20" />
            <span className="text-xs font-mono text-black font-bold tabular-nums">
              {current.time}
            </span>
          </div>
        </div>

        {/* Main Grid: Left Timeline Steps + Right Floating Time Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.n}
                  onClick={() => {
                    setActiveStep(idx);
                    setProgress(0);
                  }}
                  className={`group relative p-5 border cursor-pointer transition-all duration-300 select-none ${
                    isActive
                      ? 'bg-white border-2 border-black shadow-lg translate-y-[-2px]'
                      : 'bg-[#F3F3EE] border-black/30 hover:border-black hover:bg-white'
                  }`}
                >
                  {/* Corner Accent for Active Step */}
                  {isActive && (
                    <>
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-black" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-black" />
                    </>
                  )}

                  {/* Active Indicator & Top Line */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 border ${
                          isActive
                            ? 'bg-black text-[#19CDB8] border-black'
                            : 'bg-black/5 text-black border-black/20 group-hover:bg-black group-hover:text-white'
                        }`}
                      >
                        {step.n}
                      </span>
                      <span className="text-[11px] font-mono text-black/60 font-semibold tracking-wider">
                        {step.time}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
                        isActive ? 'text-[#19CDB8]' : 'text-black/50'
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mt-2">
                    <div
                      className={`p-2 border transition-colors shrink-0 ${
                        isActive
                          ? 'bg-[#19CDB8]/15 border-[#19CDB8] text-black'
                          : 'bg-white border-black/20 text-black/70 group-hover:text-black group-hover:border-black'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold uppercase transition-colors text-black"
                        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-[13px] text-[#525960] leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>

                  {/* Animated Progress Bar under the active step */}
                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                      <span className="text-[10.5px] font-mono text-black/70 font-semibold">
                        {step.metrics}
                      </span>
                      <div className="w-20 h-1.5 bg-[#EAEAEA] border border-black/20 overflow-hidden">
                        <div
                          className="h-full bg-[#19CDB8] transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Floating Simulated Time Card */}
          <div className="lg:col-span-7 flex justify-center relative">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 bg-[#19CDB8]/10 rounded-none blur-2xl pointer-events-none animate-pulse-glow" />

            {/* Orbiting Satellite Telemetry Chip 1 (Top-Right) */}
            <div className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center gap-2 px-3 py-1.5 bg-white border-2 border-black text-black shadow-xl text-[10.5px] font-mono tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#19CDB8] animate-ping" />
              <span>INFERENCE: 180ms</span>
            </div>

            {/* Orbiting Satellite Telemetry Chip 2 (Bottom-Left) */}
            <div className="hidden sm:flex absolute -bottom-4 -left-2 z-20 items-center gap-2 px-3 py-1.5 bg-white border-2 border-black text-black shadow-xl text-[10.5px] font-mono tracking-wider font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#19CDB8]" />
              <span>OISD &amp; PESO AUDIT READY</span>
            </div>

            {/* Main Interactive Floating Card (Light Blueprint Cockpit) */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="animate-float-card relative w-full max-w-[540px] bg-white border-2 border-black p-6 sm:p-7 shadow-2xl overflow-hidden"
            >
              {/* Corner Notch Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black" />

              {/* Top Cockpit Status Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-black text-[11px] font-mono text-black">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#19CDB8] animate-pulse" />
                  <span className="text-black font-bold tracking-wider uppercase">
                    SYSTEM TIME // {current.time}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-black/60 font-mono">
                  <span>STEP</span>
                  <span className="text-black font-bold">{current.n}</span>
                  <span>/ 04</span>
                </div>
              </div>

              {/* Dynamic Step Content Showcase */}
              <div className="py-6 min-h-[300px] flex flex-col justify-center">
                {/* STEP 1: UPLOAD SIMULATION */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="border border-dashed border-black/40 p-4 bg-[#FAFAF7] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#19CDB8]/15 border border-[#19CDB8] text-black">
                          <Upload className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="text-xs font-mono font-bold text-black">
                            P&amp;ID_Cracking_Tower_Unit3.dwg
                          </p>
                          <p className="text-[11px] font-mono text-[#525960]">
                            12.4 MB • SCADA &amp; Drawing Layer
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-black text-[#19CDB8] font-bold">
                        OCR READY
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-[#FAFAF7] border border-black/20 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2 text-black">
                          <FileText className="w-4 h-4 text-[#19CDB8]" />
                          <span>Siemens_Turbine_SGT800_OEM.pdf</span>
                        </div>
                        <span className="text-black font-semibold">48.1 MB</span>
                      </div>
                      <div className="p-3 bg-[#FAFAF7] border border-black/20 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2 text-black">
                          <FileText className="w-4 h-4 text-[#19CDB8]" />
                          <span>Maintenance_Log_2025_Q1.xlsx</span>
                        </div>
                        <span className="text-black font-semibold">6.2 MB</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#19CDB8]/10 border border-[#19CDB8] text-[11px] font-mono text-black flex items-center justify-between">
                      <span className="font-bold text-[#028090]">INGESTION TELEMETRY:</span>
                      <span className="font-semibold">412 PAGES • ZERO CLEANUP REQUIRED</span>
                    </div>
                  </div>
                )}

                {/* STEP 2: NEURAL INDEXING SIMULATION */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-[#FAFAF7] border border-black/30">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono">
                        <span className="text-black font-bold flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-[#19CDB8]" />
                          VECTOR EMBEDDING PIPELINE
                        </span>
                        <span className="text-black/60 font-semibold">1536-D TENSORS</span>
                      </div>
                      <div className="bg-[#F0F0EB] p-3 border border-black/20 font-mono text-[11px] text-[#028090] font-semibold leading-relaxed overflow-hidden">
                        <code>
                          [0.8421, -0.1942, 0.6124, 0.9412, -0.0418, ... +1,531 dims]
                        </code>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-[#FAFAF7] border border-black/20">
                        <p className="text-black/60 text-[10px] font-bold">CHUNKS GENERATED</p>
                        <p className="text-lg font-bold text-black mt-0.5">14,280</p>
                      </div>
                      <div className="p-3 bg-[#FAFAF7] border border-black/20">
                        <p className="text-black/60 text-[10px] font-bold">GRAPH LINKAGE</p>
                        <p className="text-lg font-bold text-[#028090] mt-0.5">PU-307 ↔ MTR-04</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#19CDB8]/10 border border-[#19CDB8] text-[11px] font-mono text-black font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#19CDB8] flex-shrink-0" />
                      <span>EQUIPMENT ONTOLOGY &amp; WORK ORDER GRAPH CREATED</span>
                    </div>
                  </div>
                )}

                {/* STEP 3: ASK QUERY SIMULATION */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-[#FAFAF7] border border-black/40">
                      <div className="flex items-center gap-2 text-xs font-mono text-black/60 font-bold mb-2">
                        <Search className="w-3.5 h-3.5 text-[#19CDB8]" />
                        <span>OPERATOR QUERY:</span>
                      </div>
                      <p className="text-sm font-semibold text-black leading-relaxed">
                        &quot;What is the torque spec and lube oil replacement interval for
                        Pump-7 during hot restarts?&quot;
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 text-[10.5px] font-mono font-semibold">
                        <span className="px-2 py-1 bg-white border border-black text-black">
                          ENTITY: PUMP-7 (PU-307)
                        </span>
                        <span className="px-2 py-1 bg-white border border-black text-black">
                          CONDITION: HOT RESTART (&gt;45°C)
                        </span>
                        <span className="px-2 py-1 bg-white border border-black text-black">
                          METRIC: TORQUE + OIL
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-black text-[11px] font-mono text-black flex items-center justify-between">
                      <span className="text-black/60 font-semibold">SEARCH LATENCY:</span>
                      <span className="text-[#028090] font-bold">140ms // ZERO KEYWORD RIGIDITY</span>
                    </div>
                  </div>
                )}

                {/* STEP 4: CITED VERIFIED ANSWER */}
                {activeStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-[#19CDB8]/15 border border-[#19CDB8]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-black flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#19CDB8]" />
                          VERIFIED FACTORY GROUND TRUTH
                        </span>
                        <span className="text-[10px] font-mono font-bold text-black bg-white px-2 py-0.5 border border-black/20">
                          100% AUDITED
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-black leading-relaxed font-sans font-medium">
                        Replace lube oil with <span className="text-[#028090] font-bold">ISO VG 68</span> every 2,000 run-hours. Under ambient heat (&gt;45°C), shorten to 1,200 hours. M24 flange bolts must be torqued to <span className="text-[#028090] font-bold">485 Nm</span> in cross-pattern.
                      </p>
                    </div>

                    {/* Verifiable Citation Badge */}
                    <div className="p-3 bg-white border border-black flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-black">
                        <FileText className="w-4 h-4 text-[#19CDB8]" />
                        <span className="text-black font-bold">OEM_MANUAL_P7_REV4.PDF</span>
                        <span className="text-black/60 text-[10.5px]">PAGE 114, TABLE 4.2</span>
                      </div>
                      <span className="text-[#028090] font-bold hover:underline cursor-pointer text-[11px]">
                        VERIFY →
                      </span>
                    </div>

                    <div className="p-2.5 bg-[#FAFAF7] border border-black/20 text-[10.5px] font-mono text-black/70 font-semibold flex items-center justify-between">
                      <span>AUDIT HASH: #4F89-A281</span>
                      <span className="text-black font-bold">ZERO HALLUCINATIONS</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-black/20 flex items-center justify-between text-xs font-mono">
                <span className="text-black/70 font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#19CDB8]" />
                  REAL-TIME INDUSTRIAL RETRIEVAL
                </span>
                <span className="text-black font-bold">{current.tag}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
