import { cn } from "../lib/cn";
import { Button } from "./Button";

export type BulkSelectionBarProps = {
  selectedCount: number;
  totalCount?: number;
  onClear?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
};

export function BulkSelectionBar({
  selectedCount,
  totalCount,
  onClear,
  onAction,
  actionLabel = "Add to bag",
  className,
}: BulkSelectionBarProps) {
  if (selectedCount <= 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border border-primary/25 bg-primary/[0.04] px-4 py-3 shadow-sm",
        className,
      )}
      role="status"
    >
      <p className="text-sm font-medium text-foreground">
        {selectedCount} selected
        {totalCount != null ? <span className="text-muted"> of {totalCount}</span> : null}
      </p>
      <div className="flex gap-2">
        {onClear ? (
          <Button type="button" size="sm" variant="ghost" onClick={onClear}>
            Clear
          </Button>
        ) : null}
        {onAction ? (
          <Button type="button" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
