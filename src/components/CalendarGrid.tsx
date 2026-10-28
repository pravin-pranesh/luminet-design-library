import { cn } from "../lib/cn";

export type CalendarGridProps = {
  monthLabel: string;
  weekdayLabels?: string[];
  weeks: (number | null)[][];
  selectedDay?: number;
  onDaySelect?: (day: number) => void;
  className?: string;
};

const defaultWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarGrid({
  monthLabel,
  weekdayLabels = defaultWeekdays,
  weeks,
  selectedDay,
  onDaySelect,
  className,
}: CalendarGridProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-sm", className)}>
      <div className="mb-3 text-center text-sm font-semibold text-foreground">{monthLabel}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
        {weekdayLabels.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.flat().map((day, i) =>
          day == null ? (
            <span key={`empty-${i}`} className="aspect-square" aria-hidden />
          ) : (
            <button
              key={day}
              type="button"
              onClick={() => onDaySelect?.(day)}
              className={cn(
                "aspect-square rounded-md text-sm transition-colors duration-150",
                selectedDay === day
                  ? "bg-primary font-medium text-white hover:bg-primary-hover"
                  : "text-foreground hover:bg-foreground/[0.06]",
              )}
              aria-pressed={selectedDay === day}
              aria-label={`Day ${day}`}
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
