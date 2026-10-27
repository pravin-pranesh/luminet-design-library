import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Image } from "./Image";

export type ProductCardProps = {
  title: string;
  price: string;
  compareAtPrice?: string;
  imageUrl?: string;
  badge?: string;
  onAddToCart?: () => void;
  className?: string;
};

export function ProductCard({
  title,
  price,
  compareAtPrice,
  imageUrl,
  badge,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-150 hover:shadow-md",
        className,
      )}
    >
      <div className="relative">
        <Image src={imageUrl} alt="" aspectRatio="1/1" className="w-full" />
        {badge ? (
          <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-white">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">{price}</span>
          {compareAtPrice ? (
            <span className="text-sm text-muted line-through">{compareAtPrice}</span>
          ) : null}
        </div>
        <Button type="button" size="sm" className="mt-auto w-full" onClick={onAddToCart}>
          Add to bag
        </Button>
      </div>
    </article>
  );
}
