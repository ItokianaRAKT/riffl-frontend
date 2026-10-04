import type { Decision } from "../types";

interface DecisionControlsProps {
  onDecide: (decision: Decision) => void;
  onUndo: () => void;
  canUndo: boolean;
}

interface Option {
  decision: Decision;
  label: string;
  className: string;
}

const OPTIONS: Option[] = [
  {
    decision: "delete",
    label: "Delete",
    className: "bg-charcoal text-white hover:bg-[#23272b] active:bg-[#1e2225]",
  },
  {
    decision: "skip",
    label: "Skip",
    className: "bg-muted text-ink hover:bg-[#a3acb3] active:bg-[#97a0a8]",
  },
  {
    decision: "keep",
    label: "Keep",
    className: "bg-petroleum text-white hover:bg-[#0f3d4e] active:bg-[#0c313f]",
  },
];

export default function DecisionControls({
  onDecide,
  onUndo,
  canUndo,
}: DecisionControlsProps) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center px-6">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
        {OPTIONS.map((option) => (
          <div
            key={option.decision}
            className="flex items-center justify-center gap-4 sm:flex-col sm:gap-3"
          >
            <button
              type="button"
              onClick={() => onDecide(option.decision)}
              className={`h-14 flex-1 cursor-pointer rounded-lg text-sm font-bold tracking-[0.1em] uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px sm:w-full sm:flex-none ${option.className}`}
            >
              {option.label}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className="mt-5 flex h-11 cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-[#172026]/20 bg-transparent px-8 text-sm font-bold tracking-[0.1em] uppercase text-ink transition-colors duration-150 hover:bg-[#172026]/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px disabled:pointer-events-none disabled:opacity-40"
      >
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
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
        </svg>
        Undo last decision
      </button>
    </div>
  );
}
