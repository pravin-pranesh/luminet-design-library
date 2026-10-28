import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

const listIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150",
  {
    variants: {
      size: {
        xs: "size-6 [&_svg]:size-3.5",
        sm: "size-7 [&_svg]:size-4",
        md: "size-8 [&_svg]:size-4.5",
        lg: "size-10 [&_svg]:size-5",
      },
      tone: {
        neutral: "bg-foreground/[0.04]",
        primary: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { size: "md", tone: "neutral" },
  },
);

export type ListIconProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof listIconVariants> & {
    children: ReactNode;
  };

export const ListIcon = forwardRef<HTMLSpanElement, ListIconProps>(
  ({ className, size, tone, children, ...props }, ref) => (
    <span ref={ref} className={cn(listIconVariants({ size, tone }), className)} aria-hidden {...props}>
      {children}
    </span>
  ),
);
ListIcon.displayName = "ListIcon";

export { listIconVariants };
