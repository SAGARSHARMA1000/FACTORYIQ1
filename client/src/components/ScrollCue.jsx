import { useEffect, useState } from "react";

export default function ScrollCue({ target }) {
  const [hidden, setHidden] = useState(false);

  // Fade the cue out once the visitor has started scrolling
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () =>
    window.scrollTo({
      top: target ?? window.innerHeight,
      behavior: "smooth",
    });

  return (
    <>
      <style>{`
        /* Light pulse travelling down the rail, like a part moving on a line */
        @keyframes sc-travel {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(260%); opacity: 0; }
        }
        /* Soft breathing of the label so the eye lands on it */
        @keyframes sc-breathe {
          0%, 100% { opacity: .55; }
          50%      { opacity: 1; }
        }
        /* Single entrance after the hero settles */
        @keyframes sc-enter {
          from { opacity: 0; transform: translate(-50%, 14px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .sc-root {
          animation: sc-enter .9s cubic-bezier(.2,.7,.2,1) 1.6s both;
          transition: opacity .4s ease;
        }
        .sc-label { animation: sc-breathe 2.8s ease-in-out infinite; }
        .sc-pulse { animation: sc-travel 2.2s cubic-bezier(.55,0,.3,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sc-root, .sc-label, .sc-pulse { animation: none !important; }
          .sc-root { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <button
        type="button"
        onClick={go}
        aria-label="Scroll down to explore"
        tabIndex={hidden ? -1 : 0}
        className={`sc-root group absolute bottom-3 left-1/2 z-20 flex flex-col items-center gap-3
                    text-inkdim focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-white/40 rounded-md px-3 py-2
                    ${hidden ? "opacity-0 pointer-events-none" : ""}`}
      >
        <span className="sc-label text-[12px] tracking-wide transition-colors group-hover:text-white font-mono">
          Scroll to explore
        </span>

        {/* Rail + travelling pulse */}
        <span className="relative block h-14 w-px overflow-hidden bg-white/15">
          <span
            className="sc-pulse absolute left-0 top-0 block h-5 w-px
                       bg-gradient-to-b from-transparent via-white to-transparent"
          />
        </span>

        {/* Node at the end of the rail, like a station on the line */}
        <span className="block h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_10px_2px_rgba(255,255,255,.35)]" />
      </button>
    </>
  );
}
