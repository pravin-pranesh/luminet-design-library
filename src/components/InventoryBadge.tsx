import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const inventoryVariants = cva("inline-flex items-center gap-1.5 font-medium", {
  variants: {
    status: {
      inStock: "text-success",
      lowStock: "text-warning",
      outOfStock: "text-destructive",
      preOrder: "text-primary",
    },
    size: {
      xs: "text-[10px]",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
  },
  defaultVariants: { status: "inStock", size: "sm" },
});

export type InventoryBadgeProps = VariantProps<typeof inventoryVariants> & {
  label?: ReactNode;
  quantity?: number;
  className?: string;
};

const defaultLabels = {
  inStock: "In stock",
  lowStock: "Low stock",
  outOfStock: "Out of stock",
  preOrder: "Pre-order",
};

export function InventoryBadge({ status = "inStock", size, label, quantity, className }: InventoryBadgeProps) {
  const text = label ?? defaultLabels[status ?? "inStock"];
  return (
    <span className={cn(inventoryVariants({ status, size }), className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {text}
      {quantity != null && status === "lowStock" ? <span className="text-muted">({quantity} left)</span> : null}
    </span>
  );
}

export { inventoryVariants };
