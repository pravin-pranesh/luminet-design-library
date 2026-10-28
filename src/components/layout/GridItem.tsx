import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type GridItemProps = HTMLAttributes<HTMLDivElement> & {
  colSpan?: 1 | 2 | 3 | 4 | 6 | 12 | "full";
  rowSpan?: 1 | 2 | 3;
};

const colSpanMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  12: "col-span-12",
  full: "col-span-full",
} as const;

const rowSpanMap = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
} as const;

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        colSpan ? colSpanMap[colSpan] : undefined,
        rowSpan ? rowSpanMap[rowSpan] : undefined,
        className,
      )}
      {...props}
    />
  ),
);
GridItem.displayName = "GridItem";
