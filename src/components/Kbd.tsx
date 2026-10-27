import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded border border-border bg-foreground/[0.04] font-mono font-medium text-foreground shadow-sm",
  {
    variants: {
      size: {
        xs: "min-h-5 px-1 text-[10px]",
        sm: "min-h-6 px-1.5 text-xs",
        md: "min-h-7 px-2 text-xs",
        lg: "min-h-8 px-2.5 text-sm",
      },
    },
    defaultVariants: { size: "sm" },
  },
);

export type KbdProps = HTMLAttributes<HTMLElement> & VariantProps<typeof kbdVariants>;

export function Kbd({ className, size, children, ...props }: KbdProps) {
  return (
    <kbd className={cn(kbdVariants({ size }), className)} {...props}>
      {children}
    </kbd>
  );
}

export { kbdVariants };
