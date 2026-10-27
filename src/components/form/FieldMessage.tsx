import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const fieldMessageVariants = cva("flex items-start gap-1.5 text-xs leading-snug", {
  variants: {
    variant: {
      helper: "text-muted",
      error: "font-medium text-destructive",
      success: "text-success",
      warning: "text-warning",
    },
    size: {
      xs: "text-[11px]",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    variant: "helper",
    size: "sm",
  },
});

export type FieldMessageProps = VariantProps<typeof fieldMessageVariants> & {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function FieldMessage({ variant, size, className, children, id }: FieldMessageProps) {
  if (children == null || children === "") return null;

  return (
    <p id={id} role={variant === "error" ? "alert" : undefined} className={cn(fieldMessageVariants({ variant, size }), className)}>
      {variant === "error" ? <ErrorIcon /> : null}
      <span>{children}</span>
    </p>
  );
}

export { fieldMessageVariants };
