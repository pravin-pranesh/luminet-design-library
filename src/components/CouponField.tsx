import { useState } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

export type CouponFieldProps = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onApply?: (code: string) => void | Promise<void>;
  appliedCode?: string;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export function CouponField({
  defaultValue = "",
  value,
  onChange,
  onApply,
  appliedCode,
  errorMessage,
  placeholder = "Coupon code",
  disabled,
  className,
  size = "md",
}: CouponFieldProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const code = value ?? internal;

  async function apply() {
    if (!onApply || !code.trim()) return;
    setLoading(true);
    try {
      await onApply(code.trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        <TextInput
          size={size}
          value={code}
          disabled={disabled || Boolean(appliedCode)}
          placeholder={placeholder}
          aria-invalid={Boolean(errorMessage)}
          className="min-w-[10rem] flex-1"
          onChange={(e) => {
            const next = e.target.value;
            if (value === undefined) setInternal(next);
            onChange?.(next);
          }}
        />
        <Button
          type="button"
          size={size === "lg" ? "md" : size === "xs" ? "xs" : "sm"}
          variant="outline"
          disabled={disabled || loading || Boolean(appliedCode)}
          onClick={() => void apply()}
        >
          {appliedCode ? "Applied" : loading ? "…" : "Apply"}
        </Button>
      </div>
      {appliedCode ? (
        <p className="text-xs text-success">Coupon “{appliedCode}” applied.</p>
      ) : null}
      {errorMessage ? (
        <p className="text-xs text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
