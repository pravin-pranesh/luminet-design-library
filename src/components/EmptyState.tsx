import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Heading } from "./layout/Heading";

export type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  children?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-dashed border-border bg-card px-6 py-12 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-4 text-muted [&_svg]:size-12">{icon}</div> : null}
      <Heading level={4} as="h3">
        {title}
      </Heading>
      {description ? <p className="mt-2 max-w-sm text-sm text-muted">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button className="mt-6" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      {children}
    </div>
  );
}
