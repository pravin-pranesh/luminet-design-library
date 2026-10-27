import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { checkboxColors, type CheckboxColor } from "./Checkbox";
import { useRadioButtonGroupContext } from "./RadioButtonGroup";

export type RadioButtonColor = CheckboxColor;

export { checkboxColors as radioButtonColors };

const radioOuterVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-card transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const radioInnerSize: Record<"sm" | "md" | "lg", string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-destructive" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export type RadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "checked" | "defaultChecked" | "color"
> &
  VariantProps<typeof radioOuterVariants> & {
    value: string;
    label?: ReactNode;
    helperText?: ReactNode;
    error?: boolean;
    errorMessage?: ReactNode;
    color?: RadioButtonColor;
    isDisabled?: boolean;
    labelClampLines?: number;
  };

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      size = "md",
      color = "primary",
      value,
      label,
      helperText,
      error = false,
      errorMessage,
      isDisabled = false,
      labelClampLines,
      id: idProp,
      name: nameProp,
      onChange,
      ...props
    },
    ref,
  ) => {
    const group = useRadioButtonGroupContext();
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const name = nameProp ?? group?.name;
    const groupDisabled = group?.isDisabled ?? false;
    const disabled = isDisabled || groupDisabled;
    const checked = group ? group.value === value : undefined;
    const fillColor = checkboxColors[color];

    const showError = error && errorMessage;
    const message = showError ? errorMessage : helperText;

    const labelSizeClass =
      size === "sm" ? "text-[13px]" : size === "lg" ? "text-base" : "text-sm";

    const clampStyle =
      labelClampLines && labelClampLines > 0
        ? {
            display: "-webkit-box",
            WebkitLineClamp: labelClampLines,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }
        : undefined;

    const labelTitle =
      labelClampLines && labelClampLines > 0 && typeof label === "string" ? label : undefined;

    const messageIndent =
      size === "sm" ? "1.625rem" : size === "lg" ? "2.125rem" : "1.875rem";

    return (
      <div className={cn("inline-flex max-w-full flex-col gap-1", className)}>
        <label
          htmlFor={id}
          className={cn(
            "inline-flex max-w-full cursor-pointer items-start gap-2.5",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <span className="relative mt-0.5 inline-flex">
            <input
              ref={ref}
              id={id}
              type="radio"
              name={name}
              value={value}
              disabled={disabled}
              checked={group ? checked : undefined}
              onChange={(event) => {
                if (group) {
                  group.setValue(value);
                }
                onChange?.(event);
              }}
              aria-invalid={error || undefined}
              className="peer sr-only focus-visible:outline-none"
              {...props}
            />
            <span
              className={cn(
                radioOuterVariants({ size }),
                "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
                error && !checked && "border-destructive",
              )}
              style={checked ? { borderColor: fillColor } : undefined}
              aria-hidden
            >
              {checked ? (
                <span
                  className={cn("rounded-full", radioInnerSize[size ?? "md"])}
                  style={{ backgroundColor: fillColor }}
                />
              ) : null}
            </span>
          </span>
          {label != null && label !== "" ? (
            <span
              className={cn("min-w-0 font-medium text-foreground", labelSizeClass)}
              style={clampStyle}
              title={labelTitle}
            >
              {label}
            </span>
          ) : null}
        </label>
        {message ? (
          <div
            className={cn(
              "flex items-start gap-1.5",
              showError ? "text-destructive" : "text-muted",
            )}
            style={{ paddingLeft: messageIndent }}
          >
            {showError ? <ErrorIcon /> : null}
            <span className={cn("text-xs leading-snug", showError && "font-medium")}>{message}</span>
          </div>
        ) : null}
      </div>
    );
  },
);

RadioButton.displayName = "RadioButton";

export { radioOuterVariants };
