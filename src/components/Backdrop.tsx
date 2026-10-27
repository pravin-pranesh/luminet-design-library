import { forwardRef, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";

export type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  portal?: boolean;
  zIndex?: number;
};

export const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  ({ className, isOpen = true, portal = true, zIndex = 40, ...props }, ref) => {
    if (!isOpen) return null;

    const node = (
      <div
        ref={ref}
        aria-hidden
        className={cn("fixed inset-0 bg-foreground/40 backdrop-blur-[1px] transition-opacity", className)}
        style={{ zIndex }}
        {...props}
      />
    );

    if (portal && typeof document !== "undefined") {
      return createPortal(node, document.body);
    }
    return node;
  },
);
Backdrop.displayName = "Backdrop";
