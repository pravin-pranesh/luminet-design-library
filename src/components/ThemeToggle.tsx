import { cn } from "../lib/cn";
import { Button } from "./Button";

export type ThemeToggleProps = {
  theme?: "light" | "dark" | "system";
  onChange?: (theme: "light" | "dark" | "system") => void;
  className?: string;
};

export function ThemeToggle({ theme = "light", onChange, className }: ThemeToggleProps) {
  const options: ("light" | "dark" | "system")[] = ["light", "dark", "system"];

  return (
    <div className={cn("inline-flex rounded-md border border-border p-0.5", className)} role="group" aria-label="Theme">
      {options.map((opt) => (
        <Button
          key={opt}
          type="button"
          size="xs"
          variant={theme === opt ? "solid" : "ghost"}
          className="capitalize"
          onClick={() => onChange?.(opt)}
          aria-pressed={theme === opt}
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}
