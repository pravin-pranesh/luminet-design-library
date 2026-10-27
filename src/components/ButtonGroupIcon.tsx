import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button, type ButtonProps } from "./Button";

export type ButtonGroupIconItem = {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

export type ButtonGroupIconProps = {
  items: ButtonGroupIconItem[];
  size?: ButtonProps["size"];
  className?: string;
  "aria-label"?: string;
};

export const ButtonGroupIcon = forwardRef<HTMLDivElement, ButtonGroupIconProps>(
  ({ items, size = "sm", className, "aria-label": ariaLabel = "Icon button group" }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={cn("inline-flex rounded-md border border-border bg-card p-0.5 shadow-sm", className)}
    >
      {items.map((item, index) => (
        <IconGroupButton
          key={item.id}
          type="button"
          size={size}
          variant={item.isActive ? "solid" : "ghost"}
          title={item.label}
          aria-label={item.label}
          aria-pressed={item.isActive}
          disabled={item.disabled}
          onClick={item.onClick}
          className={cn(
            "rounded-[var(--radius-sm)]",
            index > 0 && "ml-0.5",
          )}
        >
          {item.icon}
        </IconGroupButton>
      ))}
    </div>
  ),
);

ButtonGroupIcon.displayName = "ButtonGroupIcon";

const IconGroupButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>(
  ({ className, children, ...props }, ref) => (
    <Button ref={ref} className={cn("px-2.5", className)} {...props}>
      {children}
    </Button>
  ),
);

IconGroupButton.displayName = "IconGroupButton";
