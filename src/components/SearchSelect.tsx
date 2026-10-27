import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { TextInput } from "./TextInput";
import type { SelectOption } from "./Select";

export type SearchSelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  className?: string;
  id?: string;
};

export const SearchSelect = forwardRef<HTMLInputElement, SearchSelectProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = "",
      onChange,
      placeholder = "Search or select…",
      size = "sm",
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
    const value = controlled ? valueProp : uncontrolled;
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return options;
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query]);

    useEffect(() => {
      if (!open) return;
      const onDoc = (e: MouseEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);

    const pick = (next: string) => {
      if (!controlled) setUncontrolled(next);
      onChange?.(next);
      setQuery("");
      setOpen(false);
    };

    const combobox = (
      <div ref={rootRef} className={cn("relative w-full max-w-md", className)}>
        <TextInput
          ref={ref}
          id={id}
          size={size}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-invalid={error || undefined}
          disabled={isDisabled}
          placeholder={selectedLabel || placeholder}
          value={open ? query : selectedLabel}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {open && !isDisabled ? (
          <ul
            role="listbox"
            className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border border-border bg-card py-1 shadow-lg"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted">No matches</li>
            ) : (
              filtered.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={opt.value === value}
                    disabled={opt.disabled}
                    className={cn(
                      "flex w-full px-3 py-2 text-left text-sm hover:bg-background disabled:opacity-50",
                      opt.value === value && "bg-primary/10 font-medium text-primary",
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))
            )}
          </ul>
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
          {combobox}
        </InputField>
      );
    }

    return combobox;
  },
);

SearchSelect.displayName = "SearchSelect";
