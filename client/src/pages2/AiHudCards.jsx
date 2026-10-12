import { Activity, CircleCheck } from 'lucide-react';

/**
 * The floating "AI layer" HUD cards — a live-looking equipment status
 * card and an AI confidence readout. These are the elements that sell
 * "this system is actively reading the plant," so they get the only
 * glow/motion treatment on the page beyond the hero's scroll story.
 */
export default function AiHudCards({ style, mouse }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={style}
    >
      {/* Equipment status card — upper right */}
      <div
        className="absolute top-[18%] right-[8%] md:right-[12%] w-56 rounded-lg border border-teal/30 bg-navymid/70 backdrop-blur-sm px-4 py-3 shadow-[0_0_30px_-10px_rgba(0,201,167,0.35)]"
        style={{
          transform: `translate3d(${mouse.x * -10}px, ${mouse.y * -8}px, 0)`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          <span className="text-xs font-medium text-ink tracking-wide">PUMP-07</span>
        </div>
        <p className="text-[11px] text-inkdim">Operational</p>
        <p className="text-[11px] text-inkdim">Last service: Aug 14</p>
      </div>

      {/* AI confidence readout — lower left, connects visually downward */}
      <div
        className="absolute bottom-[26%] left-[8%] md:left-[14%] w-48 rounded-lg border border-tealDim/40 bg-navymid/70 backdrop-blur-sm px-4 py-3"
        style={{
          transform: `translate3d(${mouse.x * 8}px, ${mouse.y * 6}px, 0)`,
        }}
      >
        <div className="flex items-center gap-2 mb-1.5 text-teal">
          <Activity size={13} />
          <span className="text-[10px] font-medium tracking-wide text-inkdim">
            AI KNOWLEDGE CORE
          </span>
        </div>
        <p className="text-2xl font-semibold text-white tabular-nums">98.4%</p>
        <p className="text-[11px] text-inkdim mt-0.5">Document coverage</p>
      </div>

      {/* Small confirmation chip, upper-left, appears as a quieter third point */}
      <div
        className="absolute top-[34%] left-[6%] md:left-[10%] flex items-center gap-1.5 rounded-full border border-steel/40 bg-navymid/60 backdrop-blur-sm px-3 py-1.5"
        style={{
          transform: `translate3d(${mouse.x * -6}px, ${mouse.y * 10}px, 0)`,
        }}
      >
        <CircleCheck size={12} className="text-teal" />
        <span className="text-[10px] text-inkdim">1,204 documents indexed</span>
      </div>
    </div>
  );
}
