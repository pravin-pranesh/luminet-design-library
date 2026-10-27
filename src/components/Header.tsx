import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Heading } from "./layout/Heading";

export type HeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function Header({ title, subtitle, breadcrumbs, actions, className }: HeaderProps) {
  return (
    <header className={cn("flex flex-col gap-3 border-b border-border bg-card px-6 py-4", className)}>
      {breadcrumbs ? <div className="text-sm">{breadcrumbs}</div> : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Heading level={2} as="h1" className="truncate">
            {title}
          </Heading>
          {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
        </div>
        {actions ? <HeaderActions>{actions}</HeaderActions> : null}
      </div>
    </header>
  );
}

export type HeaderActionsProps = {
  children: ReactNode;
  className?: string;
};

export function HeaderActions({ children, className }: HeaderActionsProps) {
  return (
    <div className={cn("flex shrink-0 flex-wrap items-center gap-2", className)} role="toolbar">
      {children}
    </div>
  );
}
