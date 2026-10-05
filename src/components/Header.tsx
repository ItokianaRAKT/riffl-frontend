import LucideIcon from "./LucideIcon";

interface HeaderProps {
  reviewed?: number;
  total?: number;
}

export default function Header({ reviewed, total }: HeaderProps) {
  return (
    <header className="flex items-baseline justify-between gap-8 px-8 pt-10 sm:px-12 lg:px-20">
      <span className="inline-flex items-center gap-2.5 text-4xl leading-none font-bold tracking-[-0.03em] text-petroleum sm:gap-3 sm:text-5xl">
        <LucideIcon name="hard-drive" className="h-7 w-7 sm:h-9 sm:w-9" />
        riffl
      </span>
      {reviewed !== undefined && total !== undefined ? (
        <p className="text-sm font-medium text-ink-soft tabular-nums sm:text-base">
          {reviewed} / {total} tracks reviewed
        </p>
      ) : null}
    </header>
  );
}
