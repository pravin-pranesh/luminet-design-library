import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const deliveryVariants = cva("inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
    tone: {
      neutral: "text-foreground",
      success: "border-success/30 bg-success/[0.04] text-foreground",
      warning: "border-warning/30 bg-warning/[0.04] text-foreground",
    },
  },
  defaultVariants: { size: "sm", tone: "neutral" },
});

export type DeliveryEstimateProps = VariantProps<typeof deliveryVariants> & {
  label?: ReactNode;
  dateRange: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function DeliveryEstimate({
  label = "Estimated delivery",
  dateRange,
  icon,
  size,
  tone,
  className,
}: DeliveryEstimateProps) {
  return (
    <div className={cn(deliveryVariants({ size, tone }), className)}>
      {icon ? <span className="shrink-0 text-primary">{icon}</span> : null}
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{dateRange}</span>
    </div>
  );
}

export { deliveryVariants };
