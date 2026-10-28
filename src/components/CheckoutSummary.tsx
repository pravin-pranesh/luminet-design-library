import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Heading } from "./layout/Heading";
import { TaxBreakdown, type TaxLine } from "./TaxBreakdown";

export type CheckoutSummaryProps = {
  title?: ReactNode;
  lines?: TaxLine[];
  subtotal?: ReactNode;
  shipping?: ReactNode;
  tax?: ReactNode;
  total: ReactNode;
  checkoutLabel?: string;
  onCheckout?: () => void;
  className?: string;
};

export function CheckoutSummary({
  title = "Order summary",
  lines,
  subtotal,
  shipping,
  tax,
  total,
  checkoutLabel = "Place order",
  onCheckout,
  className,
}: CheckoutSummaryProps) {
  const builtLines: TaxLine[] =
    lines ??
    [
      ...(subtotal != null ? [{ id: "sub", label: "Subtotal", amount: subtotal }] : []),
      ...(shipping != null ? [{ id: "ship", label: "Shipping", amount: shipping }] : []),
      ...(tax != null ? [{ id: "tax", label: "Tax", amount: tax }] : []),
    ];

  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <Heading level={4} as="h2">
        {title}
      </Heading>
      <TaxBreakdown lines={builtLines} total={total} />
      <Button type="button" size="lg" className="w-full" onClick={onCheckout}>
        {checkoutLabel}
      </Button>
    </aside>
  );
}
