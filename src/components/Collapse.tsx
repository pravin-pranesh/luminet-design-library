import { useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type CollapseProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const titleSize = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

export function Collapse({
  title,
  children,
  defaultOpen = false,
  isOpen: controlled,
  onOpenChange,
  size = "md",
  className,
}: CollapseProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = controlled ?? internal;
  const panelId = useId();

  function toggle() {
    const next = !open;
    if (controlled === undefined) setInternal(next);
    onOpenChange?.(next);
  }

  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-medium text-foreground transition-colors duration-150 hover:bg-foreground/[0.02]",
          titleSize[size],
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span>{title}</span>
        <span className="text-muted" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="border-t border-border px-4 py-3 text-sm text-muted"
      >
        {children}
      </div>
    </div>
  );
}
