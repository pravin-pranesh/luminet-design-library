import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "./Alert";
import { Button } from "./Button";

export type ErrorStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  children?: ReactNode;
};

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content. Try again in a moment.",
  onRetry,
  retryLabel = "Try again",
  className,
  children,
}: ErrorStateProps) {
  return (
    <div className={cn("max-w-lg", className)}>
      <Alert variant="error" role="alert">
        <AlertIcon variant="error" />
        <div className="flex-1">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
          {onRetry ? (
            <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
              {retryLabel}
            </Button>
          ) : null}
          {children}
        </div>
      </Alert>
    </div>
  );
}
