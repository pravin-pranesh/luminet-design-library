import { cn } from "../lib/cn";

export type VideoPlayerProps = {
  src?: string;
  poster?: string;
  title?: string;
  className?: string;
};

export function VideoPlayer({ src, poster, title = "Video", className }: VideoPlayerProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-black shadow-sm", className)}>
      <video
        className="aspect-video w-full"
        controls
        preload="metadata"
        poster={poster}
        src={src}
        aria-label={title}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
