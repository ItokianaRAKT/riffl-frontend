import { useEffect, useState } from "react";
import type { Track } from "../types";

interface TrackCoverProps {
  track?: Track | null;
}

export default function TrackCover({ track }: TrackCoverProps) {
  const coverUrl = track?.coverUrl;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [coverUrl]);

  const hasArtwork = Boolean(coverUrl) && !failed;

  return (
    <div
      title={track?.title ? `${track.title} cover` : undefined}
      className="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#172026]/10 bg-muted shadow-[0_1px_2px_rgba(23,32,38,0.08)] sm:h-48 sm:w-48"
    >
      {hasArtwork && coverUrl ? (
        <img
          src={coverUrl}
          alt={track?.title ? `${track.title} cover` : ""}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="preview-icon h-10 w-10 text-petroleum sm:h-12 sm:w-12"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </div>
  );
}
