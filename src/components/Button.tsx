import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 text-xs rounded-[var(--radius-xs)] [&_svg]:size-3.5",
        sm: "h-8 gap-1.5 px-3 text-[13px] rounded-[var(--radius-sm)] [&_svg]:size-4",
        md: "h-10 gap-2 px-4 text-sm rounded-[var(--radius-md)] [&_svg]:size-5",
        lg: "h-12 gap-2.5 px-5 text-base rounded-[var(--radius-lg)] [&_svg]:size-6",
      },
      variant: {
        solid:
          "bg-primary text-white hover:bg-primary-hover active:brightness-95",
        outline:
          "border bg-card text-foreground hover:border-primary/40",
        ghost: "text-foreground hover:bg-foreground/5",
        link: "h-auto min-h-0 px-0 text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white hover:bg-destructive-hover active:brightness-95",
      },
      borderVariant: {
        none: "border-transparent",
        hairline: "border-border",
        default: "border-border",
        emphasis: "border-2 border-primary/30",
        dashed: "border-dashed border-border",
      },
    },
    compoundVariants: [
      { variant: "solid", borderVariant: "none", className: "border-transparent" },
      { variant: "solid", borderVariant: "hairline", className: "border-transparent" },
      { variant: "solid", borderVariant: "default", className: "border-transparent" },
      { variant: "solid", borderVariant: "emphasis", className: "border-transparent" },
      { variant: "solid", borderVariant: "dashed", className: "border-transparent" },
      { variant: "ghost", borderVariant: "none", className: "border-transparent" },
      { variant: "ghost", borderVariant: "hairline", className: "border border-border" },
      { variant: "ghost", borderVariant: "default", className: "border border-border" },
      { variant: "ghost", borderVariant: "emphasis", className: "border-2 border-primary/30" },
      { variant: "ghost", borderVariant: "dashed", className: "border border-dashed border-border" },
      { variant: "link", className: "border-0 bg-transparent shadow-none" },
      { variant: "destructive", className: "border-transparent" },
    ],
    defaultVariants: {
      size: "md",
      variant: "solid",
      borderVariant: "none",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, borderVariant, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ size, variant, borderVariant }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { buttonVariants };
