import { useCallback, useMemo, useState } from "react";
import type { Decision, LibrarySummary, Track } from "../types";
import { initialSummary, mockTracks } from "../data/mockLibrary";

interface ReviewSession {
  currentTrack: Track | null;
  summary: LibrarySummary;
  decidedCount: number;
  decide: (decision: Decision) => void;
}

export function useReviewSession(): ReviewSession {
  const [cursor, setCursor] = useState(0);
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const decide = useCallback(
    (decision: Decision) => {
      setDecisions((previous) => {
        const next = [...previous];
        next[cursor] = decision;
        return next;
      });
      setCursor((previous) => previous + 1);
    },
    [cursor],
  );

  const summary = useMemo<LibrarySummary>(() => {
    const decided = decisions.slice(0, cursor);
    return {
      total: initialSummary.total,
      reviewed: initialSummary.reviewed + cursor,
      kept: initialSummary.kept + decided.filter((d) => d === "keep").length,
      toDelete:
        initialSummary.toDelete + decided.filter((d) => d === "delete").length,
      skipped:
        initialSummary.skipped + decided.filter((d) => d === "skip").length,
    };
  }, [decisions, cursor]);

  return {
    currentTrack: cursor < mockTracks.length ? mockTracks[cursor] : null,
    summary,
    decidedCount: cursor,
    decide,
  };
}
