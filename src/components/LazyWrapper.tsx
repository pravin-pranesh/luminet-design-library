import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type LazyWrapperProps = {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
};

export function LazyWrapper({
  children,
  placeholder,
  rootMargin = "100px",
  className,
}: LazyWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} className={cn(className)}>
      {visible ? children : (placeholder ?? <div className="h-24 animate-pulse rounded-lg bg-foreground/[0.06]" />)}
    </div>
  );
}
