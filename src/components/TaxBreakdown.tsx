import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Divider } from "./layout/Divider";
import { OrderLine } from "./OrderLine";

export type TaxLine = { id: string; label: ReactNode; amount: ReactNode };

export type TaxBreakdownProps = {
  lines: TaxLine[];
  totalLabel?: ReactNode;
  total: ReactNode;
  className?: string;
};

export function TaxBreakdown({ lines, totalLabel = "Total", total, className }: TaxBreakdownProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)}>
      {lines.map((line) => (
        <OrderLine key={line.id} label={line.label} value={line.amount} muted />
      ))}
      <Divider className="my-3" />
      <OrderLine label={totalLabel} value={total} emphasize />
    </div>
  );
}
