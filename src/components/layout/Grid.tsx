import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8";
};

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
} as const;

const gapMap = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
} as const;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 1, gap = "4", ...props }, ref) => (
    <div ref={ref} className={cn("grid", colMap[columns], gapMap[gap], className)} {...props} />
  ),
);
Grid.displayName = "Grid";
