import { useState } from "react";
import { Button, type ButtonProps } from "./Button";

export type CopyButtonProps = Omit<ButtonProps, "onClick"> & {
  value: string;
  copiedLabel?: string;
  copyLabel?: string;
};

export function CopyButton({
  value,
  copiedLabel = "Copied",
  copyLabel = "Copy",
  children,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleCopy} {...props}>
      {children ?? (copied ? copiedLabel : copyLabel)}
    </Button>
  );
}
