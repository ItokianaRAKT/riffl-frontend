import type { AudioFile, ScanResult, Track } from "../types";

interface ApiErrorBody {
  error?: string;
  code?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function scanFolder(path: string): Promise<ScanResult> {
  let response: Response;

  try {
    response = await fetch(`/files/scan?path=${encodeURIComponent(path)}`);
  } catch {
    throw new ApiError("Unable to reach the backend.", 0, "NETWORK_ERROR");
  }

  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (!response.ok) {
    throw new ApiError(
      body?.error ?? `Scan failed (HTTP ${response.status}).`,
      response.status,
      body?.code,
    );
  }

  return body as unknown as ScanResult;
}

export function toTrack(file: AudioFile): Track {
  return {
    id: file.path,
    title: file.name,
    artist: "Unknown Artist",
    path: file.relativePath,
    duration: 0,
    audioUrl: `/stream?path=${encodeURIComponent(file.path)}`,
    decision: null,
  };
}
