import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

const toastVariants = cva(
  "pointer-events-auto flex w-full max-w-sm gap-3 rounded-lg border bg-card p-4 shadow-lg transition-all duration-150",
  {
    variants: {
      variant: {
        info: "border-border",
        success: "border-success/30",
        warning: "border-warning/30",
        error: "border-destructive/30",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export type ToastItem = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  variant?: VariantProps<typeof toastVariants>["variant"];
  actionLabel?: string;
  onAction?: () => void;
};

export type ToasterProps = {
  toasts: ToastItem[];
  onDismiss?: (id: string) => void;
  position?: "bottom-right" | "bottom-left" | "top-right";
  className?: string;
};

const positionClass = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
} as const;

export function Toaster({ toasts, onDismiss, position = "bottom-right", className }: ToasterProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className={cn("pointer-events-none fixed z-[60] flex flex-col gap-2", positionClass[position], className)}
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className={cn(toastVariants({ variant: toast.variant ?? "info" }))} role="status">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-xs text-muted">{toast.description}</p> : null}
            {toast.actionLabel && toast.onAction ? (
              <Button type="button" size="xs" variant="link" className="mt-2 px-0" onClick={toast.onAction}>
                {toast.actionLabel}
              </Button>
            ) : null}
          </div>
          {onDismiss ? (
            <Button type="button" size="xs" variant="ghost" aria-label="Dismiss" onClick={() => onDismiss(toast.id)}>
              ×
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export { toastVariants };
