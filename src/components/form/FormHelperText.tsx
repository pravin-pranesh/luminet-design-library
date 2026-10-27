import type { ReactNode } from "react";
import { useFormControlContext } from "./FormContext";
import { FieldMessage } from "./FieldMessage";

export type FormHelperTextProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function FormHelperText({ children, className, id }: FormHelperTextProps) {
  const ctx = useFormControlContext();
  if (ctx?.isInvalid) return null;

  return (
    <FieldMessage variant="helper" size={ctx?.size} id={id} className={className}>
      {children}
    </FieldMessage>
  );
}
