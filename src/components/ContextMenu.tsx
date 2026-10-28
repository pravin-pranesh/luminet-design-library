import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type ContextMenuItem = {
  id: string;
  label: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  className?: string;
  label?: string;
};

export function ContextMenu({ items, className, label = "Actions" }: ContextMenuProps) {
  return (
    <ul
      role="menu"
      aria-label={label}
      className={cn("min-w-[10rem] overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg", className)}
    >
      {items.map((item) => (
        <li key={item.id} role="none">
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={item.onSelect}
            className={cn(
              "flex w-full px-3 py-2 text-left text-sm transition-colors duration-150 disabled:opacity-50",
              item.destructive
                ? "text-destructive hover:bg-destructive/10"
                : "text-foreground hover:bg-foreground/[0.04]",
            )}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
