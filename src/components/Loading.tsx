import { cn } from "../lib/cn";
import { CircularProgress } from "./CircularProgress";

export type LoadingProps = {
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  overlay?: boolean;
};

export function Loading({ label = "Loading…", size = "md", className, overlay }: LoadingProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)} role="status">
      <CircularProgress size={size} aria-hidden />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">{content}</div>
    );
  }
  return content;
}
