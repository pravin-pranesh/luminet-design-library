import { cn } from "../lib/cn";

export type ApexBarChartProps = {
  title?: string;
  series?: number[];
  labels?: string[];
  className?: string;
};

export function ApexBarChart({
  title = "Volume",
  series = [40, 65, 45, 80, 55, 72],
  labels,
  className,
}: ApexBarChartProps) {
  const max = Math.max(...series, 1);
  const barLabels = labels ?? series.map((_, i) => String(i + 1));

  return (
    <figure className={cn("rounded-lg border border-border bg-card p-4", className)}>
      {title ? <figcaption className="mb-3 text-sm font-semibold text-foreground">{title}</figcaption> : null}
      <div className="flex h-36 items-end gap-2" role="img" aria-label={title}>
        {series.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-primary transition-all duration-150 hover:bg-primary-hover"
              style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
              title={`${barLabels[i]}: ${v}`}
            />
            <span className="text-[10px] text-muted">{barLabels[i]}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
