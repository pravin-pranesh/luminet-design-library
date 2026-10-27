import { Link } from "react-router-dom";
import { countRegistryLeaves, componentRegistry } from "../nav/component-registry";

export function OverviewPage() {
  const live = componentRegistry.flatMap((s) =>
    s.children.filter((c) => c.status === "live").map((c) => ({ ...c, section: s.label })),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-foreground">Luminet Design Library</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pixelize-style component playground for Luminet. Browse {countRegistryLeaves()} catalog
          entries in the sidebar; live components include interactive docs, variant matrices, and
          copy-ready JSX snippets.
        </p>
      </header>
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold text-foreground">Live components</h2>
        <ul className="mt-4 space-y-2">
          {live.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="text-sm font-medium text-primary hover:underline">
                {item.section} / {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
