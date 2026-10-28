import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "./Badge";
import { Card } from "./layout/Card";

export type KanbanCard = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
};

export type KanbanColumn = {
  id: string;
  title: ReactNode;
  cards: KanbanCard[];
  accent?: "neutral" | "primary" | "success" | "warning";
};

export type KanbanBoardProps = {
  columns: KanbanColumn[];
  className?: string;
  onCardClick?: (columnId: string, cardId: string) => void;
};

const accentBar = {
  neutral: "bg-border",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
} as const;

export function KanbanBoard({ columns, className, onCardClick }: KanbanBoardProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-foreground/[0.02]"
        >
          <header className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={cn("h-4 w-1 shrink-0 rounded-full", accentBar[col.accent ?? "primary"])}
                aria-hidden
              />
              <h3 className="truncate text-sm font-semibold text-foreground">{col.title}</h3>
            </div>
            <Badge size="xs" variant="subtle">
              {col.cards.length}
            </Badge>
          </header>
          <ul className="flex flex-1 flex-col gap-2 p-2">
            {col.cards.map((card) => (
              <li key={card.id}>
                <Card
                  variant="outline"
                  padding="sm"
                  interactive={Boolean(onCardClick)}
                  className="w-full text-left"
                  role={onCardClick ? "button" : undefined}
                  tabIndex={onCardClick ? 0 : undefined}
                  onClick={onCardClick ? () => onCardClick(col.id, card.id) : undefined}
                  onKeyDown={
                    onCardClick
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onCardClick(col.id, card.id);
                          }
                        }
                      : undefined
                  }
                >
                  <div className="font-medium text-foreground">{card.title}</div>
                  {card.subtitle ? <div className="mt-1 text-xs text-muted">{card.subtitle}</div> : null}
                  {card.meta ? <div className="mt-2 text-xs text-muted">{card.meta}</div> : null}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
