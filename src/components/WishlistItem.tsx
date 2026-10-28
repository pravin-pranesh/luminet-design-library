import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Image } from "./Image";
import { PriceDisplay } from "./PriceDisplay";

export type WishlistItemProps = {
  title: string;
  price: string;
  compareAt?: string;
  imageUrl?: string;
  inStock?: boolean;
  onMoveToBag?: () => void;
  onRemove?: () => void;
  className?: string;
};

export function WishlistItem({
  title,
  price,
  compareAt,
  imageUrl,
  inStock = true,
  onMoveToBag,
  onRemove,
  className,
}: WishlistItemProps) {
  return (
    <div className={cn("flex gap-4 rounded-lg border border-border bg-card p-3 transition-shadow duration-150 hover:shadow-sm", className)}>
      <Image src={imageUrl} alt="" aspectRatio="1/1" className="size-20 shrink-0 rounded-md" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-medium text-foreground">{title}</p>
        <PriceDisplay price={price} compareAt={compareAt} size="sm" />
        <p className={cn("text-xs", inStock ? "text-success" : "text-destructive")}>
          {inStock ? "In stock" : "Out of stock"}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          <Button type="button" size="xs" disabled={!inStock} onClick={onMoveToBag}>
            Move to bag
          </Button>
          {onRemove ? (
            <Button type="button" size="xs" variant="ghost" onClick={onRemove}>
              Remove
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
