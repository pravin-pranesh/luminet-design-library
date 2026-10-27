import { useRef, useState, type DragEvent, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export type FileUploadProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  helperText?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList | null) => void;
  size?: "xs" | "sm" | "md" | "lg";
};

const pad = {
  xs: "p-4",
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
};

export function FileUpload({
  label = "Upload files",
  helperText,
  accept,
  multiple,
  onFilesSelected,
  size = "md",
  className,
  id: idProp,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const id = idProp ?? "luminet-file-upload";

  function handleFiles(files: FileList | null) {
    onFilesSelected?.(files);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <span id={`${id}-label`} className="text-sm font-medium text-foreground">
          {label}
        </span>
      ) : null}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors duration-150",
          pad[size],
          dragOver ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40",
        )}
        aria-labelledby={`${id}-label`}
      >
        <p className="text-sm text-foreground">Drop files here or browse</p>
        {helperText ? <p className="mt-1 text-xs text-muted">{helperText}</p> : null}
        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={(e) => e.stopPropagation()}>
          Choose files
        </Button>
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          {...props}
        />
      </div>
    </div>
  );
}

/** Alias for catalog parity */
export const FileUploader = FileUpload;
