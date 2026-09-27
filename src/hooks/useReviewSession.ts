import { useCallback, useMemo, useState } from "react";
import type { Decision, LibrarySummary, Track } from "../types";
import { initialSummary, mockTracks } from "../data/mockLibrary";

interface ReviewSession {
  currentTrack: Track | null;
  summary: LibrarySummary;
  index: number;
  queueLength: number;
  canGoBack: boolean;
  canGoForward: boolean;
  decide: (decision: Decision) => void;
  goBack: () => void;
  goForward: () => void;
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
      setCursor((previous) => Math.min(mockTracks.length, previous + 1));
    },
    [cursor],
  );

  const goBack = useCallback(() => {
    setCursor((previous) => Math.max(0, previous - 1));
  }, []);

  const goForward = useCallback(() => {
    setCursor((previous) => Math.min(mockTracks.length, previous + 1));
  }, []);

  const summary = useMemo<LibrarySummary>(() => {
    const decided = decisions
      .slice(0, cursor)
      .filter((decision): decision is Decision => Boolean(decision));
    return {
      total: initialSummary.total,
      reviewed: initialSummary.reviewed + decided.length,
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
    index: cursor,
    queueLength: mockTracks.length,
    canGoBack: cursor > 0,
    canGoForward: cursor < mockTracks.length,
    decide,
    goBack,
    goForward,
  };
}
