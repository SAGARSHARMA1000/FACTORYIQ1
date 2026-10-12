
import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = mouseX;
    let currentY = mouseY;
    let frameId;

    const interactiveSelector =
      "h1, a, button, [role='button'], input, textarea, select, [data-cursor-magnetic]";

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const target = event.target.closest(interactiveSelector);

      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Subtle magnetic pull toward the hovered element
        mouseX += (centerX - mouseX) * 0.12;
        mouseY += (centerY - mouseY) * 0.12;
      }
    };

    const handleOver = (event) => {
      setActive(Boolean(event.target.closest(interactiveSelector)));
    };

    const handleOut = (event) => {
      if (
        event.relatedTarget &&
        event.target.contains(event.relatedTarget)
      ) {
        return;
      }

      setActive(
        Boolean(event.relatedTarget?.closest?.(interactiveSelector))
      );
    };

    const animate = () => {
      // Smooth, frame-rate-independent-feeling follow
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`magnetic-cursor ${active ? "is-active" : ""}`}
    />
  );
}
