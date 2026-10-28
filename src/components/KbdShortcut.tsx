import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Kbd } from "./Kbd";

export type KbdShortcutProps = {
  keys: string[];
  label?: ReactNode;
  className?: string;
};

export function KbdShortcut({ keys, label, className }: KbdShortcutProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-muted", className)}>
      {label ? <span>{label}</span> : null}
      <span className="inline-flex items-center gap-1">
        {keys.map((k, i) => (
          <Kbd key={`${k}-${i}`} size="sm">
            {k}
          </Kbd>
        ))}
      </span>
    </span>
  );
}
