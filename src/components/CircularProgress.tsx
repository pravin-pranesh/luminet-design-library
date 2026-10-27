import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const circularProgressVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      xs: "size-4",
      sm: "size-5",
      md: "size-8",
      lg: "size-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CircularProgressProps = VariantProps<typeof circularProgressVariants> & {
  className?: string;
  "aria-label"?: string;
};

export function CircularProgress({ size, className, "aria-label": ariaLabel = "Loading" }: CircularProgressProps) {
  return (
    <svg
      className={cn(circularProgressVariants({ size }), className)}
      viewBox="0 0 24 24"
      fill="none"
      role="progressbar"
      aria-label={ariaLabel}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { circularProgressVariants };
