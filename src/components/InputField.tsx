import type { ReactNode } from "react";
import { cn } from "../lib/cn";

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-destructive" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export type InputFieldProps = {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export function InputField({
  label,
  helperText,
  error = false,
  errorMessage,
  htmlFor,
  className,
  children,
}: InputFieldProps) {
  const showError = error && errorMessage;
  const message = showError ? errorMessage : helperText;

  return (
    <div className={cn("flex w-full max-w-xl flex-col gap-1.5", className)}>
      {label != null && label !== "" ? (
        <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}
      {children}
      {message ? (
        <div
          className={cn(
            "flex items-start gap-1.5 text-xs leading-snug",
            showError ? "font-medium text-destructive" : "text-muted",
          )}
        >
          {showError ? <ErrorIcon /> : null}
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}
