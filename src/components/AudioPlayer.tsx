import { useRef, type MouseEvent, type RefObject } from "react";
import { formatTime } from "../utils/format";

interface AudioPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  src: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  error: boolean;
  onSeek: (time: number) => void;
  onToggle: () => void;
}

export default function AudioPlayer({
  audioRef,
  src,
  currentTime,
  duration,
  isPlaying,
  error,
  onSeek,
  onToggle,
}: AudioPlayerProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = Math.max(0, duration - currentTime);

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    const bar = barRef.current;
    if (!bar) return;
    const bounds = bar.getBoundingClientRect();
    if (bounds.width === 0) return;
    const ratio = (event.clientX - bounds.left) / bounds.width;
    onSeek(ratio * duration);
  };

  return (
    <div className="flex w-full max-w-2xl items-center gap-8 px-6">
      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
      <div className="min-w-0 flex-1">
        <div
          ref={barRef}
          onClick={handleSeek}
          className="group relative h-1.5 w-full cursor-pointer rounded-full bg-muted"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-petroleum"
            style={{ width: `${progress}%` }}
          />
          <span
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-petroleum opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="mt-3.5 flex items-center justify-between text-[13px] font-medium text-ink tabular-nums">
          {error ? (
            <span className="text-alert">Source audio indisponible</span>
          ) : (
            <>
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(remaining)}</span>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        disabled={error}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="grid h-16 w-16 shrink-0 place-items-center -translate-y-4.5 rounded-full bg-petroleum text-white transition-colors duration-150 hover:bg-[#0f3d4e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-petroleum disabled:active:scale-100"
      >
        {isPlaying ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <rect x="6.5" y="5" width="4" height="14" rx="1.2" />
            <rect x="13.5" y="5" width="4" height="14" rx="1.2" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="ml-1 h-6 w-6 -translate-x-0.5"
          >
            <path d="M8 5.13v13.74a.5.5 0 0 0 .76.43l10.72-6.87a.5.5 0 0 0 0-.86L8.76 4.7a.5.5 0 0 0-.76.43Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
