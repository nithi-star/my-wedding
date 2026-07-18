"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

export function GuestWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  const initialWishes: Wish[] = [];


  useEffect(() => {
    setMounted(true);

    async function loadWishes() {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from("wishes")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            const formatted: Wish[] = data.map((w: any) => ({
              id: w.id,
              name: w.name,
              message: w.message,
              date: new Date(w.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            }));
            setWishes(formatted);
            return;
          }
        } catch (err) {
          console.log("Supabase fetch failed, falling back to localStorage:", err);
        }
      }

      // Fallback to localStorage
      const saved = localStorage.getItem("wedding_wishes");
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(initialWishes);
      }
    }

    loadWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const tempId = Date.now();
    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newWish: Wish = {
      id: tempId,
      name: name.trim(),
      message: message.trim(),
      date: dateStr,
    };

    // Optimistically update the UI locally
    setWishes((prev) => [newWish, ...prev]);
    setName("");
    setMessage("");

    if (supabase) {
      try {
        const { error } = await supabase
          .from("wishes")
          .insert([{ name: newWish.name, message: newWish.message }]);

        if (error) throw error;

        // Fetch fresh list from Supabase to sync the database IDs & timestamps
        const { data, error: refetchError } = await supabase
          .from("wishes")
          .select("*")
          .order("created_at", { ascending: false });

        if (!refetchError && data) {
          const formatted: Wish[] = data.map((w: any) => ({
            id: w.id,
            name: w.name,
            message: w.message,
            date: new Date(w.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
          }));
          setWishes(formatted);
        }
        return;
      } catch (err) {
        console.log("Supabase insert failed, saving to localStorage fallback:", err);
      }
    }

    // Fallback to localStorage save
    const saved = localStorage.getItem("wedding_wishes");
    const currentWishes = saved ? JSON.parse(saved) : initialWishes;
    const updated = [newWish, ...currentWishes];
    setWishes(updated);
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));
  };

  if (!mounted) return null;

  return (
    <section className="px-6 py-24 max-w-4xl mx-auto text-center relative z-10">
      {/* Decorative corner framing in gold */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-luxury-gold/30 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-luxury-gold/30 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-luxury-gold/30 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-luxury-gold/30 rounded-br-sm pointer-events-none" />

      <div className="p-8 sm:p-14 rounded-sm bg-[#FAF8F5]/30 shadow-[0_15px_40px_-20px_rgba(43,42,40,0.06)] border border-luxury-gold/15">
        
        {/* Leaf divider at the top */}
        <div className="flex items-center justify-center mb-8 opacity-75">
          <div className="h-[0.75px] w-16 bg-[#B08D57]/45" />
          <svg className="w-5 h-5 text-[#B08D57] mx-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8c.98 0 1.86.3 2.6.8-.76-2.2-2.6-3.8-4.9-3.8-3.1 0-5.7 2.6-5.7 5.7 0 .9.2 1.7.5 2.5C7.9 12.3 6.1 10.7 3.8 10.7c-.5 0-1 .1-1.5.2.7 2.1 2.5 3.7 4.7 3.7 3.1 0 5.7-2.6 5.7-5.7 0-.9-.2-1.7-.5-2.5 1.6.9 3.4 1.6 4.8 1.6z" />
          </svg>
          <div className="h-[0.75px] w-16 bg-[#B08D57]/45" />
        </div>

        <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-3 font-light tracking-wide">
          Blessings &amp; Wishes
        </h2>
        
        <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ink-soft mt-2 mb-12 max-w-[280px] mx-auto select-none leading-relaxed">
          Leave a message for the bride and groom
        </p>

        {/* Wishes Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16 p-6 sm:p-8 rounded-sm border border-luxury-gold/20 bg-[#F0EAE1]/30 shadow-[0_4px_20px_rgba(43,42,40,0.02)] flex flex-col gap-5 text-left">
          <div>
            <label htmlFor="guest-name" className="block font-body text-[10px] tracking-wider uppercase text-ink-soft mb-2 font-semibold">
              Your Name
            </label>
            <input
              id="guest-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#FAF8F5]/90 border border-luxury-gold/20 rounded-sm focus:outline-none focus:border-luxury-gold font-body text-sm text-ink transition-colors duration-300 placeholder-ink-soft/40"
              placeholder="e.g., Sarah &amp; James"
            />
          </div>
          
          <div>
            <label htmlFor="guest-wish" className="block font-body text-[10px] tracking-wider uppercase text-ink-soft mb-2 font-semibold">
              Your Wish
            </label>
            <textarea
              id="guest-wish"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-[#FAF8F5]/90 border border-luxury-gold/20 rounded-sm focus:outline-none focus:border-luxury-gold font-body text-sm text-ink transition-colors duration-300 placeholder-ink-soft/40 resize-none"
              placeholder="Write your warm wishes here..."
            />
          </div>

          <button
            type="submit"
            className="gold-shimmer-border w-full py-3.5 mt-2 rounded-sm bg-[#FAF8F5] font-body text-xs tracking-[0.25em] uppercase text-luxury-gold hover:text-ink transition-colors duration-500 shadow-[0_4px_25px_rgba(43,42,40,0.08)] relative group overflow-hidden active:scale-[0.98]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out" />
            Send Blessing
          </button>
        </form>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="p-6 rounded-sm border border-luxury-gold/20 bg-[#F0EAE1]/35 shadow-[0_4px_15px_-4px_rgba(43,42,40,0.03)] hover:border-luxury-gold/45 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <svg className="w-5 h-5 text-luxury-gold/40 mb-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
                <p className="font-display italic text-sm text-ink-soft leading-relaxed mb-4">
                  "{w.message}"
                </p>
              </div>
              
              <div className="flex justify-between items-center border-t border-luxury-gold/15 pt-3 mt-2">
                <span className="font-body text-[10px] tracking-wider uppercase text-gold font-semibold">
                  — {w.name}
                </span>
                <span className="font-body text-[9px] tracking-wide text-ink-soft/50">
                  {w.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
