import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type ChoiceCardGroupProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  orientation?: "vertical" | "horizontal";
};

export function ChoiceCardGroup({
  children,
  className,
  label,
  orientation = "vertical",
}: ChoiceCardGroupProps) {
  return (
    <div
      role="group"
      aria-label={label ?? "Choices"}
      className={cn(
        "flex gap-3",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
    >
      {children}
    </div>
  );
}
