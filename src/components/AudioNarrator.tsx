import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioNarratorProps {
  title: string;
  durationSeconds?: number;
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({ title, durationSeconds = 165 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<any | null>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>([15, 25, 10, 35, 20, 40, 12, 30, 22, 28, 14, 24]);

  useEffect(() => {
    if (isPlaying) {
      // Ticker Interval
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Reset wave heights to rest
      setWaveHeights([12, 16, 10, 18, 14, 20, 10, 15, 12, 16, 10, 14]);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, durationSeconds]);

  // Fast animation for the waves if playing
  useEffect(() => {
    let animInterval: any = null;
    if (isPlaying) {
      animInterval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 35) + 5));
      }, 150);
    }
    return () => {
      if (animInterval) clearInterval(animInterval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (currentTime / durationSeconds) * 100;

  return (
    <div className="bg-paper border border-brass/35 rounded-xl p-4 shadow-sm text-left space-y-3.5 relative overflow-hidden group">
      {/* Background radial gradient to give executive look */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C29A4A_1px,transparent_1px)] [background-size:12px_16px]" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brass/10 border border-brass/30 rounded-full flex items-center justify-center text-brass">
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-brass uppercase tracking-widest leading-none">FACULTY AUDIO COMPANION</p>
            <h5 className="font-serif font-bold text-xs text-ink mt-1">Myron Steeves, J.D.</h5>
          </div>
        </div>
        <span className="text-[9px] bg-ink/5 border border-ink/10 text-ink/60 font-bold px-2 py-0.5 rounded tracking-wider">
          {isPlaying ? 'PLAYING TUTORIAL' : 'LISTEN'}
        </span>
      </div>

      <div className="bg-white rounded-lg border border-fog p-3.5 flex items-center justify-between gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-brass hover:bg-ink text-ink hover:text-white flex items-center justify-center shadow transition-premium shrink-0 cursor-pointer focus:outline-none"
        >
          {isPlaying ? (
            <Pause className="w-4.5 h-4.5" fill="currentColor" />
          ) : (
            <Play className="w-4.5 h-4.5 ml-0.5" fill="currentColor" />
          )}
        </button>

        {/* Waves & Slider bar */}
        <div className="flex-1 flex flex-col gap-1.5 justify-center min-w-0">
          <p className="text-[11px] font-semibold text-ink/75 truncate leading-tight">
            {title}
          </p>
          
          <div className="flex items-center gap-3">
            {/* Digital Timer */}
            <span className="text-[10px] font-mono font-bold text-brass shrink-0 w-8">
              {formatTime(currentTime)}
            </span>

            {/* Slider track */}
            <div className="flex-1 bg-fog h-1 rounded-full overflow-hidden relative">
              <div 
                className="bg-brass h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="text-[10px] font-mono text-ink/40 shrink-0 w-8 text-right font-medium">
              {formatTime(durationSeconds)}
            </span>
          </div>
        </div>

        {/* Pulse Sound Waveform display */}
        <div className="hidden sm:flex items-end justify-center gap-[3px] h-10 w-20 shrink-0 select-none pb-0.5 px-1 border-l border-fog/60">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className={`w-[3px] rounded-t transition-all duration-150 ${
                isPlaying ? 'bg-brass animate-pulse' : 'bg-ink/15'
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
