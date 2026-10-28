import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export type CompareBarProps = {
  items: ReactNode[];
  maxItems?: number;
  onCompare?: () => void;
  onClear?: () => void;
  className?: string;
};

export function CompareBar({ items, maxItems = 4, onCompare, onClear, className }: CompareBarProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 border-t border-border bg-card px-4 py-3 shadow-[0_-4px_24px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      <span className="text-sm text-muted">
        Compare ({items.length}/{maxItems})
      </span>
      <div className="flex flex-1 flex-wrap gap-2">{items}</div>
      <div className="flex gap-2">
        {onClear ? (
          <Button type="button" size="sm" variant="ghost" onClick={onClear}>
            Clear
          </Button>
        ) : null}
        {onCompare ? (
          <Button type="button" size="sm" onClick={onCompare} disabled={items.length < 2}>
            Compare now
          </Button>
        ) : null}
      </div>
    </div>
  );
}
