import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { checkboxColors, type CheckboxColor } from "./Checkbox";

export type ToggleSwitchColor = CheckboxColor;
export { checkboxColors as toggleSwitchColors };

const trackVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted/30 transition-colors duration-200 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[3.25rem]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const thumbSize: Record<"sm" | "md" | "lg", string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

const thumbOnTranslate: Record<"sm" | "md" | "lg", string> = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-6",
};

export type ToggleSwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "color" | "role"
> &
  VariantProps<typeof trackVariants> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: boolean;
    errorMessage?: ReactNode;
    color?: ToggleSwitchColor;
    isChecked?: boolean;
    defaultChecked?: boolean;
    isDisabled?: boolean;
  };

export const ToggleSwitch = forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  (
    {
      className,
      size = "md",
      color = "primary",
      label,
      helperText,
      error = false,
      errorMessage,
      isChecked,
      defaultChecked = false,
      isDisabled = false,
      id: idProp,
      onClick,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const controlled = isChecked !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const checked = controlled ? Boolean(isChecked) : uncontrolled;
    const fillColor = checkboxColors[color];
    const showError = error && errorMessage;
    const message = showError ? errorMessage : helperText;

    return (
      <div className={cn("inline-flex max-w-full flex-col gap-1", className)}>
        <div
          className={cn(
            "inline-flex items-center gap-3",
            isDisabled && "cursor-not-allowed opacity-50",
          )}
        >
          <button
            ref={ref}
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-invalid={error || undefined}
            disabled={isDisabled}
            className={cn("peer relative inline-flex shrink-0", trackVariants({ size }))}
            style={checked ? { backgroundColor: fillColor, borderColor: fillColor } : undefined}
            onClick={(e) => {
              if (!controlled) setUncontrolled((v) => !v);
              onClick?.(e);
            }}
            {...props}
          >
            <span
              className={cn(
                "pointer-events-none inline-block translate-x-0.5 rounded-full bg-card shadow-sm transition-transform duration-200",
                thumbSize[size ?? "md"],
                checked && thumbOnTranslate[size ?? "md"],
              )}
              aria-hidden
            />
          </button>
          {label != null && label !== "" ? (
            <label htmlFor={id} className="cursor-pointer text-sm font-medium text-foreground">
              {label}
            </label>
          ) : null}
        </div>
        {message ? (
          <span
            className={cn(
              "text-xs leading-snug",
              showError ? "font-medium text-destructive" : "text-muted",
            )}
          >
            {message}
          </span>
        ) : null}
      </div>
    );
  },
);

ToggleSwitch.displayName = "ToggleSwitch";

export { trackVariants as toggleSwitchTrackVariants };
