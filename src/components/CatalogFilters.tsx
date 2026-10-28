import { cn } from "../lib/cn";
import { Button } from "./Button";
import { FilterSidebar, type FilterSidebarSection } from "./FilterSidebar";

export type CatalogSort = { id: string; label: string };

export type CatalogFiltersProps = {
  sections: FilterSidebarSection[];
  sortOptions?: CatalogSort[];
  sortValue?: string;
  onSortChange?: (id: string) => void;
  onToggle?: (sectionId: string, optionId: string) => void;
  onClear?: () => void;
  activeCount?: number;
  className?: string;
};

export function CatalogFilters({
  sections,
  sortOptions = [],
  sortValue,
  onSortChange,
  onToggle,
  onClear,
  activeCount,
  className,
}: CatalogFiltersProps) {
  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row", className)}>
      <FilterSidebar sections={sections} onToggle={onToggle} onClear={onClear} activeCount={activeCount} width="md" />
      {sortOptions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 lg:hidden">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">Sort</span>
          {sortOptions.map((opt) => (
            <Button
              key={opt.id}
              type="button"
              size="xs"
              variant={sortValue === opt.id ? "solid" : "outline"}
              onClick={() => onSortChange?.(opt.id)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
