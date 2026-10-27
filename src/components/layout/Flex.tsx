import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8";
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

const directionMap = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
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

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, direction = "row", align = "stretch", justify = "start", wrap, gap = "2", ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        gapMap[gap],
        className,
      )}
      {...props}
    />
  ),
);
Flex.displayName = "Flex";
