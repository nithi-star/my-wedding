"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  r: number; // size
  d: number; // weight/fall speed factor
  swing: number; // swing offset
  swingSpeed: number;
  rotation: number;
  rotationSpeed: number;
  type: "petal" | "gold";
  color: string;
}

export function EnchantedCanvas({ className = "z-0" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Adjust canvas dimension on viewport resize
    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    // Generate 35 particles (mix of rose petals and gold leaf flakes)
    const maxParticles = 35;
    const particles: Petal[] = [];
    const petalColors = ["rgba(244, 239, 230, 0.35)", "rgba(224, 166, 174, 0.22)", "rgba(240, 218, 222, 0.3)"]; // Ivory & light rose pink
    const goldColors = ["rgba(212, 175, 55, 0.4)", "rgba(244, 208, 104, 0.3)", "rgba(176, 141, 87, 0.25)"];

    for (let i = 0; i < maxParticles; i++) {
      const isGold = Math.random() > 0.55; // 55% petals, 45% gold flakes
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 5 + (isGold ? 1.5 : 5.5), // gold flakes are smaller, petals are larger
        d: Math.random() * 0.55 + 0.3, // weight factor
        swing: Math.random() * 2 * Math.PI,
        swingSpeed: Math.random() * 0.012 + 0.004,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        type: isGold ? "gold" : "petal",
        color: isGold
          ? goldColors[Math.floor(Math.random() * goldColors.length)]
          : petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Scroll parallax bindings
    let scrollY = 0;
    function handleScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Paint loop
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        
        ctx.save();
        
        // Scroll parallax: offsets particle coordinate calculations slightly relative to scroll height
        const parallaxY = p.y - scrollY * p.d * 0.22;
        
        // Wrap screen bounds
        let drawY = parallaxY % (height + 40);
        if (drawY < -20) drawY += (height + 40);
        
        // Sinusoidal wind sway
        p.swing += p.swingSpeed;
        const drawX = p.x + Math.sin(p.swing) * (p.type === "petal" ? 22 : 8);

        ctx.translate(drawX, drawY);
        ctx.rotate((p.rotation * Math.PI) / 180);
        p.rotation += p.rotationSpeed;

        if (p.type === "petal") {
          // Draw a stylized soft organic petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.3, p.r * 0.9, 0, 0, 2 * Math.PI);
          ctx.fillStyle = p.color;
          ctx.fill();
          
          // Soft leaf vein details
          ctx.beginPath();
          ctx.moveTo(-p.r * 1.1, 0);
          ctx.lineTo(p.r * 1.1, 0);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          // Draw diamond gold leaf flakes
          ctx.beginPath();
          ctx.moveTo(0, -p.r);
          ctx.lineTo(p.r * 0.85, 0);
          ctx.lineTo(0, p.r);
          ctx.lineTo(-p.r * 0.85, 0);
          ctx.closePath();
          ctx.fillStyle = p.color;
          
          // Golden glow
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(244, 208, 104, 0.25)";
          ctx.fill();
        }

        ctx.restore();

        // Increment gravity fall coordinates
        p.y += p.d * 0.8 + 0.3;
        
        // Wrap if drifting off scrolling virtual canvas bounds
        if (p.y > height + 20 + scrollY * p.d * 0.22) {
          p.y = -20 + scrollY * p.d * 0.22;
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none block w-full h-full ${className}`}
    />
  );
}
