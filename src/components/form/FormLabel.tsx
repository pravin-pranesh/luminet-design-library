import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useFormControlContext } from "./FormContext";

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  optionalHint?: ReactNode;
};

export function FormLabel({ className, children, optionalHint, htmlFor, ...props }: FormLabelProps) {
  const ctx = useFormControlContext();
  const forId = htmlFor ?? ctx?.id;

  return (
    <label
      htmlFor={forId}
      className={cn(
        "text-sm font-medium text-foreground",
        ctx?.isDisabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {ctx?.isRequired ? (
        <span className="ml-0.5 text-destructive" aria-hidden>
          *
        </span>
      ) : null}
      {!ctx?.isRequired && optionalHint ? (
        <span className="ml-1.5 text-xs font-normal text-muted">{optionalHint}</span>
      ) : null}
    </label>
  );
}
