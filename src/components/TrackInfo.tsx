import { useLayoutEffect, useRef, useState } from "react";
import type { Track } from "../types";
import { formatTime } from "../utils/format";

interface TrackInfoProps {
  track: Track;
}

const MARQUEE_SEPARATOR = "\u00A0\u00B7\u00A0";

export default function TrackInfo({ track }: TrackInfoProps) {
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const copy = copyRef.current;
    if (!wrap || !copy) return;

    const measure = () =>
      setOverflowing(copy.offsetWidth > wrap.clientWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(copy);
    return () => observer.disconnect();
  }, [track.title]);

  return (
    <section className="flex h-44 min-w-0 flex-1 flex-col justify-center gap-6 px-6 text-center">
      <h1
        ref={wrapRef}
        title={track.title}
        className="flex overflow-hidden justify-center-safe text-[30px] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-4xl lg:text-[42px]"
      >
        <span
          className={`flex w-max shrink-0 whitespace-nowrap will-change-transform ${
            overflowing ? "animate-title-marquee" : ""
          }`}
        >
          <span ref={copyRef} className="shrink-0">
            {track.title}
            <span
              aria-hidden="true"
              className={overflowing ? undefined : "hidden"}
            >
              {MARQUEE_SEPARATOR}
            </span>
          </span>
          {overflowing ? (
            <span aria-hidden="true" className="shrink-0">
              {track.title}
              {MARQUEE_SEPARATOR}
            </span>
          ) : null}
        </span>
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
