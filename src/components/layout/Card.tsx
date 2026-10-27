import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const cardVariants = cva("rounded-[var(--radius-md)] bg-card text-foreground transition-shadow duration-150", {
  variants: {
    variant: {
      elevated: "shadow-sm",
      outline: "border border-border",
      ghost: "bg-transparent",
    },
    interactive: {
      true: "cursor-pointer hover:shadow-md",
      false: "",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "outline",
    interactive: false,
    padding: "md",
  },
});

export type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, interactive, padding }), className)} {...props} />
  ),
);
Card.displayName = "Card";

export { cardVariants };
