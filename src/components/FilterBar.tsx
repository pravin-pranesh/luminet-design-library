import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Search } from "./Search";

export type FilterChip = {
  id: string;
  label: string;
  active?: boolean;
};

export type FilterBarProps = {
  chips?: FilterChip[];
  onChipToggle?: (id: string) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  onClear?: () => void;
  className?: string;
};

export function FilterBar({
  chips = [],
  onChipToggle,
  onSearch,
  searchPlaceholder = "Filter…",
  onClear,
  className,
}: FilterBarProps) {
  const activeCount = chips.filter((c) => c.active).length;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 shadow-sm",
        className,
      )}
    >
      <Search
        size="sm"
        placeholder={searchPlaceholder}
        className="min-w-[12rem] flex-1"
        onChange={(e) => onSearch?.(e.target.value)}
        aria-label="Filter search"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map((chip) => (
          <Button
            key={chip.id}
            type="button"
            size="xs"
            variant={chip.active ? "solid" : "outline"}
            onClick={() => onChipToggle?.(chip.id)}
          >
            {chip.label}
          </Button>
        ))}
      </div>
      {activeCount > 0 && onClear ? (
        <Button type="button" size="xs" variant="ghost" onClick={onClear}>
          Clear ({activeCount})
        </Button>
      ) : null}
    </div>
  );
}
