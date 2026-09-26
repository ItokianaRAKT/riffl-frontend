import { useRef, type MouseEvent } from "react";
import { formatTime } from "../utils/format";

interface AudioPlayerProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function AudioPlayer({
  currentTime,
  duration,
  onSeek,
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
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-petroleum opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="mt-3.5 flex items-center justify-between text-[13px] font-medium text-ink tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime(remaining)}</span>
        </div>
      </div>
    </div>
  );
}
