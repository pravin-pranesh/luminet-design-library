import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { checkboxColors, type CheckboxColor } from "./Checkbox";
import { InputField } from "./InputField";

export type RangeSliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "color"
> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
  color?: CheckboxColor;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
};

const trackHeight: Record<"sm" | "md" | "lg", string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorMessage,
      size = "md",
      color = "primary",
      showValue = true,
      showTicks = false,
      tickCount = 5,
      min = 0,
      max = 100,
      id: idProp,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const fill = checkboxColors[color];

    const slider = (
      <div className={cn("w-full max-w-md space-y-2", className)}>
        {showValue ? (
          <div className="flex justify-between text-xs text-muted">
            <span>{min}</span>
            <span className="font-medium text-foreground tabular-nums">
              {String(value ?? defaultValue ?? min)}
            </span>
            <span>{max}</span>
          </div>
        ) : null}
        <input
          ref={ref}
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={error || undefined}
          className={cn(
            "w-full cursor-pointer appearance-none rounded-full bg-border",
            trackHeight[size],
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-md",
            "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-card",
          )}
          style={{ accentColor: fill }}
          {...props}
        />
        {showTicks ? (
          <div className="flex justify-between px-0.5 text-[10px] text-muted">
            {Array.from({ length: tickCount }, (_, i) => {
              const t = Number(min) + ((Number(max) - Number(min)) * i) / (tickCount - 1);
              return <span key={i}>{Math.round(t)}</span>;
            })}
          </div>
        ) : null}
      </div>
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
          {slider}
        </InputField>
      );
    }

    return slider;
  },
);

RangeSlider.displayName = "RangeSlider";
