export type Decision = "keep" | "skip" | "delete";

export interface Track {
  id: string;
  title: string;
  artist: string;
  extension: string;
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

export interface AudioFile {
  path: string;
  relativePath: string;
  name: string;
  title: string;
  artist: string | null;
  extension: string;
  size: number;
  modifiedAt: string;
}

export interface ScanResult {
  rootPath: string;
  scannedAt: string;
  totalFiles: number;
  totalSize: number;
  files: AudioFile[];
}

export interface DirectoryEntry {
  name: string;
  path: string;
}

export interface DirectoryListing {
  path: string;
  parent: string | null;
  directories: DirectoryEntry[];
}

export interface UndoResult {
  path: string;
  action: Decision;
  remaining: number;
}

export interface RenameResult {
  path: string;
  previousPath: string;
  title: string;
  artist: string | null;
}
