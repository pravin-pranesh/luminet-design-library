import { forwardRef, type HTMLAttributes, type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";
import { Backdrop } from "./Backdrop";
import { IconButton } from "./IconButton";

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  placement?: "left" | "right";
  size?: "sm" | "md" | "lg";
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  showClose?: boolean;
};

const sizeMap = {
  sm: "max-w-xs",
  md: "max-w-md",
  lg: "max-w-lg",
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

export function Drawer({
  isOpen,
  onClose,
  placement = "right",
  size = "md",
  title,
  children,
  className,
  showClose = true,
}: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const panel = (
    <div className="fixed inset-0 z-50 flex" role="presentation">
      <Backdrop isOpen portal={false} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        className={cn(
          "relative z-10 flex h-full w-full flex-col border-border bg-card shadow-xl",
          sizeMap[size],
          placement === "right" ? "ml-auto border-l" : "mr-auto border-r",
          className,
        )}
      >
        {(title || showClose) && (
          <DrawerHeader>
            {title ? (
              <h2 id="drawer-title" className="text-lg font-semibold">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showClose ? (
              <IconButton aria-label="Close drawer" variant="ghost" size="sm" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DrawerHeader>
        )}
        {children}
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(panel, document.body);
  }
  return panel;
}

export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between gap-3 border-b border-border px-4 py-3", className)}
    {...props}
  />
));
DrawerHeader.displayName = "DrawerHeader";

export type DrawerBodyProps = HTMLAttributes<HTMLDivElement>;

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-y-auto px-4 py-4", className)} {...props} />
));
DrawerBody.displayName = "DrawerBody";

export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end gap-2 border-t border-border px-4 py-3", className)}
    {...props}
  />
));
DrawerFooter.displayName = "DrawerFooter";
