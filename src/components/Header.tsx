const DISC_ICON_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRpc2MtMyBwcmV2aWV3LWljb24iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTYgMTJjMC0xLjcuNy0zLjIgMS44LTQuMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiLz48cGF0aCBkPSJNMTkgMTJjMCAxLjctLjcgMy4yLTEuOCA0LjIiLz48L3N2Zz4=";

interface HeaderProps {
  reviewed?: number;
  total?: number;
}

function DiscIcon() {
  return (
    <span
      aria-hidden="true"
      className="h-7 w-7 shrink-0 bg-petroleum sm:h-9 sm:w-9"
      style={{
        maskImage: `url("${DISC_ICON_URI}")`,
        WebkitMaskImage: `url("${DISC_ICON_URI}")`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export default function Header({ reviewed, total }: HeaderProps) {
  return (
    <header className="flex items-baseline justify-between gap-8 px-8 pt-10 sm:px-12 lg:px-20">
      <span className="inline-flex items-center gap-2.5 text-4xl leading-none font-bold tracking-[-0.03em] text-petroleum sm:gap-3 sm:text-5xl">
        <DiscIcon />
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
