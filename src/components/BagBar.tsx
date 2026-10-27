import { cn } from "../lib/cn";
import { Button } from "./Button";

export type BagBarProps = {
  itemCount: number;
  subtotal: string;
  onCheckout?: () => void;
  onViewBag?: () => void;
  className?: string;
};

export function BagBar({ itemCount, subtotal, onCheckout, onViewBag, className }: BagBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 shadow-[0_-4px_24px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      <div>
        <p className="text-sm font-medium text-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
        <p className="text-xs text-muted">Subtotal {subtotal}</p>
      </div>
      <div className="flex gap-2">
        {onViewBag ? (
          <Button type="button" variant="outline" size="sm" onClick={onViewBag}>
            View bag
          </Button>
        ) : null}
        <Button type="button" size="sm" onClick={onCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
