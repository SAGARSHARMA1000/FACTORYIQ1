import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMouseParallax } from '../hooks/useScrollProgress.js';
import FactorySilhouette from './FactorySilhouette.jsx';
import HudOverlay from './HudOverlay.jsx';
import AiHudCards from './AiHudCards.jsx';
import DataParticleField from './DataParticleField.jsx';

gsap.registerPlugin(ScrollTrigger);

/**
 * The scroll-driven "Factory → Data → Knowledge → Intelligence" story.
 *
 * Structure: one tall pinned section (400vh of scroll distance) with
 * 5 absolutely-positioned layers inside, each moving at its own rate
 * via GSAP ScrollTrigger scrub (not CSS scroll-linked transforms —
 * scrub gives us easing control and precise checkpoints at 0/25/50/75/100%).
 *
 * Movement is intentionally subtle throughout — per the brief, this
 * should feel like Apple/Tesla/mission-control, not a gaming site.
 * Max translation distances stay under ~120px and opacity/blur carry
 * most of the storytelling instead of large position jumps.
 */
export default function ScrollStoryHero() {
  const sectionRef = useRef(null);
  const skyRef = useRef(null);
  const factoryRef = useRef(null);
  const hudRef = useRef(null);
  const aiLayerRef = useRef(null);
  const contentRef = useRef(null);
  const particleWrapRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [reduceMotion, setReduceMotion] = useState(false);
  const mouse = useMouseParallax(1);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mql.matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined; // skip the whole scroll story; static hero shows instead

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // LAYER 1 — Sky/void: slowest, barely drifts, slight dim as we descend
      tl.to(skyRef.current, { yPercent: 6, opacity: 0.55, ease: 'none' }, 0);

      // LAYER 2 — Factory: moves up gently, scales in slightly — "camera approaches"
      tl.to(
        factoryRef.current,
        { yPercent: -10, scale: 1.08, ease: 'none' },
        0
      );

      // LAYER 3 — HUD grid/scan: fades in from 20%, most visible mid-scroll
      tl.fromTo(
        hudRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.15
      );
      tl.to(hudRef.current, { opacity: 0.35, ease: 'none' }, 0.8);

      // Particle field wrapper — fades up alongside HUD, drifts opposite factory
      tl.fromTo(
        particleWrapRef.current,
        { opacity: 0, yPercent: 4 },
        { opacity: 1, yPercent: -6, ease: 'none' },
        0.2
      );

      // LAYER 4 — AI HUD cards: appear once "data streams" phase begins (~45%)
      tl.fromTo(
        aiLayerRef.current,
        { opacity: 0, yPercent: 8 },
        { opacity: 1, yPercent: -4, ease: 'none' },
        0.42
      );

      // LAYER 5 — Headline content: stays legible/stable, very slight settle
      tl.fromTo(
        contentRef.current,
        { yPercent: 2 },
        { yPercent: -2, ease: 'none' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  if (reduceMotion) {
    // Static, accessible fallback — same content, no scroll-pinned animation
    return (
      <section  className="relative min-h-screen w-full overflow-hidden bg-navydeep flex flex-col items-center justify-center text-center px-6">
        <FactorySilhouette style={{ opacity: 0.6 }} />
        <HudOverlay opacity={0.25} />
        <div className="relative z-10">
          {/* <p className="text-[11px] font-medium tracking-wide text-teal/80 mb-5">
            Industrial Knowledge Intelligence
          </p> */}
          <h1 className="text-[clamp(2.3rem,6vw,5rem)] font-semibold tracking-tightest leading-[1.04] text-white max-w-4xl">
            Every machine.
            <br />
            Every docum.
            <br />
            <span className="text-teal">One intelligent layer.</span>
          </h1>
          {/* <p className="mt-6 max-w-lg mx-auto text-[15px] text-inkdim leading-relaxed">
            FactoryIQ reads your plant's documents, drawings, and records — so
            your team can just ask, instead of searching.
          </p> */}
          <div className="mt-9 flex items-center justify-center gap-4">
            <a
              href="/app"
              className="bg-teal text-navy text-sm font-medium px-6 py-3 rounded-md hover:bg-teal/90 transition-colors"
            >
              Try the live demo
            </a>
            <a href="#how-it-works" className="text-sm text-inkdim hover:text-white transition-colors px-2">
              See how it works
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
     id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-navydeep"
    >
      {/* LAYER 1 — Sky / void gradient */}
      <div
        ref={skyRef}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, #0D2238 0%, #060D18 60%, #040810 100%)',
        }}
        aria-hidden="true"
      >
        {/* faint stars */}
        <div className="stars absolute inset-0 opacity-40" />
      </div>

      {/* LAYER 2 — Factory silhouette */}
      <div ref={factoryRef} className="absolute inset-0">
        <FactorySilhouette
          style={{
            transform: `translate3d(${mouse.x * -14}px, ${mouse.y * -6}px, 0)`,
          }}
        />
      </div>

      {/* LAYER 3 — HUD grid + scanline + particle field */}
      <div ref={hudRef} className="absolute inset-0 opacity-0">
        <HudOverlay />
      </div>
      <div ref={particleWrapRef} className="absolute inset-0 opacity-0">
        <div
          style={{ transform: `translate3d(${mouse.x * 10}px, 0, 0)`, position: 'absolute', inset: 0 }}
        >
          <DataParticleField scrollProgressRef={scrollProgressRef} mouse={mouse} />
        </div>
      </div>

      {/* LAYER 4 — Floating AI HUD cards */}
      <div ref={aiLayerRef} className="absolute inset-0 opacity-0">
        <AiHudCards mouse={mouse} />
      </div>

      {/* LAYER 5 — Stable headline content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* <p className="text-[11px] font-medium tracking-wide text-teal/80 mb-5">
          Industrial Knowledge Intelligence
        </p> */}
        <h1 className="text-[clamp(2.3rem,6vw,5rem)] font-semibold tracking-tightest leading-[1.04] text-white max-w-4xl">
          Every machine.
          <br />
          Every document.
          <br />
          <span className="text-teal">One intelligent layer.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[15px] text-inkdim leading-relaxed">
          FactoryIQ reads your plant's documents, drawings, and records — so your
          team can just ask, instead of searching.
        </p>
        {/* <div className="mt-9 flex items-center gap-4">
          <a
            href="/app"
            className="bg-teal text-navy text-sm font-medium px-6 py-3 rounded-md hover:bg-teal/90 transition-colors"
          >
            Try the live demo
          </a> */}
          {/* <a
            href="#how-it-works"
            className="text-sm text-inkdim hover:text-white transition-colors px-2"
          >
            See how it works
          </a> */}
        {/* </div> */}

        {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-inkdim/60 text-[11px] flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-inkdim/60 to-transparent" />
        </div> */}
          
<div className="absolute bottom-5 sm:bottom-7 left-1/2
                  -translate-x-1/2 z-20">
    <button
      type="button"
      onClick={() => {
        document
          .getElementById("how-it-works")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className="group flex flex-col items-center gap-2
                 rounded-full px-4 py-2
                 transition-opacity duration-300
                 hover:opacity-100"
      aria-label="Scroll to how it works"
    >
      <span className="text-[9px] sm:text-[10px]
                       uppercase tracking-[0.28em]
                       text-inkdim/60 transition-colors
                       group-hover:text-teal">
        Scroll to explore
      </span>

      <span className="relative flex h-9 w-6 justify-center
                       overflow-hidden rounded-full
                       border border-inkdim/30
                       transition-all duration-300
                       group-hover:border-teal/70
                       group-hover:shadow-[0_0_18px_rgba(40,220,200,0.12)]">
        <span className="mt-2 h-2 w-[3px] rounded-full
                         bg-teal animate-scroll-wheel" />
      </span>

      <span className="h-4 w-px overflow-hidden bg-inkdim/10">
        <span className="block h-full w-full origin-top
                         bg-gradient-to-b from-teal to-transparent
                         animate-scroll-beam" />
      </span>
    </button>
  </div>
      </div>

       <style>{`
        .stars {
          background-image:
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 120px 80px, white, transparent),
            radial-gradient(2px 2px at 220px 40px, white, transparent),
            radial-gradient(2px 2px at 320px 120px, white, transparent),
            radial-gradient(2px 2px at 420px 60px, white, transparent),
            radial-gradient(2px 2px at 540px 100px, white, transparent),
            radial-gradient(2px 2px at 680px 30px, white, transparent),
            radial-gradient(2px 2px at 780px 90px, white, transparent);
          background-repeat: repeat;
          background-size: 800px 200px;
        }
      `}</style> 
         {/* <style>{`
  .stars {
    background-image:
      radial-gradient(4px 4px at 20px 30px, white, transparent),
      radial-gradient(4px 4px at 120px 80px, white, transparent),
      radial-gradient(4px 4px at 220px 40px, white, transparent),
      radial-gradient(4px 4px at 320px 120px, white, transparent),
      radial-gradient(4px 4px at 420px 60px, white, transparent),
      radial-gradient(4px 4px at 540px 100px, white, transparent),
      radial-gradient(4px 4px at 680px 30px, white, transparent),
      radial-gradient(4px 4px at 780px 90px, white, transparent),
      radial-gradient(4px 4px at 50px 150px, white, transparent),
      radial-gradient(4px 4px at 200px 180px, white, transparent),
      radial-gradient(4px 4px at 350px 160px, white, transparent),
      radial-gradient(4px 4px at 600px 140px, white, transparent),
      radial-gradient(4px 4px at 750px 170px, white, transparent);
    background-repeat: repeat;
    background-size: 800px 200px;
  }
`}</style> */}

    </section>
  );
}
