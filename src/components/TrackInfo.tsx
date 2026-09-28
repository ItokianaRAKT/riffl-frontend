import type { Track } from "../types";
import { formatTime } from "../utils/format";

interface TrackInfoProps {
  track: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <section className="flex h-44 min-w-0 flex-1 flex-col justify-center gap-6 px-6 text-center">
      <h1
        title={track.title}
        className="truncate text-[30px] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-4xl lg:text-[42px]"
      >
        {track.title}
      </h1>
      <div className="space-y-1.5 text-[15px] leading-relaxed text-ink">
        <p className="truncate">Artist: {track.artist}</p>
        <p className="truncate" title={track.path}>
          Path: {track.path}
        </p>
        <p className="truncate">Duration: {formatTime(track.duration)}</p>
      </div>
    </section>
  );
}
