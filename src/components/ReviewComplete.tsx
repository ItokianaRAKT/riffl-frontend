import type { LibrarySummary } from "../types";

interface ReviewCompleteProps {
  summary: LibrarySummary;
  onReviewQueue: () => void;
  onFinish: () => void;
}

function TrashIcon() {
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
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export default function ReviewComplete({
  summary,
  onReviewQueue,
  onFinish,
}: ReviewCompleteProps) {
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

      <div className="mt-12 flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={onReviewQueue}
          className="cursor-pointer text-sm font-medium text-petroleum underline decoration-[#164e63]/40 underline-offset-4 transition-colors duration-150 hover:decoration-[#164e63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
        >
          Review deletion queue
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="flex h-14 cursor-pointer items-center gap-2.5 rounded-lg bg-charcoal px-11 text-sm font-bold tracking-[0.1em] uppercase text-white transition-colors duration-150 hover:bg-[#23272b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px"
        >
          <TrashIcon />
          Finish cleanup
        </button>
      </div>
    </section>
  );
}
