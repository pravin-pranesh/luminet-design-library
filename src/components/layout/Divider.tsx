import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const dividerVariants = cva("shrink-0 border-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full border-t",
      vertical: "h-full min-h-[1em] w-px border-l self-stretch",
    },
    variant: {
      hairline: "border-border",
      emphasis: "border-primary/20",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "hairline",
  },
});

export type DividerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof dividerVariants>;

export function Divider({ className, orientation, variant, role = "separator", ...props }: DividerProps) {
  return (
    <div
      role={role}
      aria-orientation={orientation ?? "horizontal"}
      className={cn(dividerVariants({ orientation, variant }), className)}
      {...props}
    />
  );
}

export { dividerVariants };
