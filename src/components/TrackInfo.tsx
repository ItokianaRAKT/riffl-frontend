import type { Track } from "../types";
import { formatTime } from "../utils/format";

interface TrackInfoProps {
  track: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <section className="px-6 text-center">
      <h1 className="text-[30px] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-4xl lg:text-[42px]">
        {track.title}
      </h1>
      <div className="mt-6 space-y-1.5 text-[15px] leading-relaxed text-ink">
        <p>Artist: {track.artist}</p>
        <p>Path: {track.path}</p>
        <p>Duration: {formatTime(track.duration)}</p>
      </div>
    </section>
  );
}
