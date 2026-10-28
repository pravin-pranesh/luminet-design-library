import { useState } from "react";
import { cn } from "../../lib/cn";
import { ThemeToggle } from "../ThemeToggle";
import { FormField } from "../form/FormField";
import { Select } from "../Select";

export type AppearanceSettingsProps = {
  className?: string;
};

export function AppearanceSettings({ className }: AppearanceSettingsProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  return (
    <div className={cn("max-w-md space-y-6 rounded-xl border border-border bg-card p-6", className)}>
      <div>
        <h2 className="text-base font-semibold text-foreground">Appearance</h2>
        <p className="mt-1 text-sm text-muted">Preview how Luminet adapts to user preferences.</p>
      </div>
      <FormField label="Color mode">
        <ThemeToggle theme={theme} onChange={setTheme} />
      </FormField>
      <FormField label="Density" helperText="Affects list and table row height.">
        <Select
          size="sm"
          options={[
            { value: "comfortable", label: "Comfortable" },
            { value: "compact", label: "Compact" },
          ]}
          defaultValue="comfortable"
        />
      </FormField>
    </div>
  );
}
