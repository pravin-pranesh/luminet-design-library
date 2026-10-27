import {
  forwardRef,
  useId,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { TextInput } from "./TextInput";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type MultiSelectProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (emails: string[]) => void;
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

function Chip({ email, onRemove }: { email: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      {email}
      <button
        type="button"
        className="rounded p-0.5 hover:bg-primary/20"
        aria-label={`Remove ${email}`}
        onClick={onRemove}
      >
        ×
      </button>
    </span>
  );
}

export const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    {
      value: valueProp,
      defaultValue = [],
      onChange,
      placeholder = "Add email and press Enter",
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
    const [uncontrolled, setUncontrolled] = useState<string[]>(defaultValue);
    const emails = controlled ? valueProp : uncontrolled;
    const [draft, setDraft] = useState("");

    const commit = (raw: string) => {
      const email = raw.trim();
      if (!email || !EMAIL_RE.test(email) || emails.includes(email)) return;
      const next = [...emails, email];
      if (!controlled) setUncontrolled(next);
      onChange?.(next);
      setDraft("");
    };

    const remove = (email: string) => {
      const next = emails.filter((e) => e !== email);
      if (!controlled) setUncontrolled(next);
      onChange?.(next);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        commit(draft);
      }
      if (e.key === "Backspace" && !draft && emails.length) {
        remove(emails[emails.length - 1]!);
      }
    };

    const field = (
      <div
        className={cn(
          "flex min-h-10 w-full max-w-md flex-wrap items-center gap-1.5 rounded-[var(--radius-sm)] border border-border bg-card px-2 py-1.5 focus-within:ring-2 focus-within:ring-primary/30",
          error && "border-destructive",
          isDisabled && "opacity-50",
          className,
        )}
      >
        {emails.map((email) => (
          <Chip key={email} email={email} onRemove={() => remove(email)} />
        ))}
        <TextInput
          ref={ref}
          id={id}
          size={size}
          borderVariant="none"
          className="min-w-[8rem] flex-1 shadow-none"
          disabled={isDisabled}
          aria-invalid={error || undefined}
          placeholder={emails.length ? "" : placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => commit(draft)}
        />
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
          {field}
        </InputField>
      );
    }

    return field;
  },
);

MultiSelect.displayName = "MultiSelect";
