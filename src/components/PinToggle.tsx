import { cn } from "../lib/cn";
import { IconButton } from "./IconButton";

export type PinToggleProps = {
  pinned?: boolean;
  onPinnedChange?: (pinned: boolean) => void;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  label?: string;
};

export function PinToggle({ pinned, onPinnedChange, size = "sm", className, label = "Pin" }: PinToggleProps) {
  return (
    <IconButton
      size={size}
      variant={pinned ? "solid" : "ghost"}
      aria-label={label}
      aria-pressed={pinned}
      className={cn(className)}
      onClick={() => onPinnedChange?.(!pinned)}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-full max-w-[1em]">
        <path d="M10 2l1.2 4.5L16 8l-4.5 1.2L10 14l-1.2-4.8L4 8l4.8-1.5L10 2z" />
      </svg>
    </IconButton>
  );
}
