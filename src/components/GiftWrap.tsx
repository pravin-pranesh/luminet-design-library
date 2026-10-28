import { cn } from "../lib/cn";
import { Checkbox } from "./Checkbox";
import { PriceDisplay } from "./PriceDisplay";

export type GiftWrapProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  message?: string;
  onMessageChange?: (message: string) => void;
  price?: string;
  className?: string;
};

export function GiftWrap({
  checked,
  onCheckedChange,
  message,
  onMessageChange,
  price = "$4.00",
  className,
}: GiftWrapProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <Checkbox
          label="Add gift wrap"
          helperText="Includes note card and tissue."
          isChecked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
        />
        <PriceDisplay price={price} size="sm" />
      </div>
      {checked && onMessageChange ? (
        <label className="mt-3 block text-sm">
          <span className="mb-1 block text-muted">Gift message</span>
          <textarea
            value={message ?? ""}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            placeholder="Optional message…"
          />
        </label>
      ) : null}
    </div>
  );
}
