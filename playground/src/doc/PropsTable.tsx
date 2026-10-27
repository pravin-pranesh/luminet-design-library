export type PropDefinition = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

type PropsTableProps = {
  rows: PropDefinition[];
};

export function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-background/80">
            <th className="px-4 py-3 font-semibold text-foreground">Prop</th>
            <th className="px-4 py-3 font-semibold text-foreground">Type</th>
            <th className="px-4 py-3 font-semibold text-foreground">Default</th>
            <th className="px-4 py-3 font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-mono text-xs text-primary">{row.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted">{row.type}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted">{row.default ?? "—"}</td>
              <td className="px-4 py-3 text-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
