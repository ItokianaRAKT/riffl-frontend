import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { ApiError, listDirectories } from "../api/client";
import type { DirectoryListing } from "../types";

interface FolderPickerProps {
  onSelect: (path: string) => void;
  onClose: () => void;
}

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function UpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default function FolderPicker({ onSelect, onClose }: FolderPickerProps) {
  const [listing, setListing] = useState<DirectoryListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(async (path?: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await listDirectories(path);
      setListing(result);
    } catch (failure) {
      setError(
        failure instanceof ApiError
          ? failure.message
          : "Unable to reach the backend.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void navigate();
  }, [navigate]);

  useEffect(() => {
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="folder-picker-title"
        tabIndex={-1}
        className="flex max-h-[65vh] w-full max-w-sm flex-col overflow-hidden rounded-lg bg-white shadow-xl focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#172026]/10 px-5 py-4">
          <div className="min-w-0">
            <h2
              id="folder-picker-title"
              className="text-base font-semibold text-ink"
            >
              Choose a folder
            </h2>
            <p
              className="mt-1 truncate text-sm text-ink-soft"
              title={listing?.path}
            >
              {listing?.path ?? "…"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => listing?.parent && navigate(listing.parent)}
            disabled={loading || !listing?.parent}
            className="flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[#172026]/15 px-3 text-xs font-bold tracking-[0.08em] uppercase text-ink transition-colors duration-150 hover:bg-[#172026]/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum disabled:pointer-events-none disabled:opacity-40"
          >
            <UpIcon />
            Up
          </button>
        </div>

        <div className="min-h-32 flex-1 overflow-y-auto px-2 py-2">
          {error ? (
            <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
              <p className="text-sm font-medium text-alert">{error}</p>
              <button
                type="button"
                onClick={() => void navigate(listing?.path)}
                className="h-9 cursor-pointer rounded-lg border border-[#172026]/15 px-4 text-xs font-bold tracking-[0.08em] uppercase text-ink transition-colors duration-150 hover:bg-[#172026]/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
              >
                Retry
              </button>
            </div>
          ) : loading && !listing ? (
            <p className="px-4 py-6 text-center text-sm text-ink-soft">
              Loading…
            </p>
          ) : listing && listing.directories.length > 0 ? (
            <ul>
              {listing.directories.map((directory) => (
                <li key={directory.path}>
                  <button
                    type="button"
                    onClick={() => void navigate(directory.path)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-ink transition-colors duration-150 hover:bg-[#172026]/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
                  >
                    <FolderIcon />
                    <span className="truncate">{directory.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-ink-soft">
              No subfolders here.
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#172026]/10 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 cursor-pointer rounded-lg border border-[#172026]/15 px-6 text-sm font-bold tracking-[0.1em] uppercase text-ink transition-colors duration-150 hover:bg-[#172026]/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => listing && onSelect(listing.path)}
            disabled={loading || !listing}
            className="h-11 cursor-pointer rounded-lg bg-petroleum px-6 text-sm font-bold tracking-[0.1em] uppercase text-white transition-colors duration-150 hover:bg-[#0f3d4e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum disabled:cursor-not-allowed disabled:opacity-60"
          >
            Select this folder
          </button>
        </div>
      </div>
    </div>
  );
}
