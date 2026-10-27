import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type LuminetSize = "xs" | "sm" | "md" | "lg";

export type LuminetCommonProps = HTMLAttributes<HTMLDivElement> & {
  size?: LuminetSize;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
};

const sizePad: Record<LuminetSize, string> = {
  xs: "p-2 text-xs gap-1",
  sm: "p-3 text-sm gap-1.5",
  md: "p-4 text-sm gap-2",
  lg: "p-5 text-base gap-2.5",
};

export function luminetSurfaceClass(size: LuminetSize = "md", extra?: string) {
  return cn(
    "rounded-lg border border-border bg-card text-foreground shadow-sm transition-colors duration-150",
    sizePad[size],
    extra,
  );
}

export function luminetMutedText(size: LuminetSize = "md") {
  return cn("text-muted", size === "xs" ? "text-xs" : "text-sm");
}
