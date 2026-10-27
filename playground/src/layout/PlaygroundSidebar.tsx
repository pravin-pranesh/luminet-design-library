import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  componentRegistry,
  countRegistryLeaves,
  type NavSection,
} from "../nav/component-registry";

const COLLAPSED_KEY = "luminet-sidebar-collapsed";
const HIDDEN_KEY = "luminet-sidebar-hidden";
const EXPANDED_KEY = "luminet-sidebar-expanded";

function loadJsonSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveJsonSet(key: string, value: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...value]));
}

type PlaygroundSidebarProps = {
  hidden: boolean;
  collapsed: boolean;
  onToggleHidden: () => void;
  onToggleCollapsed: () => void;
};

export function PlaygroundSidebar({
  hidden,
  collapsed,
  onToggleHidden,
  onToggleCollapsed,
}: PlaygroundSidebarProps) {
  const location = useLocation();
  const total = countRegistryLeaves();
  const [expanded, setExpanded] = useState<Set<string>>(() => loadJsonSet(EXPANDED_KEY));

  useEffect(() => {
    saveJsonSet(EXPANDED_KEY, expanded);
  }, [expanded]);

  useEffect(() => {
    const match = location.pathname.match(/^\/c\/([^/]+)/);
    if (match) {
      setExpanded((prev) => {
        const next = new Set(prev);
        next.add(match[1]);
        return next;
      });
    }
  }, [location.pathname]);

  const activeSectionId = useMemo(() => {
    const match = location.pathname.match(/^\/c\/([^/]+)/);
    return match?.[1];
  }, [location.pathname]);

  function toggleSection(section: NavSection) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(section.id)) next.delete(section.id);
      else next.add(section.id);
      return next;
    });
  }

  if (hidden) {
    return (
      <button
        type="button"
        onClick={onToggleHidden}
        className="fixed bottom-4 left-4 z-30 rounded-lg bg-sidebar px-3 py-2 text-xs font-medium text-white shadow-lg"
      >
        Show sidebar
      </button>
    );
  }

  return (
    <aside
      className={`flex shrink-0 flex-col border-r border-white/10 bg-[var(--color-playground-sidebar)] text-slate-200 transition-[width] duration-200 ${
        collapsed ? "w-[4.25rem]" : "w-72"
      }`}
    >
      <div className="flex items-start justify-between gap-2 border-b border-white/10 px-4 py-4">
        <div className={collapsed ? "sr-only" : "min-w-0"}>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              L
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Luminet Design Library</p>
              <p className="text-xs text-slate-400">{total} components</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:thin]">
        {componentRegistry.map((section) => {
          const isOpen = expanded.has(section.id);
          const isActiveSection = activeSectionId === section.id;
          return (
            <div key={section.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleSection(section)}
                className={`flex w-full items-center gap-2 rounded-[var(--radius-sidebar-item)] px-2 py-2 text-left text-sm transition-colors ${
                  isActiveSection
                    ? "bg-[var(--color-playground-sidebar-active)] text-white"
                    : "text-slate-300 hover:bg-[var(--color-playground-sidebar-hover)]"
                } ${isActiveSection ? "border-l-[3px] border-[var(--color-playground-accent-bar)] pl-[calc(0.5rem-3px)]" : "border-l-[3px] border-transparent"}`}
                title={collapsed ? section.label : undefined}
              >
                <span className="w-5 shrink-0 text-center text-xs opacity-80">{section.icon}</span>
                {!collapsed ? (
                  <>
                    <span className="min-w-0 flex-1 truncate font-medium">{section.label}</span>
                    <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs tabular-nums text-slate-300">
                      {section.children.length}
                    </span>
                    <span className="text-[10px] text-slate-500">{isOpen ? "▼" : "▶"}</span>
                  </>
                ) : null}
              </button>
              {isOpen && !collapsed ? (
                <ul className="mt-0.5 space-y-0.5 pb-2 pl-4">
                  {section.children.map((leaf) => {
                    const selected = location.pathname === leaf.path;
                    return (
                      <li key={leaf.id}>
                        <Link
                          to={leaf.path}
                          className={`flex items-center gap-2 rounded-[var(--radius-sidebar-item)] px-2 py-1.5 text-sm ${
                            selected
                              ? "bg-white/15 font-medium text-white"
                              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                          }`}
                        >
                          <span className="size-1 shrink-0 rounded-full bg-current opacity-60" />
                          <span className="truncate">{leaf.label}</span>
                          {leaf.status === "live" ? (
                            <span className="ml-auto text-[10px] uppercase tracking-wide text-teal-400/90">
                              live
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className={`flex gap-2 border-t border-white/10 p-3 ${collapsed ? "flex-col" : ""}`}>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="flex-1 rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-white/10 hover:text-white"
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
        <button
          type="button"
          onClick={onToggleHidden}
          className="flex-1 rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-white/10 hover:text-white"
        >
          Hide
        </button>
      </div>
    </aside>
  );
}

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSED_KEY) === "true",
  );
  const [hidden, setHidden] = useState(() => localStorage.getItem(HIDDEN_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(COLLAPSED_KEY, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem(HIDDEN_KEY, String(hidden));
  }, [hidden]);

  return {
    collapsed,
    hidden,
    toggleCollapsed: () => setCollapsed((v) => !v),
    toggleHidden: () => setHidden((v) => !v),
  };
}
