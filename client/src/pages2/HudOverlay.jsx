/**
 * Faint blueprint grid + a single slow scanning line. This is the
 * "the system is reading the plant" cue — kept subtle (low opacity,
 * slow movement) so it reads as instrumentation, not sci-fi decor.
 */
export default function HudOverlay({ opacity = 1, style }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="hudGrid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#00C9A7"
              strokeWidth="0.5"
              opacity="0.12"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hudGrid)" />
      </svg>

      {/* Slow vertical scan line */}
      <div className="hud-scanline absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-teal/10 to-transparent" />

      {/* Corner brackets — mission-control framing detail */}
      <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-teal/30" />
      <div className="absolute top-8 right-8 w-10 h-10 border-r border-t border-teal/30" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-l border-b border-teal/30" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-teal/30" />

      <style>{`
        .hud-scanline {
          animation: scanMove 9s ease-in-out infinite;
        }
        @keyframes scanMove {
          0%   { top: -10%; }
          50%  { top: 100%; }
          100% { top: -10%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hud-scanline { animation: none; display: none; }
        }
      `}</style>
    </div>
  );
}
