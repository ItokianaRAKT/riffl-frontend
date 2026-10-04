import { useState } from "react";
import type { Track } from "../types";

interface DraftState {
  trackId: string;
  title: string;
  artist: string;
}

interface TrackEdits {
  title: string;
  artist: string;
  setTitle: (value: string) => void;
  setArtist: (value: string) => void;
  isDirty: boolean;
  error: string | null;
  setError: (message: string | null) => void;
}

export function useTrackEdits(track: Track | null): TrackEdits {
  const trackId = track?.id ?? "";
  const savedTitle = track?.title ?? "";
  const savedArtist = track?.artist ?? "";

  const [draft, setDraft] = useState<DraftState>({
    trackId,
    title: savedTitle,
    artist: savedArtist,
  });
  const [error, setError] = useState<string | null>(null);

  if (draft.trackId !== trackId) {
    setDraft({ trackId, title: savedTitle, artist: savedArtist });
    setError(null);
  }

  const isDirty =
    draft.title.trim() !== savedTitle.trim() ||
    draft.artist.trim() !== savedArtist.trim();

  return {
    title: draft.title,
    artist: draft.artist,
    setTitle: (value: string) =>
      setDraft((previous) => ({ ...previous, title: value })),
    setArtist: (value: string) =>
      setDraft((previous) => ({ ...previous, artist: value })),
    isDirty,
    error,
    setError,
  };
}
