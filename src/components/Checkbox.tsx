import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

export const checkboxColors = {
  primary: "var(--color-control-primary)",
  success: "var(--color-control-success)",
  warning: "var(--color-control-warning)",
  destructive: "var(--color-control-destructive)",
  accent: "var(--color-control-accent)",
  neutral: "var(--color-control-neutral)",
} as const;

export type CheckboxColor = keyof typeof checkboxColors;

const checkboxBoxVariants = cva(
  "inline-flex shrink-0 items-center justify-center border border-border bg-card text-white transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "size-4 rounded-[4px] [&_svg]:size-2.5",
        md: "size-5 rounded-[5px] [&_svg]:size-3",
        lg: "size-6 rounded-[6px] [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2 4.8 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-destructive" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "checked" | "defaultChecked" | "color"
> &
  VariantProps<typeof checkboxBoxVariants> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: boolean;
    errorMessage?: ReactNode;
    color?: CheckboxColor;
    isIndeterminate?: boolean;
    isDisabled?: boolean;
    isChecked?: boolean;
    defaultChecked?: boolean;
    labelClampLines?: number;
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "md",
      color = "primary",
      label,
      helperText,
      error = false,
      errorMessage,
      isIndeterminate = false,
      isDisabled = false,
      isChecked,
      defaultChecked = false,
      labelClampLines,
      id: idProp,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const inputRef = useRef<HTMLInputElement>(null);
    const controlled = isChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const checked = controlled ? Boolean(isChecked) : uncontrolledChecked;
    const filled = isIndeterminate || checked;
    const fillColor = checkboxColors[color];

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(isIndeterminate);
      }
    }, [isIndeterminate]);

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
            isDisabled && "cursor-not-allowed opacity-50",
          )}
        >
          <span className="relative mt-0.5 inline-flex">
            <input
              ref={inputRef}
              id={id}
              type="checkbox"
              disabled={isDisabled}
              checked={controlled ? checked : undefined}
              defaultChecked={controlled ? undefined : defaultChecked}
              onChange={(event) => {
                if (!controlled) {
                  setUncontrolledChecked(event.target.checked);
                }
                onChange?.(event);
              }}
              aria-invalid={error || undefined}
              className="peer sr-only focus-visible:outline-none"
              {...props}
            />
            <span
              className={cn(
                checkboxBoxVariants({ size }),
                "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
                error && !filled && "border-destructive",
                filled && "border-transparent",
              )}
              style={filled ? { backgroundColor: fillColor, borderColor: fillColor } : undefined}
              aria-hidden
            >
              {isIndeterminate ? <IndeterminateIcon /> : checked ? <CheckIcon /> : null}
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

Checkbox.displayName = "Checkbox";

export { checkboxBoxVariants };
