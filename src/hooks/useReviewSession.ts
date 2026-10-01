import { useCallback, useMemo, useState } from "react";
import type { Decision, LibrarySummary, Track } from "../types";

interface ReviewSessionOptions {
  tracks: Track[];
}

interface ReviewSession {
  currentTrack: Track | null;
  summary: LibrarySummary;
  index: number;
  queueLength: number;
  decide: (decision: Decision) => void;
  reset: () => void;
}

export function useReviewSession({ tracks }: ReviewSessionOptions): ReviewSession {
  const [cursor, setCursor] = useState(0);
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const trackCount = tracks.length;

  const decide = useCallback(
    (decision: Decision) => {
      setDecisions((previous) => {
        const next = [...previous];
        next[cursor] = decision;
        return next;
      });
      setCursor((previous) => Math.min(trackCount, previous + 1));
    },
    [cursor, trackCount],
  );

  const reset = useCallback(() => {
    setCursor(0);
    setDecisions([]);
  }, []);

  const summary = useMemo<LibrarySummary>(() => {
    const decided = decisions
      .slice(0, cursor)
      .filter((decision): decision is Decision => Boolean(decision));
    return {
      total: trackCount,
      reviewed: decided.length,
      kept: decided.filter((decision) => decision === "keep").length,
      toDelete: decided.filter((decision) => decision === "delete").length,
      skipped: decided.filter((decision) => decision === "skip").length,
    };
  }, [decisions, cursor, trackCount]);

  return {
    currentTrack: cursor < trackCount ? tracks[cursor] : null,
    summary,
    index: cursor,
    queueLength: trackCount,
    decide,
    reset,
  };
}
