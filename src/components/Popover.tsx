import { useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type PopoverProps = {
  trigger: ReactNode;
  content: ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start";
  className?: string;
  contentClassName?: string;
};

export function Popover({
  trigger,
  content,
  placement = "bottom-start",
  className,
  contentClassName,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const placementClass = {
    "bottom-start": "left-0 top-full mt-2",
    "bottom-end": "right-0 top-full mt-2",
    "top-start": "bottom-full left-0 mb-2",
  }[placement];

  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="inline-flex"
      >
        {trigger}
      </span>
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label="Close popover"
            onClick={() => setOpen(false)}
          />
          <div
            id={id}
            role="dialog"
            className={cn(
              "absolute z-50 min-w-[12rem] rounded-lg border border-border bg-card p-3 text-sm shadow-lg",
              placementClass,
              contentClassName,
            )}
          >
            {content}
          </div>
        </>
      ) : null}
    </span>
  );
}
