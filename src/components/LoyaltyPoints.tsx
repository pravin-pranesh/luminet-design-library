import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

const loyaltyVariants = cva("flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3", {
  variants: {
    variant: {
      default: "border-border bg-card",
      highlight: "border-primary/30 bg-primary/[0.05]",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export type LoyaltyPointsProps = VariantProps<typeof loyaltyVariants> & {
  balance: ReactNode;
  label?: ReactNode;
  redeemLabel?: string;
  onRedeem?: () => void;
  className?: string;
};

export function LoyaltyPoints({
  balance,
  label = "Loyalty points",
  redeemLabel = "Redeem",
  onRedeem,
  variant,
  size,
  className,
}: LoyaltyPointsProps) {
  return (
    <div className={cn(loyaltyVariants({ variant, size }), className)}>
      <div>
        <p className="text-muted">{label}</p>
        <p className="text-lg font-semibold tabular-nums text-foreground">{balance}</p>
      </div>
      {onRedeem ? (
        <Button type="button" size="sm" variant="outline" onClick={onRedeem}>
          {redeemLabel}
        </Button>
      ) : null}
    </div>
  );
}

export { loyaltyVariants };
