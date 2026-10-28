import { cn } from "../../lib/cn";

const TOKENS = [
  { name: "--color-primary", value: "#9E4244", note: "Primary actions" },
  { name: "--color-primary-hover", value: "#8E3B3D", note: "Hover state" },
  { name: "--color-border", value: "theme", note: "Hairline borders" },
  { name: "--radius-md", value: "0.5rem", note: "Cards & inputs" },
];

export type ThemingGuideProps = {
  className?: string;
};

export function ThemingGuide({ className }: ThemingGuideProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-base font-semibold text-foreground">Theme tokens</h2>
        <p className="mt-1 text-sm text-muted">Override CSS variables after importing theme.css.</p>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-foreground/[0.03] text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-2">Token</th>
            <th className="px-4 py-2">Example</th>
            <th className="px-4 py-2">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {TOKENS.map((row) => (
            <tr key={row.name}>
              <td className="px-4 py-2 font-mono text-xs text-primary">{row.name}</td>
              <td className="px-4 py-2 text-muted">{row.value}</td>
              <td className="px-4 py-2 text-foreground">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
