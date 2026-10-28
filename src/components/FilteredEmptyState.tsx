import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

export type FilteredEmptyStateProps = Omit<EmptyStateProps, "actionLabel" | "onAction" | "title"> & {
  title?: EmptyStateProps["title"];
  onClearFilters?: () => void;
  clearLabel?: string;
  activeFilterCount?: number;
  footer?: ReactNode;
};

export function FilteredEmptyState({
  title = "No results match your filters",
  description = "Try adjusting or clearing filters to see more items.",
  onClearFilters,
  clearLabel = "Clear filters",
  activeFilterCount,
  className,
  footer,
  ...rest
}: FilteredEmptyStateProps) {
  const label =
    activeFilterCount != null && activeFilterCount > 0
      ? `${clearLabel} (${activeFilterCount})`
      : clearLabel;

  return (
    <EmptyState
      title={title}
      description={description}
      className={cn(className)}
      actionLabel={onClearFilters ? label : undefined}
      onAction={onClearFilters}
      {...rest}
    >
      {footer}
    </EmptyState>
  );
}
