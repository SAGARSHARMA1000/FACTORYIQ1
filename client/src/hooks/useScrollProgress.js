import { useEffect, useState, useRef } from 'react';

/**
 * Tracks scroll progress (0 → 1) through a target element's own height,
 * not the whole page. Used to drive the hero's layered parallax story:
 * 0   = top of hero, factory seen from a distance
 * 1   = bottom of hero, transitioned into the dashboard preview
 *
 * We read rAF-throttled scroll position rather than attaching heavy
 * listeners per-layer — one hook, one listener, shared progress value.
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          const scrolled = -rect.top;
          const pct = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
          setProgress(pct);
        }
        ticking.current = false;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}

/**
 * Tracks normalized mouse position (-1 → 1 on each axis, 0 = center)
 * relative to the viewport, for the subtle cursor-parallax tilt effect.
 * Smoothed with simple lerp so layers drift rather than snap.
 */
export function useMouseParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      target.current = {
        x: ((e.clientX / window.innerWidth) * 2 - 1) * strength,
        y: ((e.clientY / window.innerHeight) * 2 - 1) * strength,
      };
    }

    function tick() {
      setPos((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.06,
        y: prev.y + (target.current.y - prev.y) * 0.06,
      }));
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return pos;
}
