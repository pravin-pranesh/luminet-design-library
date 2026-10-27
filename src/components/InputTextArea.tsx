import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";

const inputTextAreaVariants = cva(
  "w-full resize-y bg-card text-foreground shadow-sm transition-colors duration-150 placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/30",
  {
    variants: {
      size: {
        xs: "min-h-[4rem] px-2 py-1.5 text-xs rounded-[var(--radius-xs)]",
        sm: "min-h-[5rem] px-3 py-2 text-[13px] rounded-[var(--radius-sm)]",
        md: "min-h-[6rem] px-4 py-2.5 text-sm rounded-[var(--radius-md)]",
        lg: "min-h-[7rem] px-5 py-3 text-base rounded-[var(--radius-lg)]",
      },
      borderVariant: {
        none: "border-0 shadow-none",
        hairline: "border border-border hover:border-primary/40",
        default: "border border-border hover:border-primary/40",
        emphasis: "border-2 border-primary/30 hover:border-primary/50",
        dashed: "border border-dashed border-border hover:border-primary/40",
      },
    },
    defaultVariants: { size: "sm", borderVariant: "default" },
  },
);

export type InputTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> &
  VariantProps<typeof inputTextAreaVariants> & {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
  };

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  (
    {
      className,
      size,
      borderVariant,
      label,
      helperText,
      error,
      errorMessage,
      id,
      ...props
    },
    ref,
  ) => {
    const field = (
      <textarea
        ref={ref}
        id={id}
        aria-invalid={error || undefined}
        className={cn(inputTextAreaVariants({ size, borderVariant }), className)}
        {...props}
      />
    );

    if (label || helperText || errorMessage) {
      return (
        <InputField
          label={label}
          helperText={helperText}
          error={error}
          errorMessage={errorMessage}
          htmlFor={id}
        >
          {field}
        </InputField>
      );
    }

    return field;
  },
);

InputTextArea.displayName = "InputTextArea";

export { inputTextAreaVariants };
