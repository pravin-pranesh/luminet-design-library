import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const reviewStarsVariants = cva("inline-flex items-center gap-0.5 text-warning", {
  variants: {
    size: {
      xs: "text-xs gap-0.5",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: { size: "sm" },
});

export type ReviewStarsProps = VariantProps<typeof reviewStarsVariants> & {
  rating: number;
  max?: number;
  reviewCount?: number;
  className?: string;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-[1em]" aria-hidden>
      <path
        d={
          filled
            ? "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            : "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        }
        className={filled ? undefined : "opacity-25"}
      />
    </svg>
  );
}

export function ReviewStars({ rating, max = 5, reviewCount, size, className }: ReviewStarsProps) {
  const clamped = Math.max(0, Math.min(max, rating));
  return (
    <span
      className={cn(reviewStarsVariants({ size }), className)}
      role="img"
      aria-label={`${clamped} out of ${max} stars${reviewCount != null ? `, ${reviewCount} reviews` : ""}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} filled={i < Math.round(clamped)} />
      ))}
      {reviewCount != null ? <span className="ml-1 text-muted">({reviewCount})</span> : null}
    </span>
  );
}

export { reviewStarsVariants };
