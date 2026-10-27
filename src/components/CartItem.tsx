import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Image } from "./Image";

export type CartItemProps = {
  title: string;
  variantLabel?: string;
  price: string;
  quantity: number;
  imageUrl?: string;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
  className?: string;
};

export function CartItem({
  title,
  variantLabel,
  price,
  quantity,
  imageUrl,
  onQuantityChange,
  onRemove,
  className,
}: CartItemProps) {
  return (
    <div className={cn("flex gap-4 border-b border-border py-4 last:border-0", className)}>
      <Image src={imageUrl} alt="" aspectRatio="1/1" className="size-20 shrink-0 rounded-md" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <p className="font-medium text-foreground">{title}</p>
          {variantLabel ? <p className="text-xs text-muted">{variantLabel}</p> : null}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 rounded-md border border-border">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              aria-label="Decrease quantity"
              onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
            >
              −
            </Button>
            <span className="min-w-[2rem] text-center text-sm tabular-nums">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              aria-label="Increase quantity"
              onClick={() => onQuantityChange?.(quantity + 1)}
            >
              +
            </Button>
          </div>
          <span className="text-sm font-semibold text-foreground">{price}</span>
        </div>
        {onRemove ? (
          <Button type="button" variant="link" size="xs" className="self-start px-0" onClick={onRemove}>
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}
