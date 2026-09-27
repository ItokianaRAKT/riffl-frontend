import { useEffect } from "react";
import type { Decision } from "../types";

interface ShortcutHandlers {
  enabled: boolean;
  onDecide: (decision: Decision) => void;
  onTogglePlayback: () => void;
  onPreviousTrack: () => void;
  onNextTrack: () => void;
}

const DECISION_KEYS: Record<string, Decision> = {
  k: "keep",
  s: "skip",
  d: "delete",
};

export function useReviewShortcuts({
  enabled,
  onDecide,
  onTogglePlayback,
  onPreviousTrack,
  onNextTrack,
}: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabled || event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      const key = event.key.toLowerCase();
      const decision = DECISION_KEYS[key];

      if (decision) {
        event.preventDefault();
        onDecide(decision);
        return;
      }

      if (key === " ") {
        event.preventDefault();
        onTogglePlayback();
        return;
      }

      if (key === "arrowleft") {
        event.preventDefault();
        onPreviousTrack();
        return;
      }

      if (key === "arrowright") {
        event.preventDefault();
        onNextTrack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onDecide, onTogglePlayback, onPreviousTrack, onNextTrack]);
}
