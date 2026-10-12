/**
 * The factory foreground layer — an SVG silhouette so the project ships
 * standalone with no external image assets. Drawn in flat steel-blue
 * tones with a couple of warm amber "working lights" for life.
 *
 * In production you'd likely swap this <svg> for a photographed or
 * rendered transparent PNG/WebP per the original brief — the component
 * boundary (FactorySilhouette) stays the same either way, so that swap
 * is a one-file change.
 */
export default function FactorySilhouette({ style }) {
  return (
    <svg
      viewBox="0 0 1600 500"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 w-full h-full"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stackGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2F45" />
          <stop offset="100%" stopColor="#0D2238" />
        </linearGradient>
      </defs>

      {/* Ground structure */}
      <rect x="0" y="420" width="1600" height="80" fill="#0D2238" />

      {/* Main plant building */}
      <rect x="150" y="300" width="520" height="130" fill="url(#stackGradient)" />
      <rect x="150" y="300" width="520" height="6" fill="#3E5C76" opacity="0.5" />

      {/* Grid of small windows — working lights, amber used sparingly */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={i}
          x={175 + i * 48}
          y="330"
          width="18"
          height="24"
          fill={i % 4 === 0 ? '#F2A65A' : '#24374D'}
          opacity={i % 4 === 0 ? 0.85 : 0.6}
        />
      ))}

      {/* Smoke stacks */}
      <rect x="230" y="150" width="28" height="160" fill="#24374D" />
      <rect x="300" y="110" width="34" height="200" fill="#1A2F45" />
      <rect x="380" y="180" width="24" height="130" fill="#24374D" />

      {/* Stack rings (industrial detail) */}
      <rect x="226" y="160" width="36" height="5" fill="#3E5C76" />
      <rect x="296" y="130" width="42" height="5" fill="#3E5C76" />

      {/* Secondary structure / tanks */}
      <ellipse cx="820" cy="360" rx="70" ry="18" fill="#1A2F45" />
      <rect x="750" y="280" width="140" height="80" fill="#1A2F45" />
      <ellipse cx="820" cy="280" rx="70" ry="18" fill="#24374D" />

      <ellipse cx="960" cy="375" rx="50" ry="14" fill="#0D2238" />
      <rect x="910" y="310" width="100" height="65" fill="#162A3E" />
      <ellipse cx="960" cy="310" rx="50" ry="14" fill="#1A2F45" />

      {/* Pipe network connecting structures */}
      <path
        d="M 670 350 L 750 350 L 750 320 L 910 320"
        stroke="#3E5C76"
        strokeWidth="6"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 400 310 L 400 260 L 560 260 L 560 300"
        stroke="#3E5C76"
        strokeWidth="5"
        fill="none"
        opacity="0.5"
      />

      {/* Right-side secondary building block */}
      <rect x="1080" y="320" width="380" height="110" fill="url(#stackGradient)" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={`r${i}`}
          x={1105 + i * 48}
          y="345"
          width="16"
          height="20"
          fill={i % 5 === 0 ? '#00C9A7' : '#24374D'}
          opacity={i % 5 === 0 ? 0.7 : 0.55}
        />
      ))}

      {/* Crane / structural lattice accent, far right */}
      <line x1="1420" y1="430" x2="1420" y2="180" stroke="#24374D" strokeWidth="6" />
      <line x1="1420" y1="190" x2="1540" y2="220" stroke="#24374D" strokeWidth="6" />
      <line x1="1420" y1="230" x2="1510" y2="230" stroke="#3E5C76" strokeWidth="3" opacity="0.5" />
    </svg>
  );
}
