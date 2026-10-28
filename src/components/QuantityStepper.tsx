import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { Button } from "./Button";

const stepperVariants = cva("inline-flex items-center rounded-md border border-border bg-card", {
  variants: {
    size: {
      xs: "h-7 text-xs",
      sm: "h-8 text-sm",
      md: "h-9 text-sm",
      lg: "h-10 text-base",
    },
  },
  defaultVariants: { size: "md" },
});

export type QuantityStepperProps = VariantProps<typeof stepperVariants> & {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled,
  size,
  className,
  ariaLabel = "Quantity",
}: QuantityStepperProps) {
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));

  return (
    <div
      className={cn(stepperVariants({ size }), disabled && "opacity-50", className)}
      role="group"
      aria-label={ariaLabel}
    >
      <Button type="button" variant="ghost" size="xs" disabled={disabled || value <= min} aria-label="Decrease" onClick={dec}>
        −
      </Button>
      <span className="min-w-[2.25rem] text-center font-medium tabular-nums text-foreground" aria-live="polite">
        {value}
      </span>
      <Button type="button" variant="ghost" size="xs" disabled={disabled || value >= max} aria-label="Increase" onClick={inc}>
        +
      </Button>
    </div>
  );
}

export { stepperVariants };
