import { useEffect, useRef } from "react";

interface LucideIconProps {
  name: string;
  className?: string;
}

interface LucideApi {
  createIcons: (options?: {
    icons?: Record<string, unknown>;
    nameAttr?: string;
    attrs?: Record<string, string>;
    root?: ParentNode;
  }) => void;
}

declare global {
  interface Window {
    lucide?: LucideApi;
  }
}

export default function LucideIcon({ name, className }: LucideIconProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const lucide = window.lucide;

    if (!container || !lucide) return;

    const placeholder = document.createElement("i");
    placeholder.setAttribute("data-lucide", name);
    container.replaceChildren(placeholder);

    lucide.createIcons({ root: container });
  }, [name]);

  return (
    <span
      ref={containerRef}
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full ${className ?? ""}`}
    />
  );
}
