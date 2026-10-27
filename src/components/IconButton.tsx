import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { buttonVariants } from "./Button";

const iconButtonVariants = cva("aspect-square p-0", {
  variants: {
    size: {
      xs: "size-6 [&_svg]:size-3.5",
      sm: "size-8 [&_svg]:size-4",
      md: "size-10 [&_svg]:size-5",
      lg: "size-12 [&_svg]:size-6",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  VariantProps<typeof iconButtonVariants> & {
    "aria-label": string;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "sm", variant = "ghost", borderVariant, type = "button", children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        buttonVariants({ variant, borderVariant, size: undefined }),
        iconButtonVariants({ size }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
IconButton.displayName = "IconButton";

export { iconButtonVariants };
