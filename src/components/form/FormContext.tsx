import { createContext, useContext, useId, type ReactNode } from "react";

export type FormControlContextValue = {
  id: string;
  isInvalid: boolean;
  isRequired: boolean;
  isDisabled: boolean;
  size: "xs" | "sm" | "md" | "lg";
};

const FormControlContext = createContext<FormControlContextValue | null>(null);

export function FormControlProvider({
  value,
  children,
}: {
  value: FormControlContextValue;
  children: ReactNode;
}) {
  return <FormControlContext.Provider value={value}>{children}</FormControlContext.Provider>;
}

export function useFormControlContext() {
  return useContext(FormControlContext);
}

export function useFormControlId(providedId?: string) {
  const autoId = useId();
  return providedId ?? autoId.replace(/:/g, "");
}
