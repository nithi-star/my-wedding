import { schedule } from "@/lib/config";

export function EventDetails() {
  // Calendar event links (for Sunday, Sept 13, 2026)
  const calendarLinks = [
    // Ceremony: Sept 13, 2026 7:30 AM - 9:00 AM IST (UTC: 2:00 AM - 3:30 AM)
    "https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding+Ceremony:+Nithisha+%26+Antony+Vivek&dates=20260913T020000Z/20260913T033000Z&details=Wedding+Ceremony+at+St.+Athisaya+Arockia+Annai+Church,+Adaikalapuram.+Please+arrive+by+7:15+AM.&location=St.+Athisaya+Arockia+Annai+Church,+Adaikalapuram&sf=true&output=xml",
    // Reception: Sept 13, 2026 9:00 AM - 1:00 PM IST (UTC: 3:30 AM - 7:30 AM)
    "https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception:+Nithisha+%26+Antony+Vivek&dates=20260913T033000Z/20260913T073000Z&details=Wedding+Reception+at+AJR+Hall,+Adaikalapuram.+Immediately+following+the+Ceremony.&location=AJR+Hall,+Tiruchendur+Road,+Adaikalapuram&sf=true&output=xml"
  ];

  return (
    <section className="px-6 py-24 relative z-10 animate-fade-up">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-xs tracking-wider2 uppercase text-luxury-gold mb-4 text-center">
          The Celebration
        </p>
        <h2 className="font-display italic text-3xl sm:text-4xl text-ink text-center mb-16 font-light">
          Where to be, and when
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {schedule.map((item, i) => (
            <div
              key={item.label}
              className="bg-luxury-card border border-luxury-gold/30 backdrop-blur-md p-8 sm:p-10 rounded-sm relative flex flex-col justify-between shadow-[0_15px_45px_-20px_rgba(43,42,40,0.06)] hover:shadow-[0_20px_50px_-20px_rgba(176,141,87,0.15)] hover:border-luxury-gold/50 transition-all duration-500 group"
            >
              {/* Corner accent in gold */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10px] right-[-10px] w-14 h-14 border border-luxury-gold/20 rotate-45" />
              </div>

              <div>
                <span className="font-body text-[10px] tracking-wider2 uppercase text-luxury-gold block mb-2 font-medium">
                  {item.label.includes("Matrimony") ? "Sacred Mass" : "Festivities"}
                </span>
                <h3 className="font-display text-2xl text-ink font-light mb-4 tracking-wide leading-tight">
                  {item.label}
                </h3>
                
                <div className="space-y-4 my-6">
                  <div className="flex items-start gap-3">
                    {/* Render Holy Cross for Nuptial Mass, Clock for Reception */}
                    {item.label.includes("Matrimony") ? (
                      <svg className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 8h-6V3c0-.55-.45-1-1-1s-1 .45-1 1v5H5c-.55 0-1 .45-1 1s.45 1 1 1h6v11c0 .55.45 1 1 1s1-.45 1-1V10h6c.55 0 1-.45 1-1s-.45-1-1-1z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <div>
                      <p className="font-display italic text-lg text-gold font-medium">{item.time}</p>
                      <p className="font-body text-xs text-ink-soft">Sunday, September 13, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-body text-sm font-semibold text-ink">{item.place}</p>
                      <p className="font-body text-xs text-ink-soft leading-relaxed mt-0.5">{item.address}</p>
                    </div>
                  </div>
                </div>

                {item.note && (
                  <p className="font-body text-xs text-ink-soft/75 italic border-l border-luxury-gold/30 pl-3 my-4">
                    {item.note}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-luxury-gold/10 flex flex-wrap gap-3">
                <a
                  href={item.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white font-body text-xs tracking-wider uppercase transition-all duration-300 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
                <a
                  href={calendarLinks[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-luxury-gold text-[#FAF8F5] hover:bg-[#8C6E3F] font-body text-xs tracking-wider uppercase transition-all duration-300 font-semibold shadow-[0_4px_15px_rgba(176,141,87,0.12)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
