import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type BoxProps = HTMLAttributes<HTMLDivElement>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Box.displayName = "Box";
