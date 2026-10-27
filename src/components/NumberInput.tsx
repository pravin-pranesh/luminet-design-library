import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { TextInput, textInputVariants, type TextInputProps } from "./TextInput";

export type NumberInputProps = Omit<TextInputProps, "type"> &
  Pick<InputHTMLAttributes<HTMLInputElement>, "min" | "max" | "step"> & {
    label?: string;
    helperText?: string;
    error?: boolean;
    errorMessage?: string;
    showSteppers?: boolean;
  };

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorMessage,
      showSteppers = false,
      size,
      borderVariant,
      id: idProp,
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const input = (
      <div className={cn("relative flex w-full items-stretch", showSteppers && "gap-0")}>
        <TextInput
          ref={ref}
          id={id}
          type="number"
          size={size}
          borderVariant={borderVariant}
          className={cn(showSteppers && "rounded-r-none", className)}
          aria-invalid={error || undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...props}
        />
        {showSteppers ? (
          <div className="flex flex-col border border-l-0 border-border rounded-r-[var(--radius-sm)] overflow-hidden">
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              className="flex flex-1 items-center justify-center px-2 text-xs text-muted hover:bg-background disabled:opacity-50"
              aria-label="Increment"
              onClick={() => {
                /* consumer should control value; steppers are visual stub */
              }}
            >
              ▲
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              className="flex flex-1 items-center justify-center border-t border-border px-2 text-xs text-muted hover:bg-background disabled:opacity-50"
              aria-label="Decrement"
            >
              ▼
            </button>
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
          {input}
        </InputField>
      );
    }

    return input;
  },
);

NumberInput.displayName = "NumberInput";

export { textInputVariants as numberInputVariants };
