import { cn } from "../lib/cn";
import { Image } from "./Image";

export type MediaGalleryItem = {
  id: string;
  src?: string;
  alt?: string;
};

export type MediaGalleryProps = {
  items: MediaGalleryItem[];
  columns?: 2 | 3 | 4;
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

const colClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;

export function MediaGallery({ items, columns = 3, selectedId, onSelect, className }: MediaGalleryProps) {
  return (
    <ul className={cn("grid gap-2", colClass[columns], className)}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "block w-full overflow-hidden rounded-md border-2 transition-all duration-150",
              selectedId === item.id ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/30",
            )}
          >
            <Image src={item.src} alt={item.alt ?? ""} aspectRatio="1/1" className="w-full" />
          </button>
        </li>
      ))}
    </ul>
  );
}
