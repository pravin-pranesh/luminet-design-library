import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 font-semibold text-primary",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px]",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type AvatarProps = VariantProps<typeof avatarVariants> & {
  name?: string;
  src?: string;
  alt?: string;
  className?: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function Avatar({ name, src, alt, size, className }: AvatarProps) {
  const label = alt ?? name ?? "User";
  return (
    <span className={cn(avatarVariants({ size }), className)} role="img" aria-label={label}>
      {src ? (
        <img src={src} alt={alt ?? ""} className="size-full object-cover" />
      ) : (
        initials(name ?? "?")
      )}
    </span>
  );
}

export { avatarVariants };
