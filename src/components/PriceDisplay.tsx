import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const priceDisplayVariants = cva("inline-flex items-baseline gap-2 tabular-nums", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl font-semibold",
    },
    align: {
      start: "justify-start",
      end: "justify-end",
    },
  },
  defaultVariants: { size: "md", align: "start" },
});

export type PriceDisplayProps = VariantProps<typeof priceDisplayVariants> & {
  price: ReactNode;
  compareAt?: ReactNode;
  currency?: ReactNode;
  className?: string;
};

export function PriceDisplay({ price, compareAt, currency, size, align, className }: PriceDisplayProps) {
  return (
    <div className={cn(priceDisplayVariants({ size, align }), className)}>
      {currency ? <span className="text-muted">{currency}</span> : null}
      <span className="font-semibold text-foreground">{price}</span>
      {compareAt ? <span className="font-normal text-muted line-through">{compareAt}</span> : null}
    </div>
  );
}

export { priceDisplayVariants };
