import { cn } from "../lib/cn";
import { Button } from "./Button";

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  size = "sm",
  className,
}: PaginationProps) {
  const btnSize = size === "xs" ? "xs" : size === "lg" ? "md" : "sm";
  const start = Math.max(1, page - siblingCount);
  const end = Math.min(pageCount, page + siblingCount);
  const pages = range(start, end);

  if (pageCount <= 1) return null;

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Pagination">
      <Button
        type="button"
        variant="outline"
        size={btnSize}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        Prev
      </Button>
      {start > 1 ? (
        <>
          <Button type="button" variant={page === 1 ? "solid" : "ghost"} size={btnSize} onClick={() => onPageChange(1)}>
            1
          </Button>
          {start > 2 ? <span className="px-1 text-muted">…</span> : null}
        </>
      ) : null}
      {pages.map((p) => (
        <Button
          key={p}
          type="button"
          variant={p === page ? "solid" : "ghost"}
          size={btnSize}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Button>
      ))}
      {end < pageCount ? (
        <>
          {end < pageCount - 1 ? <span className="px-1 text-muted">…</span> : null}
          <Button
            type="button"
            variant={page === pageCount ? "solid" : "ghost"}
            size={btnSize}
            onClick={() => onPageChange(pageCount)}
          >
            {pageCount}
          </Button>
        </>
      ) : null}
      <Button
        type="button"
        variant="outline"
        size={btnSize}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  );
}
