import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { FormControlProvider, useFormControlId, type FormControlContextValue } from "./FormContext";

export type FormControlProps = {
  id?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: FormControlContextValue["size"];
  className?: string;
  children: ReactNode;
};

export function FormControl({
  id: idProp,
  isInvalid = false,
  isRequired = false,
  isDisabled = false,
  size = "sm",
  className,
  children,
}: FormControlProps) {
  const id = useFormControlId(idProp);

  return (
    <FormControlProvider value={{ id, isInvalid, isRequired, isDisabled, size }}>
      <div
        className={cn("flex w-full flex-col gap-1.5", className)}
        data-invalid={isInvalid || undefined}
        data-disabled={isDisabled || undefined}
      >
        {children}
      </div>
    </FormControlProvider>
  );
}
