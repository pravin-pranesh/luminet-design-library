import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-sm",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary-hover",
        muted: "text-muted hover:text-foreground",
        destructive: "text-destructive hover:text-destructive-hover",
      },
      underline: {
        none: "no-underline",
        hover: "no-underline hover:underline underline-offset-4",
        always: "underline underline-offset-4",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: "hover",
      size: "sm",
    },
  },
);

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof linkVariants>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, size, ...props }, ref) => (
    <a ref={ref} className={cn(linkVariants({ variant, underline, size }), className)} {...props} />
  ),
);
Link.displayName = "Link";

export { linkVariants };
