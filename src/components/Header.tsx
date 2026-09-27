interface HeaderProps {
  reviewed?: number;
  total?: number;
}

export default function Header({ reviewed, total }: HeaderProps) {
  return (
    <header className="flex items-baseline justify-between gap-8 px-8 pt-10 sm:px-12 lg:px-20">
      <span className="text-4xl leading-none font-bold tracking-[-0.03em] text-ink sm:text-5xl">
        Riffl
      </span>
      {reviewed !== undefined && total !== undefined ? (
        <p className="text-sm font-medium text-ink tabular-nums sm:text-base">
          {reviewed} / {total} tracks reviewed
        </p>
      ) : null}
    </header>
  );
}
