"use client";

import { useEffect, useRef, useState } from "react";
import { EnchantedCanvas } from "@/components/EnchantedCanvas";
import { SparkleOverlay } from "@/components/SparkleOverlay";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LuxuryLanding } from "@/components/LuxuryLanding";
import { LuxuryHero } from "@/components/LuxuryHero";
import { InvitationMessage } from "@/components/InvitationMessage";
import { EventDetails } from "@/components/EventDetails";
import { BibleVerse } from "@/components/BibleVerse";
import { GuestWishes } from "@/components/GuestWishes";
import { Footer } from "@/components/Footer";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Looks for local file named 'music.mp3' in the public/ folder
    audioRef.current = new Audio("/music.mp3");
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35; // Soft ambient background volume
    }
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function handleStartMusic() {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio playback blocked by browser/gesture requirement on reveal:", err);
      });
    }
  }

  return (
    <div className="bg-luxury-dark text-ink min-h-screen relative overflow-x-hidden selection:bg-luxury-gold selection:text-luxury-dark font-body">
      <EnchantedCanvas />
      <SparkleOverlay />
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
      <LuxuryLanding onReveal={handleStartMusic} />
      <main>
        <LuxuryHero />
        <InvitationMessage />
        <EventDetails />
        <BibleVerse />
        <GuestWishes />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
