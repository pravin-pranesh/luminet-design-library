import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type AddressCardGroupProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  columns?: 1 | 2;
};

export function AddressCardGroup({ children, className, label, columns = 2 }: AddressCardGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label ?? "Addresses"}
      className={cn("grid gap-3", columns === 2 ? "sm:grid-cols-2" : "grid-cols-1", className)}
    >
      {children}
    </div>
  );
}
