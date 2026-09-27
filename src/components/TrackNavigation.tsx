import type { ReactNode } from "react";

interface TrackNavigationProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  children: ReactNode;
}

const CHEVRON_PATHS = {
  previous: "m15 18-6-6 6-6",
  next: "m9 6 6 6-6 6",
};

function Chevron({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d={CHEVRON_PATHS[direction]} />
    </svg>
  );
}

export default function TrackNavigation({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  children,
}: TrackNavigationProps) {
  const buttonClass =
    "mt-2 grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted";

  return (
    <div className="flex w-full max-w-3xl items-start justify-center gap-2 px-6 sm:gap-5">
      <button
        type="button"
        aria-label="Previous track"
        onClick={onBack}
        disabled={!canGoBack}
        className={buttonClass}
      >
        <Chevron direction="previous" />
      </button>
      {children}
      <button
        type="button"
        aria-label="Next track"
        onClick={onForward}
        disabled={!canGoForward}
        className={buttonClass}
      >
        <Chevron direction="next" />
      </button>
    </div>
  );
}
