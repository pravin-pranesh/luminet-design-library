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


