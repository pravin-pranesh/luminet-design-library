import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { PriceDisplay } from "./PriceDisplay";

export type OrderLineProps = {
  label: ReactNode;
  value: ReactNode;
  muted?: boolean;
  emphasize?: boolean;
  className?: string;
};

export function OrderLine({ label, value, muted, emphasize, className }: OrderLineProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 py-1.5 text-sm", className)}>
      <span className={cn(muted ? "text-muted" : "text-foreground")}>{label}</span>
      {typeof value === "string" || typeof value === "number" ? (
        <PriceDisplay price={value} size={emphasize ? "lg" : "sm"} align="end" />
      ) : (
        <span className={cn("tabular-nums", emphasize ? "text-lg font-semibold text-foreground" : "text-foreground")}>
          {value}
        </span>
      )}
    </div>
  );
}
