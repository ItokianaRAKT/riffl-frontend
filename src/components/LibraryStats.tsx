import type { LibrarySummary } from "../types";

interface LibraryStatsProps {
  summary: LibrarySummary;
}

export default function LibraryStats({ summary }: LibraryStatsProps) {
  return (
    <footer className="border-t border-[#172026]/10 px-8 py-7 sm:px-12 lg:px-20">
      <div className="flex items-center gap-8 text-sm text-ink">
        <span className="tabular-nums">Kept: {summary.kept}</span>
        <span className="tabular-nums">To delete: {summary.toDelete}</span>
        <span className="tabular-nums">Skipped: {summary.skipped}</span>
      </div>
    </footer>
  );
}
