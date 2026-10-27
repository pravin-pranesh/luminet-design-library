import { TextInput } from "@luminet/design-library";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

export type PlaygroundControl =
  | {
      type: "text";
      key: string;
      label: string;
      defaultValue?: string;
    }
  | {
      type: "select";
      key: string;
      label: string;
      options: { value: string; label: string }[];
      defaultValue?: string;
    }
  | {
      type: "boolean";
      key: string;
      label: string;
      defaultValue?: boolean;
    };

type ComponentPlaygroundProps = {
  title?: string;
  description?: string;
  controls: PlaygroundControl[];
  renderPreview: (values: Record<string, string | boolean>) => ReactNode;
  buildSnippet: (values: Record<string, string | boolean>) => string;
};

function ControlField({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl;
  value: string | boolean;
  onChange: (next: string | boolean) => void;
}) {
  if (control.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
        <span className="text-foreground">{control.label}</span>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        />
      </label>
    );
  }

  if (control.type === "select") {
    return (
      <label className="block text-sm">
        <span className="mb-1.5 block text-foreground">{control.label}</span>
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full rounded-md border border-border bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {control.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-foreground">{control.label}</span>
      <TextInput size="sm" value={String(value)} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function ComponentPlayground({
  title = "Playground",
  description = "Change a control and the preview and snippet update together.",
  controls,
  renderPreview,
  buildSnippet,
}: ComponentPlaygroundProps) {
  const initial = useMemo(() => {
    const map: Record<string, string | boolean> = {};
    for (const c of controls) {
      if (c.type === "boolean") {
        map[c.key] = c.defaultValue ?? false;
      } else {
        map[c.key] = c.defaultValue ?? "";
      }
    }
    return map;
  }, [controls]);

  const [values, setValues] = useState(initial);
  const snippet = buildSnippet(values);
  const [copied, setCopied] = useState(false);

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <header className="border-b border-border px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </header>
      <div className="grid lg:grid-cols-[320px_1fr]">
        <div className="space-y-4 border-b border-border p-6 lg:border-b-0 lg:border-r">
          {controls.map((control) => (
            <ControlField
              key={control.key}
              control={control}
              value={values[control.key] ?? (control.type === "boolean" ? false : "")}
              onChange={(next) => setValues((prev) => ({ ...prev, [control.key]: next }))}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex min-h-[140px] flex-1 items-center justify-center rounded-lg border border-dashed border-border bg-background/60 p-8">
            {renderPreview(values)}
          </div>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-[#0f172a] p-4 text-xs leading-relaxed text-slate-100">
              <code>{snippet}</code>
            </pre>
            <button
              type="button"
              onClick={copySnippet}
              className="absolute right-3 top-3 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white hover:bg-white/20"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
