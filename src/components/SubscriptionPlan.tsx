import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";
import { Button } from "./Button";

const planVariants = cva(
  "flex flex-col rounded-xl border bg-card p-5 transition-all duration-150",
  {
    variants: {
      highlighted: {
        true: "border-primary shadow-md ring-1 ring-primary/20",
        false: "border-border hover:border-primary/30",
      },
      size: {
        sm: "gap-3 text-sm",
        md: "gap-4 text-sm",
        lg: "gap-4 text-base",
      },
    },
    defaultVariants: { highlighted: false, size: "md" },
  },
);

export type SubscriptionPlanProps = VariantProps<typeof planVariants> & {
  name: ReactNode;
  price: ReactNode;
  interval?: ReactNode;
  description?: ReactNode;
  features?: ReactNode[];
  badge?: ReactNode;
  ctaLabel?: string;
  onSelect?: () => void;
  className?: string;
};

export function SubscriptionPlan({
  name,
  price,
  interval = "/ month",
  description,
  features = [],
  badge,
  ctaLabel = "Choose plan",
  onSelect,
  highlighted,
  size,
  className,
}: SubscriptionPlanProps) {
  return (
    <article className={cn(planVariants({ highlighted, size }), className)}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        {badge ? (
          <Badge size="xs" variant="solid">
            {badge}
          </Badge>
        ) : null}
      </div>
      {description ? <p className="text-muted">{description}</p> : null}
      <p className="text-foreground">
        <span className="text-2xl font-bold tabular-nums">{price}</span>
        <span className="text-muted">{interval}</span>
      </p>
      {features.length > 0 ? (
        <ul className="space-y-1.5 text-muted">
          {features.map((f, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary" aria-hidden>
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      ) : null}
      <Button type="button" className="mt-auto w-full" variant={highlighted ? "solid" : "outline"} onClick={onSelect}>
        {ctaLabel}
      </Button>
    </article>
  );
}

export { planVariants };
