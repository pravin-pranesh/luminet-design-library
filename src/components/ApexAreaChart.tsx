import { cn } from "../lib/cn";

export type ApexAreaChartProps = {
  title?: string;
  series?: number[];
  labels?: string[];
  className?: string;
  height?: number;
};

export function ApexAreaChart({
  title = "Trend",
  series = [12, 18, 14, 22, 19, 28, 24],
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  className,
  height = 160,
}: ApexAreaChartProps) {
  const max = Math.max(...series, 1);
  const width = 100;
  const step = width / Math.max(series.length - 1, 1);
  const points = series.map((v, i) => `${i * step},${height - (v / max) * (height - 8)}`).join(" ");
  const area = `0,${height} ${points} ${(series.length - 1) * step},${height}`;

  return (
    <figure className={cn("rounded-lg border border-border bg-card p-4", className)}>
      {title ? <figcaption className="mb-3 text-sm font-semibold text-foreground">{title}</figcaption> : null}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full text-primary" role="img" aria-label={title}>
        <defs>
          <linearGradient id="luminet-area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon fill="url(#luminet-area-fill)" points={area} />
        <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={points} />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </figure>
  );
}
