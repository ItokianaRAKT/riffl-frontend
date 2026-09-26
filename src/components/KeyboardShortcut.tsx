interface KeyboardShortcutProps {
  keys: string[];
}

export default function KeyboardShortcut({ keys }: KeyboardShortcutProps) {
  return (
    <kbd className="inline-flex items-center gap-1 rounded-[5px] border border-[#172026]/10 bg-[#ecece8] px-2 py-[3px] text-[11px] leading-none font-medium text-muted">
      {keys.join(" or ")}
    </kbd>
  );
}
