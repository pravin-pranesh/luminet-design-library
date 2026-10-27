import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { FormControl, type FormControlProps } from "./FormControl";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormHelperText } from "./FormHelperText";
import { FormLabel } from "./FormLabel";

export type FormFieldProps = Omit<FormControlProps, "children"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  optionalHint?: ReactNode;
  children: ReactNode;
};

export function FormField({
  label,
  helperText,
  errorMessage,
  optionalHint,
  isInvalid,
  children,
  className,
  ...controlProps
}: FormFieldProps) {
  const invalid = isInvalid ?? Boolean(errorMessage);

  return (
    <FormControl isInvalid={invalid} className={cn("max-w-xl", className)} {...controlProps}>
      {label != null && label !== "" ? (
        <FormLabel optionalHint={optionalHint}>{label}</FormLabel>
      ) : null}
      {children}
      {invalid ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
