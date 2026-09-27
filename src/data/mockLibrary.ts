import type { LibrarySummary, Track } from "../types";

export const mockTracks: Track[] = [
  {
    id: "trk_001",
    title: "Untitled Project 4.mp3",
    artist: "Unknown Artist",
    path: "Downloads Folder (2019)",
    duration: 192,
    audioUrl: "/api/tracks/trk_001/audio",
    decision: null,
  },
  {
    id: "trk_002",
    title: "Summer Drive.mp3",
    artist: "Coastal Lines",
    path: "Music / Summer Mix",
    duration: 245,
    audioUrl: "/api/tracks/trk_002/audio",
    decision: null,
  },
  {
    id: "trk_003",
    title: "Unknown Artist - Track 07.mp3",
    artist: "Unknown Artist",
    path: "Old Hard Drive (2016)",
    duration: 178,
    audioUrl: "/api/tracks/trk_003/audio",
    decision: null,
  },
  {
    id: "trk_004",
    title: "Downloaded Song.mp3",
    artist: "Unknown Artist",
    path: "Desktop / Downloads",
    duration: 203,
    audioUrl: "/api/tracks/trk_004/audio",
    decision: null,
  },
  {
    id: "trk_005",
    title: "Midnight Transit.mp3",
    artist: "Field Notes",
    path: "Records / Field Notes EP",
    duration: 226,
    audioUrl: "/api/tracks/trk_005/audio",
    decision: null,
  },
  {
    id: "trk_006",
    title: "Voice Memo 2021-03-14.m4a",
    artist: "Unknown Artist",
    path: "Phone Backup / Voice Memos",
    duration: 96,
    audioUrl: "/api/tracks/trk_006/audio",
    decision: null,
  },
  {
    id: "trk_007",
    title: "Ana Log (Demo).wav",
    artist: "T. Ravelle",
    path: "Projects / Demos",
    duration: 311,
    audioUrl: "/api/tracks/trk_007/audio",
    decision: null,
  },
  {
    id: "trk_008",
    title: "track01.mp3",
    artist: "Various Artists",
    path: "Shared / Compilation Vol. 2",
    duration: 154,
    audioUrl: "/api/tracks/trk_008/audio",
    decision: null,
  },
];

export const initialSummary: LibrarySummary = {
  total: 843,
  reviewed: 274,
  kept: 183,
  toDelete: 47,
  skipped: 44,
};

export const finalSummary: LibrarySummary = {
  total: 843,
  reviewed: 843,
  kept: 612,
  toDelete: 47,
  skipped: 184,
};
