import { cn } from "../lib/cn";
import { Button } from "./Button";

export type FilePreviewProps = {
  name: string;
  sizeLabel?: string;
  mimeLabel?: string;
  thumbnailUrl?: string;
  onRemove?: () => void;
  className?: string;
};

export function FilePreview({
  name,
  sizeLabel,
  mimeLabel,
  thumbnailUrl,
  onRemove,
  className,
}: FilePreviewProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm",
        className,
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-foreground/[0.04] text-xs font-medium text-muted">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="" className="size-full object-cover" />
        ) : (
          name.slice(0, 2).toUpperCase()
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted">
          {[mimeLabel, sizeLabel].filter(Boolean).join(" · ")}
        </p>
      </div>
      {onRemove ? (
        <Button type="button" variant="ghost" size="xs" onClick={onRemove} aria-label={`Remove ${name}`}>
          Remove
        </Button>
      ) : null}
    </div>
  );
}
