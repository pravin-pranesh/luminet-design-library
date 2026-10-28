import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

const choiceCardVariants = cva(
  "flex w-full cursor-pointer flex-col rounded-[var(--radius-md)] border bg-card p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
  {
    variants: {
      selected: {
        true: "border-primary bg-primary/[0.03] ring-1 ring-primary/30",
        false: "border-border hover:border-primary/35 hover:bg-foreground/[0.02]",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:border-border hover:bg-card",
        false: "",
      },
      size: {
        sm: "gap-1 p-3 text-sm",
        md: "gap-2 p-4 text-sm",
        lg: "gap-2 p-5 text-base",
      },
    },
    defaultVariants: { selected: false, disabled: false, size: "md" },
  },
);

export type ChoiceCardProps = Omit<HTMLAttributes<HTMLButtonElement>, "title"> &
  VariantProps<typeof choiceCardVariants> & {
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    onSelect?: () => void;
  };

export const ChoiceCard = forwardRef<HTMLButtonElement, ChoiceCardProps>(
  (
    { className, title, description, icon, selected, disabled, size, onSelect, onClick, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled ?? false}
      aria-pressed={selected ?? false}
      onClick={(e) => {
        if (!disabled) onSelect?.();
        onClick?.(e);
      }}
      className={cn(choiceCardVariants({ selected, disabled, size }), className)}
      {...props}
    >
      <span className="flex items-start gap-3">
        {icon ? <span className="shrink-0 text-primary">{icon}</span> : null}
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-foreground">{title}</span>
          {description ? <span className="mt-1 block text-muted">{description}</span> : null}
        </span>
        <span
          className={cn(
            "mt-0.5 size-4 shrink-0 rounded-full border-2 transition-colors duration-150",
            selected ? "border-primary bg-primary" : "border-border bg-card",
          )}
          aria-hidden
        />
      </span>
    </button>
  ),
);
ChoiceCard.displayName = "ChoiceCard";

export { choiceCardVariants };
