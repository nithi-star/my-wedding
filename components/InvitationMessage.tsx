import { parents, contact } from "@/lib/config";

export function InvitationMessage() {
  return (
    <section className="px-6 py-24 max-w-4xl mx-auto text-center relative z-10">
      {/* Decorative corner framing in gold */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-luxury-gold/30 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-luxury-gold/30 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-luxury-gold/30 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-luxury-gold/30 rounded-br-sm pointer-events-none" />

      <div className="gold-shimmer-border p-8 sm:p-14 rounded-sm shadow-[0_15px_40px_-20px_rgba(43,42,40,0.06)]">
        {/* Ornate Gold Latin Holy Cross replacing generic circular SVG */}
        <div className="text-luxury-gold drop-shadow-[0_0_4px_rgba(176,141,87,0.3)] w-10 h-10 mx-auto mb-8 select-none pointer-events-none">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8h-6V3c0-.55-.45-1-1-1s-1 .45-1 1v5H5c-.55 0-1 .45-1 1s.45 1 1 1h6v11c0 .55.45 1 1 1s1-.45 1-1V10h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>

        <p className="font-body text-xs tracking-wider2 uppercase text-gold mb-6 font-semibold">
          In Divine Love
        </p>

        <p className="font-display italic text-xl sm:text-2xl text-ink mb-10 leading-relaxed max-w-2xl mx-auto font-light">
          With immense joy and gratitude to Almighty God,
        </p>

        <div className="my-10">
          <h3 className="font-display text-2xl sm:text-3xl text-gold font-light tracking-wide">
            {parents.bride}
          </h3>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mt-4 max-w-lg mx-auto leading-relaxed">
            request the honour of your gracious presence at the wedding of their beloved daughter
          </p>
        </div>

        <div className="my-12 flex flex-col items-center justify-center gap-2">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink italic font-medium tracking-wide">
            Nithisha
          </h2>
          <span className="font-body text-[10px] tracking-[0.3em] text-gold/60 uppercase my-3 font-semibold">
            With
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink italic font-medium tracking-wide">
            Antony Vivek
          </h2>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-ink-soft mt-4">
            Beloved Son of
          </p>
          <h3 className="font-display text-2xl sm:text-3xl text-gold font-light tracking-wide mt-3">
            {parents.groom}
          </h3>
        </div>

        <div className="divider-sprig max-w-[200px] mx-auto my-10" />

        <p className="font-display italic text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto">
          {contact.note}
        </p>
      </div>
    </section>
  );
}
