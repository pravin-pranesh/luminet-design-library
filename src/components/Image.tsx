import type { ImgHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  aspectRatio?: "1/1" | "4/3" | "16/9" | "auto";
  fit?: "cover" | "contain";
  rounded?: "none" | "md" | "lg" | "full";
};

const ratioClass = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  auto: "",
};

const roundedClass = {
  none: "",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export function Image({
  aspectRatio = "auto",
  fit = "cover",
  rounded = "md",
  className,
  alt = "",
  ...props
}: ImageProps) {
  return (
    <img
      alt={alt}
      className={cn(
        "bg-foreground/[0.04]",
        ratioClass[aspectRatio],
        roundedClass[rounded],
        fit === "cover" ? "object-cover" : "object-contain",
        aspectRatio !== "auto" && "w-full",
        className,
      )}
      {...props}
    />
  );
}
