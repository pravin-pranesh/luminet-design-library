import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import { Backdrop } from "./Backdrop";
import { Button } from "./Button";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <Backdrop onClick={onClose} portal={false} className="absolute inset-0 z-0" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "luminet-modal-title" : undefined}
        className={cn(
          "relative z-50 flex w-full flex-col rounded-xl border border-border bg-card shadow-lg",
          sizeClass[size],
          className,
        )}
      >
        {(title || description) && (
          <div className="border-b border-border px-5 py-4">
            {title ? (
              <h2 id="luminet-modal-title" className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            ) : null}
            {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
          </div>
        )}
        {children ? <div className="px-5 py-4">{children}</div> : null}
        {footer ?? (
          <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
