import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const planPillVariants = cva("inline-flex items-center gap-1.5 rounded-full border font-medium", {
  variants: {
    plan: {
      free: "border-border bg-foreground/[0.04] text-muted",
      starter: "border-primary/25 bg-primary/[0.06] text-primary",
      growth: "border-primary bg-primary text-white",
      enterprise: "border-foreground/20 bg-foreground text-background",
    },
    size: {
      xs: "px-2 py-0.5 text-[10px]",
      sm: "px-2.5 py-0.5 text-xs",
      md: "px-3 py-1 text-xs",
      lg: "px-3.5 py-1 text-sm",
    },
  },
  defaultVariants: { plan: "starter", size: "sm" },
});

export type PlanPillProps = VariantProps<typeof planPillVariants> & {
  children?: ReactNode;
  className?: string;
};

export function PlanPill({ plan, size, children, className }: PlanPillProps) {
  return (
    <span className={cn(planPillVariants({ plan, size }), className)}>
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {children ?? (plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "Plan")}
    </span>
  );
}

export { planPillVariants };
