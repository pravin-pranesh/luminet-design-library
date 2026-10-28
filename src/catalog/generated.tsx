import {
  forwardRef,
} from "react";
import { cn } from "../lib/cn";
import { luminetMutedText, luminetSurfaceClass, type LuminetCommonProps } from "../lib/luminet-common";

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-foreground/[0.02] px-3 py-6 text-center text-sm text-muted">
      {label}
    </div>
  );
}


export const Editor = forwardRef<HTMLDivElement, LuminetCommonProps>(function Editor(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="Editor" />}
    </div>
  );
});

export const CouponField = forwardRef<HTMLDivElement, LuminetCommonProps>(function CouponField(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="CouponField" />}
    </div>
  );
});

export const FieldSelectModal = forwardRef<HTMLDivElement, LuminetCommonProps>(function FieldSelectModal(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="FieldSelectModal" />}
    </div>
  );
});
