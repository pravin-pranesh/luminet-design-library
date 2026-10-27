import { Outlet, Link } from "react-router-dom";
import { PlaygroundSidebar, useSidebarState } from "./PlaygroundSidebar";

export function PlaygroundShell() {
  const sidebar = useSidebarState();

  return (
    <div className="flex min-h-screen bg-background">
      <PlaygroundSidebar
        collapsed={sidebar.collapsed}
        hidden={sidebar.hidden}
        onToggleCollapsed={sidebar.toggleCollapsed}
        onToggleHidden={sidebar.toggleHidden}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border bg-card/95 px-6 py-2.5 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-semibold text-foreground hover:text-primary">
                Luminet Design Library
              </Link>
              <span className="hidden text-muted sm:inline">Playground</span>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <span className="hidden md:inline">Design tokens</span>
              <a
                href="https://github.com/pravin-pranesh/luminet-design-library"
                className="hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
