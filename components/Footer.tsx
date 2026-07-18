import { couple } from "@/lib/config";

export function Footer() {
  return (
    <footer className="px-6 py-24 text-center border-t border-luxury-gold/10 bg-[#FAF8F5] relative z-10">
      {/* Ornate Gold Latin Holy Cross */}
      <div className="text-gold drop-shadow-[0_0_4px_rgba(176,141,87,0.3)] w-8 h-8 mx-auto mb-6 select-none pointer-events-none">
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 8h-6V3c0-.55-.45-1-1-1s-1 .45-1 1v5H5c-.55 0-1 .45-1 1s.45 1 1 1h6v11c0 .55.45 1 1 1s1-.45 1-1V10h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
        </svg>
      </div>

      <p className="font-display italic text-2xl text-ink font-light">
        {couple.partnerA} &amp; {couple.partnerB}
      </p>
      <p className="font-body text-[10px] tracking-wider2 uppercase text-gold mt-4">
        September 13, 2026
      </p>
      <p className="font-body text-[10px] tracking-wider2 uppercase text-ink-soft/40 mt-12">
        {couple.hashtag}
      </p>
    </footer>
  );
}
