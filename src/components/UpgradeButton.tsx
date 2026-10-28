import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const upgradeButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
  {
    variants: {
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-base",
      },
      variant: {
        solid: "bg-primary text-white hover:bg-primary-hover",
        outline: "border border-primary/40 text-primary hover:bg-primary/[0.06]",
      },
    },
    defaultVariants: { size: "sm", variant: "solid" },
  },
);

export type UpgradeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  VariantProps<typeof upgradeButtonVariants> & {
    label?: string;
  };

export const UpgradeButton = forwardRef<HTMLButtonElement, UpgradeButtonProps>(
  ({ className, size, variant, label = "Upgrade", ...props }, ref) => (
    <button ref={ref} type="button" className={cn(upgradeButtonVariants({ size, variant }), className)} {...props}>
      {label}
    </button>
  ),
);
UpgradeButton.displayName = "UpgradeButton";

export { upgradeButtonVariants };
