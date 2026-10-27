import type { ReactNode } from "react";
import { useFormControlContext } from "./FormContext";
import { FieldMessage } from "./FieldMessage";

export type FormErrorMessageProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function FormErrorMessage({ children, className, id }: FormErrorMessageProps) {
  const ctx = useFormControlContext();
  if (!ctx?.isInvalid) return null;
  if (children == null || children === "") return null;

  return (
    <FieldMessage variant="error" size={ctx?.size} id={id} className={className}>
      {children}
    </FieldMessage>
  );
}
