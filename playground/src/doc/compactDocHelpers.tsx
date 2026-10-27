import type { ReactNode } from "react";

export function StateExample({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted">{title}</span>
      {children}
    </div>
  );
}

export function buildJsxSnippet(
  name: string,
  values: Record<string, string | boolean>,
  keys: { key: string; attr?: string; quote?: boolean; omit?: string | boolean }[],
) {
  const lines: string[] = [`<${name}`];
  for (const { key, attr, quote = true, omit } of keys) {
    const v = values[key];
    if (omit !== undefined && v === omit) continue;
    if (typeof v === "boolean") {
      if (v) lines.push(`  ${attr ?? key}`);
    } else if (v !== "" && v !== undefined) {
      lines.push(quote ? `  ${attr ?? key}="${String(v)}"` : `  ${attr ?? key}={${v}}`);
    }
  }
  lines.push("/>");
  return lines.join("\n");
}
