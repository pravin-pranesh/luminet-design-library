import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
  size: "sm" | "md" | "lg";
};

const TabsContext = createContext<TabsContextValue | null>(null);

export type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
};

export function Tabs({ defaultValue, children, className, size = "md", onValueChange }: TabsProps) {
  const [value, setValueState] = useState(defaultValue);
  const setValue = (v: string) => {
    setValueState(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value, setValue, size }}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabListProps = {
  children: ReactNode;
  className?: string;
};

export function TabList({ children, className }: TabListProps) {
  return (
    <div role="tablist" className={cn("flex gap-1 border-b border-border", className)}>
      {children}
    </div>
  );
}

export type TabProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

const tabSizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function Tab({ value, children, disabled, className }: TabProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be used within Tabs");

  const selected = ctx.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      className={cn(
        "-mb-px border-b-2 font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        tabSizeClasses[ctx.size],
        selected
          ? "border-primary text-primary"
          : "border-transparent text-muted hover:border-border hover:text-foreground",
        disabled && "opacity-50",
        className,
      )}
      onClick={() => !disabled && ctx.setValue(value)}
    >
      {children}
    </button>
  );
}

export type TabPanelProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export function TabPanel({ value, children, className }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanel must be used within Tabs");
  if (ctx.value !== value) return null;

  return (
    <div role="tabpanel" className={cn("text-sm text-foreground", className)}>
      {children}
    </div>
  );
}
