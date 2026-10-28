import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";

const addressCardVariants = cva(
  "relative rounded-[var(--radius-md)] border bg-card p-4 text-left transition-all duration-150",
  {
    variants: {
      selected: {
        true: "border-primary ring-2 ring-primary/20 shadow-sm",
        false: "border-border hover:border-primary/40",
      },
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { selected: false, size: "md" },
  },
);

export type AddressCardProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof addressCardVariants> & {
    name: ReactNode;
    lines: ReactNode[];
    badge?: ReactNode;
    isDefault?: boolean;
    onSelect?: () => void;
  };

export const AddressCard = forwardRef<HTMLButtonElement, AddressCardProps>(
  (
    { className, name, lines, badge, isDefault, selected, size, onSelect, onClick, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onSelect?.();
        onClick?.(e);
      }}
      className={cn(addressCardVariants({ selected, size }), "w-full cursor-pointer", className)}
      aria-pressed={selected ?? false}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-foreground">{name}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          {isDefault ? (
            <Badge size="xs" variant="subtle">
              Default
            </Badge>
          ) : null}
          {badge}
        </span>
      </div>
      <ul className="mt-2 space-y-0.5 text-muted">
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </button>
  ),
);
AddressCard.displayName = "AddressCard";

export { addressCardVariants };
