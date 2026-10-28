import { cn } from "../lib/cn";

export type UsageMeterProps = {
  label: string;
  used: number;
  limit: number;
  unit?: string;
  className?: string;
};

export function UsageMeter({ label, used, limit, unit = "", className }: UsageMeterProps) {
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const tone = pct >= 90 ? "bg-destructive" : pct >= 70 ? "bg-warning" : "bg-primary";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="tabular-nums text-muted">
          {used}
          {unit} / {limit}
          {unit}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-foreground/[0.08]" role="meter" aria-valuenow={used} aria-valuemin={0} aria-valuemax={limit}>
        <div className={cn("h-full rounded-full transition-all duration-150", tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
