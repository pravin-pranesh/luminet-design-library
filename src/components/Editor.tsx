import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { IconButton } from "./IconButton";

const editorVariants = cva(
  "overflow-hidden rounded-lg border border-border bg-card transition-colors duration-150 focus-within:ring-2 focus-within:ring-primary/30",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const editorPad = {
  xs: "min-h-[6rem] px-2 py-1.5",
  sm: "min-h-[8rem] px-3 py-2",
  md: "min-h-[10rem] px-3 py-2.5",
  lg: "min-h-[12rem] px-4 py-3",
};

export type EditorProps = VariantProps<typeof editorVariants> & {
  label?: ReactNode;
  helperText?: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: ReactNode;
  className?: string;
  id?: string;
};

function exec(command: string) {
  document.execCommand(command, false);
}

export function Editor({
  label,
  helperText,
  placeholder = "Write something…",
  defaultValue,
  value,
  onChange,
  disabled,
  error,
  errorMessage,
  size = "md",
  className,
  id: idProp,
}: EditorProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const areaRef = useRef<HTMLDivElement>(null);
  const controlled = value !== undefined;

  useEffect(() => {
    if (!controlled || !areaRef.current) return;
    if (areaRef.current.innerHTML !== value) {
      areaRef.current.innerHTML = value ?? "";
    }
  }, [controlled, value]);

  useEffect(() => {
    if (controlled || !defaultValue || !areaRef.current) return;
    areaRef.current.innerHTML = defaultValue;
  }, [controlled, defaultValue]);

  function emitChange() {
    onChange?.(areaRef.current?.innerHTML ?? "");
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}
      <div className={cn(editorVariants({ size }), error && "border-destructive")}>
        <div
          className="flex flex-wrap items-center gap-0.5 border-b border-border bg-foreground/[0.02] px-1 py-1"
          role="toolbar"
          aria-label="Formatting"
        >
          {(
            [
              ["Bold", "bold"],
              ["Italic", "italic"],
              ["Underline", "underline"],
              ["Bullet list", "insertUnorderedList"],
            ] as const
          ).map(([name, cmd]) => (
            <IconButton
              key={cmd}
              type="button"
              size="xs"
              variant="ghost"
              aria-label={name}
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                areaRef.current?.focus();
                exec(cmd);
                emitChange();
              }}
            >
              <span className="text-xs font-medium">{name.charAt(0)}</span>
            </IconButton>
          ))}
        </div>
        <div
          ref={areaRef}
          id={id}
          role="textbox"
          aria-multiline="true"
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          className={cn(
            editorPad[size ?? "md"],
            "outline-none text-foreground empty:before:text-muted empty:before:content-[attr(data-placeholder)]",
            disabled && "cursor-not-allowed opacity-50",
          )}
          onInput={emitChange}
        />
      </div>
      {error && errorMessage ? (
        <p className="text-xs text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-xs text-muted">{helperText}</p>
      ) : null}
    </div>
  );
}

export { editorVariants };
