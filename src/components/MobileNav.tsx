import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type MobileNavItem = {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export type MobileNavProps = {
  items: MobileNavItem[];
  className?: string;
};

export function MobileNav({ items, className }: MobileNavProps) {
  return (
    <nav
      className={cn(
        "flex items-stretch justify-around border-t border-border bg-card px-2 py-1.5 shadow-[0_-4px_24px_rgba(15,23,42,0.06)]",
        className,
      )}
      aria-label="Mobile navigation"
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          className={cn(
            "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors duration-150",
            item.active ? "text-primary" : "text-muted hover:text-foreground",
          )}
          aria-current={item.active ? "page" : undefined}
        >
          <span className={cn("text-base", item.active && "text-primary")}>{item.icon}</span>
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
