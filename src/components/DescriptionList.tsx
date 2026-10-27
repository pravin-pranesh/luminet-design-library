import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type DescriptionListItem = {
  term: ReactNode;
  description: ReactNode;
};

export type DescriptionListProps = {
  items: DescriptionListItem[];
  columns?: 1 | 2;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const sizeTerm = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};

const sizeDesc = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

export function DescriptionList({ items, columns = 1, size = "md", className }: DescriptionListProps) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-4",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={i} className="min-w-0">
          <dt className={cn("font-medium text-muted", sizeTerm[size])}>{item.term}</dt>
          <dd className={cn("mt-1 text-foreground", sizeDesc[size])}>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
