import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../Button";

export type GettingStartedOverviewProps = {
  packageName?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function GettingStartedOverview({
  packageName = "@luminet/design-library",
  title = "Ship with Luminet",
  description = "Install the package, import theme.css, and compose accessible components with your brand tokens.",
  className,
}: GettingStartedOverviewProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6 shadow-sm", className)}>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-foreground/[0.03] px-3 py-2 font-mono text-xs text-foreground">
        npm install {packageName}
      </div>
      <Button type="button" size="sm" className="mt-4">
        Browse components
      </Button>
    </div>
  );
}
