import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Search } from "./Search";

export type LauncherResult = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  href?: string;
  onSelect?: () => void;
};

export type LauncherSearchEngineProps = {
  query: string;
  onQueryChange: (query: string) => void;
  results: LauncherResult[];
  placeholder?: string;
  emptyMessage?: ReactNode;
  className?: string;
};

export function LauncherSearchEngine({
  query,
  onQueryChange,
  results,
  placeholder = "Search apps, pages, actions…",
  emptyMessage = "No results",
  className,
}: LauncherSearchEngineProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-lg", className)}>
      <div className="border-b border-border p-3">
        <Search
          size="md"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Launcher search"
          autoFocus
        />
      </div>
      <ul className="max-h-64 overflow-y-auto py-1" role="listbox">
        {results.length === 0 ? (
          <li className="px-4 py-6 text-center text-sm text-muted">{emptyMessage}</li>
        ) : (
          results.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-primary/[0.06] focus-visible:bg-primary/[0.06] focus-visible:outline-none"
                onClick={item.onSelect}
              >
                <span className="font-medium text-foreground">{item.title}</span>
                {item.subtitle ? <span className="text-xs text-muted">{item.subtitle}</span> : null}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
