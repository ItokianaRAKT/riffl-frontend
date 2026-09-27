import type { LibrarySummary } from "../types";

interface ReviewCompleteProps {
  summary: LibrarySummary;
}

export default function ReviewComplete({ summary }: ReviewCompleteProps) {
  return (
    <section className="flex w-full max-w-2xl flex-col items-center px-6 text-center">
      <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.025em] text-ink sm:text-[44px]">
        Library reviewed
      </h1>
      <p className="mt-5 text-[15px] font-medium text-ink tabular-nums">
        {summary.total} tracks processed
      </p>
      <div className="mt-9 space-y-2.5 text-[15px] text-ink tabular-nums">
        <p>
          <span className="font-semibold">{summary.kept}</span> kept
        </p>
        <p>
          <span className="font-semibold">{summary.toDelete}</span> marked for
          deletion
        </p>
        <p>
          <span className="font-semibold">{summary.skipped}</span> skipped
        </p>
      </div>
    </section>
  );
}
