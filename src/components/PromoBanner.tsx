import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

const promoBannerVariants = cva("flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3", {
  variants: {
    variant: {
      primary: "border-primary/30 bg-primary/[0.06] text-foreground",
      neutral: "border-border bg-foreground/[0.03] text-foreground",
      success: "border-success/30 bg-success/[0.06] text-foreground",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type PromoBannerProps = VariantProps<typeof promoBannerVariants> & {
  title: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
};

export function PromoBanner({
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  variant,
  size,
  className,
}: PromoBannerProps) {
  return (
    <div className={cn(promoBannerVariants({ variant, size }), className)} role="region" aria-label="Promotion">
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        {description ? <p className="mt-0.5 text-muted">{description}</p> : null}
      </div>
      <div className="flex shrink-0 gap-2">
        {actionLabel && onAction ? (
          <Button type="button" size="sm" variant="solid" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
        {onDismiss ? (
          <Button type="button" size="sm" variant="ghost" aria-label="Dismiss" onClick={onDismiss}>
            ×
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export { promoBannerVariants };
