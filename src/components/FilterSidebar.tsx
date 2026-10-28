import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Heading } from "./layout/Heading";

export type FilterSidebarSection = {
  id: string;
  title: ReactNode;
  options: { id: string; label: ReactNode; checked?: boolean }[];
};

export type FilterSidebarProps = {
  sections: FilterSidebarSection[];
  onToggle?: (sectionId: string, optionId: string) => void;
  onClear?: () => void;
  activeCount?: number;
  className?: string;
  width?: "sm" | "md" | "lg";
};

const widthClass = { sm: "w-56", md: "w-64", lg: "w-72" } as const;

export function FilterSidebar({
  sections,
  onToggle,
  onClear,
  activeCount = 0,
  className,
  width = "md",
}: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col rounded-lg border border-border bg-card shadow-sm",
        widthClass[width],
        className,
      )}
      aria-label="Filters"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <Heading level={5} as="h2">
          Filters
        </Heading>
        {onClear && activeCount > 0 ? (
          <Button type="button" size="xs" variant="ghost" onClick={onClear}>
            Clear ({activeCount})
          </Button>
        ) : null}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {sections.map((section) => (
          <fieldset key={section.id} className="mb-6 last:mb-0">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {section.title}
            </legend>
            <ul className="space-y-2">
              {section.options.map((opt) => (
                <li key={opt.id}>
                  <Checkbox
                    label={opt.label}
                    size="sm"
                    isChecked={opt.checked}
                    onChange={() => onToggle?.(section.id, opt.id)}
                  />
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </aside>
  );
}
