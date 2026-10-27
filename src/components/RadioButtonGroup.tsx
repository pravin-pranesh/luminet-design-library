import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

type RadioGroupContextValue = {
  name: string;
  value: string;
  setValue: (next: string) => void;
  isDisabled?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioButtonGroupContext() {
  return useContext(RadioGroupContext);
}

export type RadioButtonGroupProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function RadioButtonGroup({
  name: nameProp,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  orientation = "vertical",
  isDisabled = false,
  className,
  children,
}: RadioButtonGroupProps) {
  const generatedName = useId();
  const name = nameProp ?? generatedName;
  const controlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = controlled ? valueProp : uncontrolledValue;

  const setValue = (next: string) => {
    if (!controlled) {
      setUncontrolledValue(next);
    }
    onValueChange?.(next);
  };

  const context = useMemo(
    () => ({ name, value, setValue, isDisabled }),
    [name, value, isDisabled],
  );

  return (
    <RadioGroupContext.Provider value={context}>
      <div
        role="radiogroup"
        className={cn(
          orientation === "horizontal" ? "flex flex-wrap items-start gap-6" : "flex flex-col gap-3",
          className,
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioButtonGroup.displayName = "RadioButtonGroup";
