import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Link } from "./Link";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  current?: boolean;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export function Breadcrumbs({ items, separator = "/", className, size = "sm" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const isCurrent = item.current ?? isLast;

          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {i > 0 ? (
                <span className="select-none text-muted/60" aria-hidden>
                  {separator}
                </span>
              ) : null}
              {item.href && !isCurrent ? (
                <Link href={item.href} size={size} variant="muted" underline="hover">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn("text-sm", isCurrent ? "font-medium text-foreground" : "text-muted")}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
