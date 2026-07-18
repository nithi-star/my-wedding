"use client";

import { MutableRefObject } from "react";

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export function MusicPlayer({ isPlaying, setIsPlaying, audioRef }: MusicPlayerProps) {
  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio playback blocked:", err);
      });
      setIsPlaying(true);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <button
        onClick={togglePlay}
        className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-luxury-gold/30 bg-[#FAF8F5]/85 backdrop-blur-md shadow-[0_4px_25px_rgba(176,141,87,0.15)] hover:border-luxury-gold/70 hover:shadow-[0_4px_30px_rgba(176,141,87,0.25)] transition-all duration-300 group"
        aria-label={isPlaying ? "Mute music" : "Play romantic piano background music"}
      >
        {/* Play/Pause Icon */}
        <div className="relative w-5 h-5 flex items-center justify-center text-luxury-gold">
          {isPlaying ? (
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Dynamic visualizer bars */}
        <div className="flex items-end gap-[3px] h-5 w-6">
          <span
            className={`w-[3px] rounded-t-sm bg-luxury-gold ${isPlaying ? "animate-soundwave-1" : "h-1"
              }`}
          />
          <span
            className={`w-[3px] rounded-t-sm bg-luxury-gold-light ${isPlaying ? "animate-soundwave-2" : "h-2"
              }`}
          />
          <span
            className={`w-[3px] rounded-t-sm bg-luxury-gold ${isPlaying ? "animate-soundwave-3" : "h-1.5"
              }`}
          />
          <span
            className={`w-[3px] rounded-t-sm bg-luxury-gold-light ${isPlaying ? "animate-soundwave-4" : "h-1"
              }`}
          />
        </div>
      </button>
    </div>
  );
}
