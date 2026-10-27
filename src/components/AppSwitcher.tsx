import { useState } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export type AppSwitcherApp = {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
};

export type AppSwitcherProps = {
  apps: AppSwitcherApp[];
  currentAppId?: string;
  onSelect?: (app: AppSwitcherApp) => void;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

export function AppSwitcher({ apps, currentAppId, onSelect, size = "md", className }: AppSwitcherProps) {
  const [open, setOpen] = useState(false);
  const current = apps.find((a) => a.id === currentAppId) ?? apps[0];

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <Button
        variant="outline"
        size={size === "xs" ? "xs" : size === "lg" ? "lg" : size === "md" ? "md" : "sm"}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {current?.icon}
        <span className="max-w-[8rem] truncate">{current?.name ?? "Apps"}</span>
        <span aria-hidden className="text-muted">
          ▾
        </span>
      </Button>
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label="Close app switcher"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            className="absolute left-0 z-50 mt-2 min-w-[14rem] overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
          >
            {apps.map((app) => (
              <li key={app.id} role="option" aria-selected={app.id === current?.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-start gap-3 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-foreground/[0.04]",
                    app.id === current?.id && "bg-primary/10",
                  )}
                  onClick={() => {
                    onSelect?.(app);
                    setOpen(false);
                  }}
                >
                  {app.icon ? <span className="mt-0.5 shrink-0">{app.icon}</span> : null}
                  <span>
                    <span className="block font-medium text-foreground">{app.name}</span>
                    {app.description ? (
                      <span className="block text-xs text-muted">{app.description}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
