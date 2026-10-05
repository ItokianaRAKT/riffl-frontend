import type { LibrarySummary } from "../types";

interface LibraryStatsProps {
  summary: LibrarySummary;
}

export default function LibraryStats({ summary }: LibraryStatsProps) {
  return (
    <footer className="border-t border-[#172026]/10 px-8 py-7 sm:px-12 lg:px-20">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="flex items-center gap-8 text-sm text-ink-soft">
          <span className="tabular-nums">Kept: {summary.kept}</span>
          <span className="tabular-nums">To delete: {summary.toDelete}</span>
          <span className="tabular-nums">Skipped: {summary.skipped}</span>
        </div>
        <button
          type="button"
          className="cursor-pointer text-sm font-medium text-petroleum underline decoration-[#164e63]/40 underline-offset-4 transition-colors duration-150 hover:decoration-[#164e63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
        >
          Review deletion queue ({summary.toDelete} tracks)
        </button>
      </div>
    </footer>
  );
}
