import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type TableProps = HTMLAttributes<HTMLTableElement> & {
  striped?: boolean;
};

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table
        ref={ref}
        className={cn(
          "w-full min-w-full border-collapse text-left text-sm",
          striped && "[&_tbody_tr:nth-child(even)]:bg-foreground/[0.02]",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("border-b border-border bg-foreground/[0.03]", className)} {...props} />
  ),
);
TableHead.displayName = "TableHead";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("divide-y divide-border", className)} {...props} />,
);
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("transition-colors duration-150 hover:bg-foreground/[0.02]", className)} {...props} />
  ),
);
TableRow.displayName = "TableRow";

export const TableHeaderCell = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn("px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted", className)}
      {...props}
    />
  ),
);
TableHeaderCell.displayName = "TableHeaderCell";

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-2.5 text-foreground", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";
