import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";
import { Button } from "./Button";

export type InvoiceRowProps = {
  invoiceNumber: ReactNode;
  date: ReactNode;
  amount: ReactNode;
  status?: "paid" | "open" | "overdue";
  onDownload?: () => void;
  className?: string;
};

const statusVariant = { paid: "success" as const, open: "subtle" as const, overdue: "destructive" as const };

export function InvoiceRow({
  invoiceNumber,
  date,
  amount,
  status = "paid",
  onDownload,
  className,
}: InvoiceRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3 border-b border-border py-3 last:border-0", className)}>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground">{invoiceNumber}</p>
        <p className="text-xs text-muted">{date}</p>
      </div>
      <Badge size="xs" variant={statusVariant[status]}>
        {status}
      </Badge>
      <span className="text-sm font-semibold tabular-nums text-foreground">{amount}</span>
      {onDownload ? (
        <Button type="button" size="xs" variant="ghost" onClick={onDownload}>
          PDF
        </Button>
      ) : null}
    </div>
  );
}
