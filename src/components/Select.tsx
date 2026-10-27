import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { textInputVariants } from "./TextInput";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  options: SelectOption[];
  size?: "xs" | "sm" | "md" | "lg";
  borderVariant?: "none" | "hairline" | "default" | "emphasis" | "dashed";
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      size = "sm",
      borderVariant = "default",
      label,
      helperText,
      error,
      errorMessage,
      placeholder,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const control = (
      <select
        ref={ref}
        id={id}
        aria-invalid={error || undefined}
        className={cn(
          textInputVariants({ size, borderVariant }),
          "cursor-pointer pr-8",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
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
          {control}
        </InputField>
      );
    }

    return control;
  },
);

Select.displayName = "Select";
