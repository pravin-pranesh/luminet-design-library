import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { InputField } from "./InputField";
import { inputTextAreaVariants } from "./InputTextArea";
import { TextInput } from "./TextInput";

export type NoteTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
  title?: string;
  titlePlaceholder?: string;
  onTitleChange?: (title: string) => void;
  onAttach?: (files: FileList) => void;
  size?: "xs" | "sm" | "md" | "lg";
  borderVariant?: "none" | "hairline" | "default" | "emphasis" | "dashed";
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
};

export const NoteTextArea = forwardRef<HTMLTextAreaElement, NoteTextAreaProps>(
  (
    {
      className,
      title,
      titlePlaceholder = "Note title",
      onTitleChange,
      onAttach,
      size = "sm",
      borderVariant = "default",
      label,
      helperText,
      error,
      errorMessage,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const bodyId = idProp ?? `${generatedId}-body`;
    const titleId = `${generatedId}-title`;

    const block = (
      <div
        className={cn(
          "w-full max-w-xl overflow-hidden rounded-[var(--radius-md)] border border-border bg-card shadow-sm",
          error && "border-destructive",
          className,
        )}
      >
        <TextInput
          id={titleId}
          size={size}
          borderVariant="none"
          className="rounded-none border-b border-border font-medium shadow-none"
          placeholder={titlePlaceholder}
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          aria-invalid={error || undefined}
        />
        <textarea
          ref={ref}
          id={bodyId}
          aria-invalid={error || undefined}
          className={cn(
            inputTextAreaVariants({ size, borderVariant: "none" }),
            "min-h-[6rem] resize-y rounded-none shadow-none",
          )}
          {...props}
        />
        <div className="flex items-center justify-between border-t border-border px-3 py-2">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="file"
              className="sr-only"
              multiple
              onChange={(e) => {
                if (e.target.files?.length) onAttach?.(e.target.files);
              }}
            />
            <span className="inline-flex h-6 items-center rounded-[var(--radius-xs)] px-2 text-xs font-medium text-foreground hover:bg-foreground/5">
              Attach file
            </span>
          </label>
          <span className="text-xs text-muted">Plain text note</span>
        </div>
      </div>
    );

    if (label || helperText || errorMessage) {
      return (
        <InputField
          label={label}
          helperText={helperText}
          error={error}
          errorMessage={errorMessage}
          htmlFor={bodyId}
        >
          {block}
        </InputField>
      );
    }

    return block;
  },
);

NoteTextArea.displayName = "NoteTextArea";
