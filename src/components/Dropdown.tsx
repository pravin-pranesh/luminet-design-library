import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export type DropdownItem = {
  id: string;
  label: ReactNode;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
};

export type DropdownProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label?: ReactNode;
  triggerLabel?: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  size?: "xs" | "sm" | "md" | "lg";
};

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      className,
      label = "Actions",
      triggerLabel,
      items,
      align = "start",
      size = "sm",
      ...props
    },
    ref,
  ) => {
    const menuId = useId();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const onDoc = (e: MouseEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);

    return (
      <div ref={rootRef} className={cn("relative inline-block text-left", className)}>
        <Button
          ref={ref}
          type="button"
          size={size}
          variant="outline"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          {...props}
        >
          {triggerLabel ?? label}
          <span className="ml-1.5 text-muted" aria-hidden>
            ▾
          </span>
        </Button>
        {open ? (
          <div
            id={menuId}
            role="menu"
            className={cn(
              "absolute z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-card py-1 shadow-lg",
              align === "end" ? "right-0" : "left-0",
            )}
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cn(
                  "flex w-full px-3 py-2 text-left text-sm hover:bg-background disabled:opacity-50",
                  item.destructive ? "text-destructive" : "text-foreground",
                )}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";
