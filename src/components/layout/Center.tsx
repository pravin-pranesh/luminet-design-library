import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type CenterProps = HTMLAttributes<HTMLDivElement> & {
  inline?: boolean;
};

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ className, inline, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        inline ? "inline-flex items-center justify-center" : "flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Center.displayName = "Center";
