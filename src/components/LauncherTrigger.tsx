import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const launcherTriggerVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-border bg-card font-medium text-foreground shadow-sm transition-all duration-150 hover:border-primary/40 hover:bg-primary/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
  {
    variants: {
      size: {
        xs: "size-8 text-xs",
        sm: "size-9 text-sm",
        md: "size-10 text-sm",
        lg: "size-11 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type LauncherTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  VariantProps<typeof launcherTriggerVariants> & {
    label?: string;
  };

export const LauncherTrigger = forwardRef<HTMLButtonElement, LauncherTriggerProps>(
  ({ className, size, label = "Open launcher", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(launcherTriggerVariants({ size }), className)}
      aria-label={label}
      {...props}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-[1.1em]" aria-hidden>
        <path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm8 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm8 0a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" />
      </svg>
    </button>
  ),
);
LauncherTrigger.displayName = "LauncherTrigger";

export { launcherTriggerVariants };
