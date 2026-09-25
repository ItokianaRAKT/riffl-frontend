export type Decision = "keep" | "skip" | "delete";

export interface Track {
  id: string;
  title: string;
  artist: string;
  path: string;
  duration: number;
  audioUrl: string;
  decision: Decision | null;
}

export interface LibrarySummary {
  total: number;
  reviewed: number;
  kept: number;
  toDelete: number;
  skipped: number;
}

export type ReviewStatus = "empty" | "reviewing" | "complete";
