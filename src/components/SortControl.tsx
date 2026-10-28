import { cn } from "../lib/cn";
import { Button } from "./Button";

export type SortDirection = "asc" | "desc";

export type SortControlProps = {
  label: string;
  direction?: SortDirection;
  onToggle?: () => void;
  className?: string;
};

export function SortControl({ label, direction = "asc", onToggle, className }: SortControlProps) {
  return (
    <Button
      type="button"
      size="xs"
      variant="ghost"
      className={cn("gap-1 font-normal text-muted hover:text-foreground", className)}
      onClick={onToggle}
      aria-sort={direction === "asc" ? "ascending" : "descending"}
    >
      {label}
      <span aria-hidden className="text-primary">
        {direction === "asc" ? "↑" : "↓"}
      </span>
    </Button>
  );
}
