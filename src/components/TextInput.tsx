import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const textInputVariants = cva(
  "w-full bg-card text-foreground shadow-sm transition-colors duration-150 placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/30",
  {
    variants: {
      size: {
        xs: "h-6 px-2 text-xs rounded-[var(--radius-xs)]",
        sm: "h-8 px-3 text-[13px] rounded-[var(--radius-sm)]",
        md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
        lg: "h-12 px-5 text-base rounded-[var(--radius-lg)]",
      },
      borderVariant: {
        none: "border-0 shadow-none",
        hairline: "border border-border hover:border-primary/40",
        default: "border border-border hover:border-primary/40",
        emphasis: "border-2 border-primary/30 hover:border-primary/50",
        dashed: "border border-dashed border-border hover:border-primary/40",
      },
    },
    defaultVariants: {
      size: "sm",
      borderVariant: "default",
    },
  },
);

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof textInputVariants>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, size, borderVariant, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(textInputVariants({ size, borderVariant }), className)}
      {...props}
    />
  ),
);

TextInput.displayName = "TextInput";

export { textInputVariants };
