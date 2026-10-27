import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  center?: boolean;
};

const maxMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
} as const;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = "xl", center = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full px-4 sm:px-6", maxMap[maxWidth], center && "mx-auto", className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";
