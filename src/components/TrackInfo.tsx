import { useLayoutEffect, useRef, useState } from "react";
import type { Track } from "../types";
import { formatTime } from "../utils/format";

interface TrackInfoProps {
  track: Track;
  duration?: number;
  titleValue: string;
  artistValue: string;
  onTitleChange: (value: string) => void;
  onArtistChange: (value: string) => void;
  editError?: string | null;
}

const MARQUEE_SEPARATOR = "\u00A0\u00B7\u00A0";

export default function TrackInfo({
  track,
  duration,
  titleValue,
  artistValue,
  onTitleChange,
  onArtistChange,
  editError,
}: TrackInfoProps) {
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
  }, [titleValue]);

  const fieldClassName =
    "w-64 max-w-full border-b border-transparent bg-transparent px-1 text-center text-ink placeholder:text-ink/40 outline-none transition-colors duration-150 hover:border-[#172026]/20 focus:border-petroleum";

  return (
    <section className="flex min-h-44 w-full max-w-3xl flex-col justify-center gap-6 px-6 text-center">
      <h1
        ref={wrapRef}
        title={titleValue}
        className="flex overflow-hidden justify-center-safe text-[30px] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-4xl lg:text-[42px]"
      >
        <span
          className={`flex w-max shrink-0 whitespace-nowrap will-change-transform ${
            overflowing ? "animate-title-marquee" : ""
          }`}
        >
          <span ref={copyRef} className="shrink-0">
            {titleValue}
            <span
              aria-hidden="true"
              className={overflowing ? undefined : "hidden"}
            >
              {MARQUEE_SEPARATOR}
            </span>
          </span>
          {overflowing ? (
            <span aria-hidden="true" className="shrink-0">
              {titleValue}
              {MARQUEE_SEPARATOR}
            </span>
          ) : null}
        </span>
      </h1>
      <div className="space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
        <p className="flex items-baseline justify-center gap-1.5">
          <label htmlFor="track-title" className="shrink-0">
            Title:
          </label>
          <input
            id="track-title"
            type="text"
            value={titleValue}
            onChange={(event) => onTitleChange(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            className={fieldClassName}
          />
          <span aria-hidden="true" className="shrink-0 text-ink/50">
            .{track.extension}
          </span>
        </p>
        <p className="flex items-baseline justify-center gap-1.5">
          <label htmlFor="track-artist" className="shrink-0">
            Artist:
          </label>
          <input
            id="track-artist"
            type="text"
            value={artistValue}
            onChange={(event) => onArtistChange(event.target.value)}
            placeholder="Unknown artist"
            autoComplete="off"
            className={fieldClassName}
          />
        </p>
        <p className="truncate" title={track.path}>
          Path: {track.path}
        </p>
        <p className="truncate">
          Duration: {formatTime(duration ?? track.duration)}
        </p>
      </div>
      {editError ? (
        <p role="alert" className="text-sm font-medium text-alert">
          {editError}
        </p>
      ) : null}
    </section>
  );
}
