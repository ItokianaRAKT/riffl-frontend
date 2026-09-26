import type { Decision } from "../types";
import KeyboardShortcut from "./KeyboardShortcut";

interface DecisionControlsProps {
  onDecide: (decision: Decision) => void;
}

interface Option {
  decision: Decision;
  label: string;
  shortcut: string;
  className: string;
}

const OPTIONS: Option[] = [
  {
    decision: "keep",
    label: "Keep",
    shortcut: "K",
    className: "bg-petroleum text-white hover:bg-[#0f3d4e] active:bg-[#0c313f]",
  },
  {
    decision: "skip",
    label: "Skip",
    shortcut: "S",
    className: "bg-muted text-ink hover:bg-[#a3acb3] active:bg-[#97a0a8]",
  },
  {
    decision: "delete",
    label: "Delete",
    shortcut: "D",
    className: "bg-charcoal text-white hover:bg-[#23272b] active:bg-[#1e2225]",
  },
];

export default function DecisionControls({ onDecide }: DecisionControlsProps) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-4 px-6 sm:gap-5">
      {OPTIONS.map((option) => (
        <div key={option.decision} className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => onDecide(option.decision)}
            className={`h-14 w-full cursor-pointer rounded-lg text-sm font-bold tracking-[0.1em] uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px ${option.className}`}
          >
            {option.label}
          </button>
          <KeyboardShortcut keys={[option.shortcut]} />
        </div>
      ))}
    </div>
  );
}
