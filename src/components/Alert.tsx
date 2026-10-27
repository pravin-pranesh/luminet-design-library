import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-sm transition-colors duration-150",
  {
    variants: {
      variant: {
        info: "border-border bg-card text-foreground",
        success: "border-success/30 bg-success/5 text-foreground",
        warning: "border-warning/40 bg-warning/5 text-foreground",
        error: "border-destructive/40 bg-destructive/5 text-foreground",
      },
      size: {
        sm: "py-2.5 text-xs",
        md: "py-3 text-sm",
        lg: "py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
    },
  },
);

export type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    accentBar?: boolean;
  };

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, accentBar = true, role = "status", ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      className={cn(
        alertVariants({ variant, size }),
        accentBar &&
          variant === "info" &&
          "border-l-4 border-l-primary pl-3",
        accentBar &&
          variant === "success" &&
          "border-l-4 border-l-success pl-3",
        accentBar &&
          variant === "warning" &&
          "border-l-4 border-l-warning pl-3",
        accentBar &&
          variant === "error" &&
          "border-l-4 border-l-destructive pl-3",
        className,
      )}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <h5 className={cn("mb-0.5 font-semibold leading-snug tracking-tight", className)} {...props} />;
}

export type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <p className={cn("text-muted [&_strong]:text-foreground", className)} {...props} />;
}

const iconMap = {
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 shrink-0 text-primary" aria-hidden>
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 shrink-0 text-success" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 shrink-0 text-warning" aria-hidden>
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 shrink-0 text-destructive" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
} as const;

export type AlertIconProps = {
  variant?: keyof typeof iconMap;
  children?: ReactNode;
  className?: string;
};

export function AlertIcon({ variant = "info", children, className }: AlertIconProps) {
  return (
    <span className={cn("mt-0.5 flex shrink-0", className)} aria-hidden>
      {children ?? iconMap[variant]}
    </span>
  );
}

export { alertVariants };
