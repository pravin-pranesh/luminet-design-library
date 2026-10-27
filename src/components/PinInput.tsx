import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { TextInput } from "./TextInput";

export type PinInputProps = {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  className?: string;
  id?: string;
};

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      length = 6,
      value: valueProp,
      defaultValue = "",
      onChange,
      size = "md",
      label,
      helperText,
      error,
      errorMessage,
      isDisabled,
      className,
      id: idProp,
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const controlled = valueProp !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const pinValue = controlled ? (valueProp ?? "") : uncontrolled;
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const chars = pinValue.padEnd(length, " ").slice(0, length).split("");

    const setPin = useCallback(
      (next: string) => {
        if (!controlled) setUncontrolled(next);
        onChange?.(next);
      },
      [controlled, onChange],
    );

    const setAt = useCallback(
      (index: number, char: string) => {
        const arr = pinValue.padEnd(length, " ").slice(0, length).split("");
        arr[index] = char;
        setPin(arr.join("").trimEnd());
      },
      [pinValue, length, setPin],
    );

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !chars[index]?.trim() && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
      if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
      if (e.key === "ArrowRight" && index < length - 1) inputsRef.current[index + 1]?.focus();
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      setPin(text);
      const focusIndex = Math.min(text.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    };

    const cells = (
      <div
        ref={ref}
        id={id}
        role="group"
        aria-label={typeof label === "string" ? label : "PIN input"}
        className={cn("flex flex-wrap gap-2", className)}
      >
        {Array.from({ length }, (_, i) => (
          <TextInput
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            size={size}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            disabled={isDisabled}
            aria-invalid={error || undefined}
            className="w-10 text-center tabular-nums"
            value={chars[i]?.trim() ? chars[i] : ""}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(-1);
              setAt(i, v);
              if (v && i < length - 1) inputsRef.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    );

    if (label || helperText || errorMessage) {
      return (
        <InputField
          label={label}
          helperText={helperText}
          error={error}
          errorMessage={errorMessage}
          htmlFor={`${id}-0`}
        >
          {cells}
        </InputField>
      );
    }

    return cells;
  },
);

PinInput.displayName = "PinInput";
