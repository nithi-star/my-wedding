import { bibleVerse } from "@/lib/config";

export function BibleVerse() {
  return (
    <section className="px-6 py-28 bg-[#F4EFE6] text-ink text-center relative overflow-hidden z-10">
      {/* Decorative leaf watermarks background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg className="w-[300px] h-[300px] text-luxury-gold/20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 8C8 10 9 20 9 20s9-2 10-12zm-8 8c-2-2-7-1-7-1s3 4 5 4 2-3 2-3z" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 px-4">
        {/* Ornate Gold Latin Holy Cross above scripture */}
        <div className="text-gold drop-shadow-[0_0_4px_rgba(176,141,87,0.25)] w-8 h-8 mx-auto mb-4 select-none pointer-events-none">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8h-6V3c0-.55-.45-1-1-1s-1 .45-1 1v5H5c-.55 0-1 .45-1 1s.45 1 1 1h6v11c0 .55.45 1 1 1s1-.45 1-1V10h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>

        {/* Shimmer gold line */}
        <span className="inline-block w-12 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent mb-8"></span>
        
        <blockquote className="font-display italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-ink font-light tracking-wide">
          “{bibleVerse.quote}”
        </blockquote>
        
        <cite className="font-body text-xs tracking-[0.25em] uppercase text-gold mt-8 block not-italic font-semibold">
          — {bibleVerse.reference}
        </cite>
        
        <span className="inline-block w-12 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent mt-8"></span>
      </div>
    </section>
  );
}
