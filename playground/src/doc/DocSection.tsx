import type { ReactNode } from "react";

type DocSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
};

export function DocSection({ title, description, children, id }: DocSectionProps) {
  return (
    <section id={id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <header className="mb-5">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
