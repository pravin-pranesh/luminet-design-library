import { Button } from "@luminet/design-library";
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
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card/95 px-6 py-3 backdrop-blur">
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="font-medium text-foreground hover:text-primary">
              Overview
            </Link>
            <span className="text-muted">Design tokens</span>
            <a
              href="https://github.com/pravin-pranesh/luminet-design-library"
              className="text-muted hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Repository
            </a>
          </div>
          <Button size="sm" variant="outline">
            npm @luminet/design-library
          </Button>
        </header>
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
