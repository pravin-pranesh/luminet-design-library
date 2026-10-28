import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { ReviewStars } from "./ReviewStars";

export type VendorCardProps = {
  name: ReactNode;
  rating?: number;
  reviewCount?: number;
  description?: ReactNode;
  avatarUrl?: string;
  onVisit?: () => void;
  className?: string;
};

export function VendorCard({
  name,
  rating,
  reviewCount,
  description,
  avatarUrl,
  onVisit,
  className,
}: VendorCardProps) {
  return (
    <div className={cn("flex gap-4 rounded-lg border border-border bg-card p-4", className)}>
      <Avatar src={avatarUrl} name={String(name)} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground">{name}</p>
        {rating != null ? <ReviewStars rating={rating} reviewCount={reviewCount} size="xs" className="mt-1" /> : null}
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
        {onVisit ? (
          <Button type="button" size="xs" variant="link" className="mt-2 px-0" onClick={onVisit}>
            Visit store
          </Button>
        ) : null}
      </div>
    </div>
  );
}
