import type { FormHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export type FormWrapperProps = FormHTMLAttributes<HTMLFormElement> & {
  title?: ReactNode;
  description?: ReactNode;
  submitLabel?: string;
  footer?: ReactNode;
  layout?: "stack" | "grid";
};

export function FormWrapper({
  title,
  description,
  children,
  submitLabel = "Submit",
  footer,
  layout = "stack",
  className,
  ...props
}: FormWrapperProps) {
  return (
    <form
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <header className="mb-5 border-b border-border pb-4">
          {title ? <h3 className="text-base font-semibold text-foreground">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
        </header>
      )}
      <div
        className={cn(
          layout === "grid" ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4",
        )}
      >
        {children}
      </div>
      <footer className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-border pt-4">
        {footer ?? (
          <Button type="submit" size="md">
            {submitLabel}
          </Button>
        )}
      </footer>
    </form>
  );
}
