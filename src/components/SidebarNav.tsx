import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Link } from "./Link";

export type SidebarNavItem = {
  id: string;
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export type SidebarNavProps = {
  items: SidebarNavItem[];
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function SidebarNav({ items, header, footer, className }: SidebarNavProps) {
  return (
    <nav className={cn("flex h-full flex-col border-r border-border bg-card", className)} aria-label="Sidebar">
      {header ? <div className="border-b border-border px-4 py-3">{header}</div> : null}
      <ul className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {items.map((item) => {
          const rowClass = cn(
            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150",
            item.active
              ? "bg-primary/[0.08] font-medium text-primary"
              : "text-foreground hover:bg-foreground/[0.04]",
          );
          const content = (
            <>
              {item.active ? <span className="w-0.5 self-stretch rounded-full bg-primary" aria-hidden /> : null}
              {item.icon ? <span className="shrink-0 text-muted">{item.icon}</span> : null}
              <span className="truncate">{item.label}</span>
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? (
                <Link href={item.href} className={rowClass} aria-current={item.active ? "page" : undefined}>
                  {content}
                </Link>
              ) : (
                <button type="button" className={rowClass} onClick={item.onClick} aria-current={item.active ? "page" : undefined}>
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {footer ? <div className="border-t border-border p-3">{footer}</div> : null}
    </nav>
  );
}
