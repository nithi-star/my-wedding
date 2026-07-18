"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  style: React.CSSProperties;
}

export function SparkleOverlay() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    function handleGlobalClick(e: MouseEvent | TouchEvent) {
      // Skip click handlers if clicking links or button elements to preserve focus
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea")) {
        return;
      }

      let clickX = 0;
      let clickY = 0;

      if (window.TouchEvent && e instanceof TouchEvent) {
        if (e.touches.length === 0) return;
        clickX = e.touches[0].clientX;
        clickY = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        clickX = e.clientX;
        clickY = e.clientY;
      } else {
        return;
      }

      // Generate 7 procedural scattering gold sparkles
      const newSparkles = Array.from({ length: 7 }).map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50 + 25; // scatters 25px - 75px
        const dx = `${Math.cos(angle) * distance}px`;
        const dy = `${Math.sin(angle) * distance}px`;

        return {
          id: Date.now() + i + Math.random(),
          x: clickX,
          y: clickY,
          style: {
            "--dx": dx,
            "--dy": dy,
          } as React.CSSProperties,
        };
      });

      setSparkles((prev) => [...prev, ...newSparkles]);
    }

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("touchstart", handleGlobalClick, { passive: true });

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("touchstart", handleGlobalClick);
    };
  }, []);

  // Proactive cleanup of expired particles to keep the DOM clean
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      const now = Date.now();
      setSparkles((prev) => prev.filter((s) => now - s.id < 900));
    }, 1000);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {sparkles.map((s) => (
        <svg
          key={s.id}
          className="sparkle-particle text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            ...s.style,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Four-point elegant gold star */}
          <path d="M12 0l2.5 9.5 9.5 2.5-9.5 2.5-2.5 9.5-2.5-9.5-9.5-2.5 9.5-2.5z" />
        </svg>
      ))}
    </div>
  );
}
