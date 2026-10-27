import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

type AccordionContextValue = {
  type: "single" | "multiple";
  open: string[];
  toggle: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export type AccordionProps = {
  type?: "single" | "multiple";
  defaultValue?: string[];
  children: ReactNode;
  className?: string;
};

export function Accordion({ type = "single", defaultValue = [], children, className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultValue);

  const toggle = (id: string) => {
    setOpen((prev) => {
      if (type === "single") {
        return prev.includes(id) ? [] : [id];
      }
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  return (
    <AccordionContext.Provider value={{ type, open, toggle }}>
      <div className={cn("divide-y divide-border rounded-[var(--radius-md)] border border-border bg-card", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  id: string;
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
};

export function AccordionItem({ id, title, children, disabled }: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = ctx.open.includes(id);

  return (
    <div className="px-4">
      <button
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium text-foreground disabled:opacity-50"
        onClick={() => !disabled && ctx.toggle(id)}
      >
        <span>{title}</span>
        <span
          className={cn("text-muted transition-transform duration-150", isOpen && "rotate-180")}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {isOpen ? <div className="pb-4 text-sm text-muted">{children}</div> : null}
    </div>
  );
}
