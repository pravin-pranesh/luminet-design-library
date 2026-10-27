import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type DocPageLayoutProps = {
  sectionLabel: string;
  componentLabel: string;
  version?: string;
  /** Sales-forward one-liner — why adopt this component */
  benefit?: string;
  description?: string;
  /** npm package export name for install strip */
  exportName?: string;
  children: ReactNode;
};

export function DocPageLayout({
  sectionLabel,
  componentLabel,
  version = "0.1.0",
  benefit,
  description,
  exportName,
  children,
}: DocPageLayoutProps) {
  const importName = exportName ?? componentLabel.replace(/\s+/g, "");
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-16">
      <nav className="text-sm text-muted">
        <Link to="/" className="hover:text-foreground">
          Playground
        </Link>
        <span className="mx-2 text-border">/</span>
        <span>{sectionLabel}</span>
        <span className="mx-2 text-border">/</span>
        <span className="font-medium text-foreground">{componentLabel}</span>
        <span className="ml-2 font-mono text-xs text-muted">v{version}</span>
      </nav>
      <header className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{componentLabel}</h1>
        {benefit ? (
          <p className="mt-2 max-w-2xl text-base font-medium leading-snug text-foreground">{benefit}</p>
        ) : null}
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
          <span className="text-muted">npm i @luminet/design-library</span>
          <span className="text-border">·</span>
          <span>{`import { ${importName} } from "@luminet/design-library"`}</span>
        </div>
      </header>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
