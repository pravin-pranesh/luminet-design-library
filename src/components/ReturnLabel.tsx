import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Badge } from "./Badge";

export type ReturnLabelProps = {
  carrier: ReactNode;
  trackingId: ReactNode;
  status?: "ready" | "printed" | "expired";
  onPrint?: () => void;
  onDownload?: () => void;
  className?: string;
};

const statusMap = {
  ready: { label: "Ready to print", variant: "success" as const },
  printed: { label: "Printed", variant: "subtle" as const },
  expired: { label: "Expired", variant: "destructive" as const },
};

export function ReturnLabel({
  carrier,
  trackingId,
  status = "ready",
  onPrint,
  onDownload,
  className,
}: ReturnLabelProps) {
  const meta = statusMap[status];
  return (
    <div className={cn("rounded-lg border border-dashed border-border bg-card p-4", className)}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Return label</p>
          <p className="font-medium text-foreground">{carrier}</p>
          <p className="mt-1 font-mono text-sm text-muted">{trackingId}</p>
        </div>
        <Badge size="xs" variant={meta.variant}>
          {meta.label}
        </Badge>
      </div>
      <div className="mt-4 flex gap-2">
        {onPrint ? (
          <Button type="button" size="sm" onClick={onPrint}>
            Print label
          </Button>
        ) : null}
        {onDownload ? (
          <Button type="button" size="sm" variant="outline" onClick={onDownload}>
            Download PDF
          </Button>
        ) : null}
      </div>
    </div>
  );
}
