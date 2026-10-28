import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Heading } from "./layout/Heading";

export type MiniCartProps = {
  itemCount: number;
  subtotal: ReactNode;
  children?: ReactNode;
  onCheckout?: () => void;
  onViewBag?: () => void;
  emptyMessage?: ReactNode;
  className?: string;
};

export function MiniCart({
  itemCount,
  subtotal,
  children,
  onCheckout,
  onViewBag,
  emptyMessage = "Your bag is empty.",
  className,
}: MiniCartProps) {
  return (
    <div className={cn("flex w-full max-w-md flex-col rounded-xl border border-border bg-card shadow-lg", className)}>
      <header className="border-b border-border px-4 py-3">
        <Heading level={5} as="h2">
          Bag ({itemCount})
        </Heading>
      </header>
      <div className="max-h-80 flex-1 overflow-y-auto px-4">
        {itemCount === 0 ? (
          <p className="py-8 text-center text-sm text-muted">{emptyMessage}</p>
        ) : (
          children
        )}
      </div>
      <footer className="border-t border-border px-4 py-3">
        <div className="mb-3 flex justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold tabular-nums text-foreground">{subtotal}</span>
        </div>
        <div className="flex gap-2">
          {onViewBag ? (
            <Button type="button" variant="outline" size="sm" className="flex-1" onClick={onViewBag}>
              View bag
            </Button>
          ) : null}
          <Button type="button" size="sm" className="flex-1" disabled={itemCount === 0} onClick={onCheckout}>
            Checkout
          </Button>
        </div>
      </footer>
    </div>
  );
}
