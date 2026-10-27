import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const headingVariants = cva("font-semibold tracking-tight text-foreground", {
  variants: {
    level: {
      1: "text-3xl",
      2: "text-2xl",
      3: "text-xl",
      4: "text-lg",
      5: "text-base",
      6: "text-sm",
    },
    muted: {
      true: "text-muted font-medium",
      false: "",
    },
  },
  defaultVariants: {
    level: 2,
    muted: false,
  },
});

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, muted, as, ...props }, ref) => {
    const Tag = as ?? (`h${level}` as "h1");
    return <Tag ref={ref} className={cn(headingVariants({ level, muted }), className)} {...props} />;
  },
);
Heading.displayName = "Heading";

export { headingVariants };
