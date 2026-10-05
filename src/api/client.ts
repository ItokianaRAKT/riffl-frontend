import type {
  AudioFile,
  Decision,
  DirectoryListing,
  RenameResult,
  ScanResult,
  Track,
  UndoResult,
} from "../types";

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

export async function listDirectories(path?: string): Promise<DirectoryListing> {
  let response: Response;

  const query =
    path === undefined ? "" : `?path=${encodeURIComponent(path)}`;

  try {
    response = await fetch(`/files/directories${query}`);
  } catch {
    throw new ApiError("Unable to reach the backend.", 0, "NETWORK_ERROR");
  }

  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (!response.ok) {
    throw new ApiError(
      body?.error ?? `Directory listing failed (HTTP ${response.status}).`,
      response.status,
      body?.code,
    );
  }

  return body as unknown as DirectoryListing;
}

export async function sendAction(path: string, action: Decision): Promise<void> {
  let response: Response;

  try {
    response = await fetch("/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, action }),
    });
  } catch {
    throw new ApiError("Unable to reach the backend.", 0, "NETWORK_ERROR");
  }

  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (!response.ok) {
    throw new ApiError(
      body?.error ?? `Action failed (HTTP ${response.status}).`,
      response.status,
      body?.code,
    );
  }
}

export async function renameTrack(
  path: string,
  title: string,
  artist?: string,
): Promise<RenameResult> {
  let response: Response;

  try {
    response = await fetch("/action/rename", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        title,
        ...(artist !== undefined && { artist }),
      }),
    });
  } catch {
    throw new ApiError("Unable to reach the backend.", 0, "NETWORK_ERROR");
  }

  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (!response.ok) {
    throw new ApiError(
      body?.error ?? `Rename failed (HTTP ${response.status}).`,
      response.status,
      body?.code,
    );
  }

  return body as unknown as RenameResult;
}

export async function undoLastAction(): Promise<UndoResult> {
  let response: Response;

  try {
    response = await fetch("/action/undo", { method: "POST" });
  } catch {
    throw new ApiError("Unable to reach the backend.", 0, "NETWORK_ERROR");
  }

  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (!response.ok) {
    throw new ApiError(
      body?.error ?? `Undo failed (HTTP ${response.status}).`,
      response.status,
      body?.code,
    );
  }

  return body as unknown as UndoResult;
}

export function toTrack(file: AudioFile): Track {
  return {
    id: file.path,
    title: file.title,
    artist: file.artist ?? "",
    extension: file.extension,
    path: file.relativePath,
    duration: 0,
    audioUrl: `/stream?path=${encodeURIComponent(file.path)}`,
    coverUrl: `/cover?path=${encodeURIComponent(file.path)}`,
    decision: null,
  };
}
