"use client";

import { useEffect, useState } from "react";
import { couple, event } from "@/lib/config";

function getRemaining() {
  const total = new Date(event.dateISO).getTime() - Date.now();
  const clamped = Math.max(total, 0);
  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function LuxuryHero() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const isCompleted = remaining ? remaining.total === 0 : false;

  return (
    <section className="min-h-[100vh] w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-20 relative z-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-fade-up">

        {/* Ornate Gold Latin Holy Cross replacing leaf sprout */}
        <div className="text-luxury-gold drop-shadow-[0_0_4px_rgba(176,141,87,0.3)] w-10 h-10 mb-6 select-none pointer-events-none">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8h-6V3c0-.55-.45-1-1-1s-1 .45-1 1v5H5c-.55 0-1 .45-1 1s.45 1 1 1h6v11c0 .55.45 1 1 1s1-.45 1-1V10h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>

        {/* Luxury Top Header */}
        <p className="gold-shimmer-text font-body text-xs sm:text-sm tracking-[0.35em] uppercase mb-3 font-semibold">
          A Date With Destiny
        </p>
        <p className="font-display italic text-xs sm:text-base text-ink-soft mb-10 tracking-wider">
          Two Hearts. One Beautiful Day.
        </p>

        {/* Couple names in grand charcoal font - scaled down on mobile for proper centering */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.2] text-ink font-light tracking-wide italic px-2">
          {couple.partnerA}
          <div className="block font-body text-lg sm:text-2xl tracking-[0.2em] uppercase text-gold my-3 sm:my-4 not-italic">
            &amp;
          </div>
          {couple.partnerB}
        </h1>

        <span className="divider-sprig max-w-[220px] my-8 sm:my-10" />

        {/* Date Display */}
        <p className="font-display italic text-lg sm:text-2xl text-gold font-medium tracking-wide">
          {event.dateDisplay}
        </p>
        <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-ink-soft mt-3 font-medium">
          {event.city}
        </p>

        {/* Elegant Countdown Counter - resized on mobile to prevent overflow/off-centering */}
        <div className="mt-14 w-full px-2">
          {remaining && !isCompleted ? (
            <div className="flex justify-center gap-2 sm:gap-5 max-w-full">
              {[
                { label: "Days", value: remaining.days },
                { label: "Hours", value: remaining.hours },
                { label: "Minutes", value: remaining.minutes },
                { label: "Seconds", value: remaining.seconds },
              ].map((u) => (
                <div
                  key={u.label}
                  className="flex flex-col items-center justify-center w-16 sm:w-24 p-2.5 sm:p-4 rounded-sm border border-luxury-gold/30 bg-[#F0EAE1]/70 backdrop-blur-md shadow-[0_8px_30px_-15px_rgba(43,42,40,0.06)] hover:border-luxury-gold/50 transition-colors duration-300"
                >
                  <span className="font-display text-xl sm:text-4xl text-ink tracking-wide tabular-nums font-light">
                    {String(u.value).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[8px] sm:text-[10px] tracking-wider uppercase text-ink-soft mt-1 sm:mt-2">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          ) : isCompleted ? (
            <p className="font-display italic text-base sm:text-lg text-ink-soft">
              The day has arrived — see you at the sanctuary.
            </p>
          ) : (
            <div className="h-16" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
