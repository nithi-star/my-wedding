"use client";

import { useEffect, useState } from "react";
import { EnchantedCanvas } from "@/components/EnchantedCanvas";
import { couple } from "@/lib/config";

export function LuxuryLanding({ onReveal }: { onReveal?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [guestName, setGuestName] = useState("Family & Friends");

  // Hydration-safe guest name retrieval from query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || params.get("name") || params.get("guest");
    if (to) {
      setGuestName(to);
    }
  }, []);

  function handleReveal() {
    if (revealed) return;
    setRevealed(true);
    onReveal?.();
    window.setTimeout(() => setDismissed(true), 1200);
  }

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5] transition-all duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${revealed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* Background Falling Petals Canvas */}
      <EnchantedCanvas className="z-10" />

      {/* Centered Invitation Greeting Card */}
      <div className="relative z-20 w-[90%] max-w-[430px] bg-[#F0EAE1]/95 backdrop-blur-md rounded-2xl shadow-[0_25px_60px_rgba(176,141,87,0.18)] border border-luxury-gold/25 pt-12 pb-10 px-8 sm:px-10 flex flex-col items-center justify-center text-center animate-[rise-fade_1s_cubic-bezier(0.22,1,0.36,1)_both]">
        {/* Circular heart badge offset at the top */}
        <div className="heart-badge-custom transition-transform duration-500 hover:scale-105">
          <svg className="w-5 h-5 text-[#FAF8F5] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Groom & Bride Names */}
        <div className="font-display italic text-5xl sm:text-6xl md:text-7xl text-[#2E3A2C] font-light mt-4 tracking-wide leading-tight select-none z-20">
          {couple.partnerA}
          <div className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B08D57] my-1.5 not-italic font-semibold">&amp;</div>
          {couple.partnerB}
        </div>

        {/* Separator leaf line */}
        <div className="flex items-center justify-center my-4 w-full opacity-70 z-20 select-none pointer-events-none">
          <div className="h-[0.75px] w-14 bg-[#B08D57]/45" />
          <svg className="w-5 h-5 text-[#B08D57] mx-2.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8c.98 0 1.86.3 2.6.8-.76-2.2-2.6-3.8-4.9-3.8-3.1 0-5.7 2.6-5.7 5.7 0 .9.2 1.7.5 2.5C7.9 12.3 6.1 10.7 3.8 10.7c-.5 0-1 .1-1.5.2.7 2.1 2.5 3.7 4.7 3.7 3.1 0 5.7-2.6 5.7-5.7 0-.9-.2-1.7-.5-2.5 1.6.9 3.4 1.6 4.8 1.6z" />
          </svg>
          <div className="h-[0.75px] w-14 bg-[#B08D57]/45" />
        </div>

        {/* Invitation Text / Dynamic Guest box */}
        <div className="flex flex-col items-center w-full z-20">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ink-soft mb-3 font-semibold select-none">
            You're Invited
          </p>
          <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ink-soft mb-3 font-semibold select-none">
            to join us on our wedding day
          </p>
        </div>

        {/* CTA Open Invitation Button - Reverted to Gold Shimmer Style */}
        <button
          onClick={handleReveal}
          className="gold-shimmer-border px-10 py-3.5 rounded-sm bg-[#FAF8F5] font-body text-xs tracking-[0.25em] uppercase text-[#B08D57] hover:text-ink transition-colors duration-500 shadow-[0_4px_25px_rgba(43,42,40,0.08)] relative group overflow-hidden mt-4 active:scale-[0.98] z-20"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FAF8F5]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out" />
          Open Invitation
        </button>
      </div>
    </div>
  );
}
