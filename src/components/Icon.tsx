import { cva, type VariantProps } from "class-variance-authority";
import type { SVGAttributes } from "react";
import { cn } from "../lib/cn";

const iconVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
    color: {
      inherit: "text-inherit",
      muted: "text-muted",
      primary: "text-primary",
      foreground: "text-foreground",
      destructive: "text-destructive",
      success: "text-success",
    },
  },
  defaultVariants: { size: "md", color: "inherit" },
});

export type IconProps = SVGAttributes<SVGSVGElement> &
  VariantProps<typeof iconVariants> & {
    children: React.ReactNode;
  };

export function Icon({ size, color, className, children, viewBox = "0 0 24 24", ...props }: IconProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconVariants({ size, color }), className)}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export { iconVariants };
