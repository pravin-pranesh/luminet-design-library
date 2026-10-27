import { useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom";
  className?: string;
};

export function Tooltip({ content, children, placement = "top", className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 max-w-xs rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground shadow-md",
            placement === "top" ? "bottom-full left-1/2 mb-2 -translate-x-1/2" : "top-full left-1/2 mt-2 -translate-x-1/2",
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
