import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

const listVariants = cva("flex flex-col", {
  variants: {
    variant: {
      plain: "gap-0",
      divided: "divide-y divide-border rounded-lg border border-border",
      inset: "gap-1 rounded-lg bg-foreground/[0.03] p-2",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { variant: "plain", size: "md" },
});

export type ListProps = HTMLAttributes<HTMLUListElement> & VariantProps<typeof listVariants>;

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, size, ...props }, ref) => (
    <ul ref={ref} className={cn(listVariants({ variant, size }), className)} {...props} />
  ),
);
List.displayName = "List";

const listItemVariants = cva("flex items-center gap-3 text-foreground transition-colors duration-150", {
  variants: {
    size: {
      xs: "px-2 py-1.5",
      sm: "px-3 py-2",
      md: "px-3 py-2.5",
      lg: "px-4 py-3",
    },
    interactive: {
      true: "cursor-pointer hover:bg-foreground/[0.04] rounded-md",
      false: "",
    },
  },
  defaultVariants: { size: "md", interactive: false },
});

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> &
  VariantProps<typeof listItemVariants> & {
    leading?: ReactNode;
    trailing?: ReactNode;
  };

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, size, interactive, leading, trailing, children, ...props }, ref) => (
    <li ref={ref} className={cn(listItemVariants({ size, interactive }), className)} {...props}>
      {leading ? <span className="shrink-0 text-muted">{leading}</span> : null}
      <span className="min-w-0 flex-1">{children}</span>
      {trailing ? <span className="shrink-0 text-muted">{trailing}</span> : null}
    </li>
  ),
);
ListItem.displayName = "ListItem";

export { listVariants, listItemVariants };
