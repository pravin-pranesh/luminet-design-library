import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors duration-150",
  {
    variants: {
      size: {
        xs: "h-5 gap-1 px-1.5 text-[10px] rounded-[var(--radius-xs)]",
        sm: "h-6 gap-1 px-2 text-xs rounded-[var(--radius-sm)]",
        md: "h-7 gap-1.5 px-2.5 text-xs rounded-[var(--radius-sm)]",
        lg: "h-8 gap-2 px-3 text-sm rounded-[var(--radius-md)]",
      },
      variant: {
        solid: "bg-primary text-white",
        outline: "border border-border bg-card text-foreground",
        subtle: "bg-foreground/5 text-foreground",
        success: "bg-success/15 text-success",
        warning: "bg-warning/15 text-warning",
        destructive: "bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "subtle",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ size, variant }), className)} {...props} />
  ),
);
Badge.displayName = "Badge";

export { badgeVariants };
