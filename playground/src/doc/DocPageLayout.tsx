import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type DocPageLayoutProps = {
  sectionLabel: string;
  componentLabel: string;
  version?: string;
  description?: string;
  children: ReactNode;
};

export function DocPageLayout({
  sectionLabel,
  componentLabel,
  version = "0.1.0",
  description,
  children,
}: DocPageLayoutProps) {
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
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{componentLabel}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p> : null}
      </header>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
