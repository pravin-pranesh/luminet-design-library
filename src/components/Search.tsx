import { forwardRef, useId } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { TextInput, type TextInputProps } from "./TextInput";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn("size-4 shrink-0 text-muted", className)}
      aria-hidden
    >
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export type SearchProps = Omit<TextInputProps, "type"> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  onClear?: () => void;
  value?: string;
};

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      errorMessage,
      placeholder = "Search…",
      id: idProp,
      value,
      onClear,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const showClear = onClear && value && String(value).length > 0;

    const input = (
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
        <TextInput
          ref={ref}
          id={id}
          type="search"
          role="searchbox"
          placeholder={placeholder}
          aria-invalid={error || undefined}
          value={value}
          className={cn("pl-9", showClear && "pr-9", className)}
          {...props}
        />
        {showClear ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-foreground"
            aria-label="Clear search"
            onClick={onClear}
          >
            ×
          </button>
        ) : null}
      </div>
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

Search.displayName = "Search";
