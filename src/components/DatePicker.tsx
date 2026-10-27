import { forwardRef, useId } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { TextInput, type TextInputProps } from "./TextInput";

export type DatePickerProps = Omit<TextInputProps, "type"> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorMessage,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const input = (
      <TextInput
        ref={ref}
        id={id}
        type="date"
        aria-invalid={error || undefined}
        className={cn("max-w-xs", className)}
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
          {input}
        </InputField>
      );
    }

    return input;
  },
);

DatePicker.displayName = "DatePicker";
