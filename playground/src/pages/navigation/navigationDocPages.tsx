import {
  AppSwitcher,
  ContextMenu,
  Flex,
  LauncherSearchEngine,
  LauncherTrigger,
  MobileNav,
  Pagination,
  SidebarNav,
  Stepper,
} from "@luminet/design-library";
import { useMemo, useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const sizeProp: PropDefinition = {
  name: "size",
  type: '"xs" | "sm" | "md" | "lg"',
  default: "md",
  description: "Control sizing from the Luminet taxonomy.",
};

const DEMO_APPS = [
  { id: "inventory", name: "Inventory", description: "Stock & fulfillment" },
  { id: "campaign", name: "Campaign", description: "Marketing automation" },
  { id: "billing", name: "Billing", description: "Plans & invoices" },
];

const SIDEBAR_ITEMS = [
  { id: "home", label: "Home", active: true },
  { id: "orders", label: "Orders" },
  { id: "catalog", label: "Catalog" },
  { id: "settings", label: "Settings" },
];

const MOBILE_ITEMS = [
  { id: "home", label: "Home", icon: "⌂", active: true },
  { id: "search", label: "Search", icon: "⌕" },
  { id: "bag", label: "Bag", icon: "🛒" },
  { id: "account", label: "Account", icon: "◎" },
];

export function AppSwitcherDocPage() {
  const [appId, setAppId] = useState("inventory");
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="AppSwitcher" description="Switch between workspace apps without leaving context.">
      <DocSection title="Sizes">
        <Flex gap="3" align="center" wrap>
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <AppSwitcher key={s} size={s} apps={DEMO_APPS} currentAppId={appId} onSelect={(a) => setAppId(a.id)} />
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "open", label: "demo only" }]}
        renderPreview={() => (
          <AppSwitcher apps={DEMO_APPS} currentAppId={appId} onSelect={(a) => setAppId(a.id)} />
        )}
        buildSnippet={() => `<AppSwitcher apps={apps} currentAppId="inventory" onSelect={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "apps", type: "AppSwitcherApp[]", description: "Selectable applications." },
            { name: "currentAppId", type: "string", description: "Active app id." },
            { name: "onSelect", type: "(app) => void", description: "Selection handler." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PaginationDocPage() {
  const [page, setPage] = useState(2);
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="Pagination" description="Paged lists with previous/next and numbered pages.">
      <DocSection title="Example">
        <Pagination page={page} pageCount={8} onPageChange={setPage} />
      </DocSection>
      <DocSection title="Sizes">
        <Flex direction="column" gap="4">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Pagination key={s} size={s} page={1} pageCount={5} onPageChange={() => undefined} />
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "pageCount", label: "pageCount", defaultValue: "6" }]}
        renderPreview={(v) => (
          <Pagination page={page} pageCount={Number(v.pageCount) || 3} onPageChange={setPage} />
        )}
        buildSnippet={(v) => `<Pagination page={2} pageCount={${v.pageCount}} onPageChange={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "page", type: "number", description: "Current page (1-indexed)." },
            { name: "pageCount", type: "number", description: "Total pages." },
            { name: "onPageChange", type: "(page) => void", description: "Page change handler." },
            { name: "siblingCount", type: "number", default: "1", description: "Pages shown around current." },
            sizeProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function LauncherTriggerDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="LauncherTrigger" description="Grid icon control that opens the command launcher.">
      <DocSection title="Sizes">
        <Flex gap="3" align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <StateExample key={s} title={s}>
              <LauncherTrigger size={s} />
            </StateExample>
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "size",
            label: "size",
            defaultValue: "md",
            options: ["xs", "sm", "md", "lg"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => <LauncherTrigger size={v.size as "md"} />}
        buildSnippet={(v) => `<LauncherTrigger size="${v.size}" />`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "label", type: "string", default: "Open launcher", description: "Accessible name." }, sizeProp]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function LauncherSearchEngineDocPage() {
  const [query, setQuery] = useState("inv");
  const all = useMemo(
    () => [
      { id: "1", title: "Inventory dashboard", subtitle: "Overview" },
      { id: "2", title: "Invite teammate", subtitle: "Settings" },
      { id: "3", title: "Invoice #8821", subtitle: "Billing" },
    ],
    [],
  );
  const results = all.filter((r) => String(r.title).toLowerCase().includes(query.toLowerCase()));

  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="LauncherSearchEngine" description="Search surface for apps, routes, and actions.">
      <DocSection title="Example">
        <LauncherSearchEngine query={query} onQueryChange={setQuery} results={results} className="max-w-md" />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "query", type: "string", description: "Controlled search value." },
            { name: "onQueryChange", type: "(q) => void", description: "Query change handler." },
            { name: "results", type: "LauncherResult[]", description: "Filtered result rows." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function StepperDocPage() {
  const [active, setActive] = useState(1);
  const steps = [
    { id: "cart", label: "Bag", description: "Review items" },
    { id: "ship", label: "Shipping", description: "Delivery method" },
    { id: "pay", label: "Payment", description: "Secure checkout" },
  ];
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="Stepper" description="Checkout and onboarding progress with clear active step.">
      <DocSection title="Horizontal">
        <Stepper steps={steps} activeStep={active} />
        <Flex gap="2" className="mt-4">
          <button type="button" className="text-sm text-primary" onClick={() => setActive((a) => Math.max(0, a - 1))}>
            Back
          </button>
          <button type="button" className="text-sm text-primary" onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}>
            Next
          </button>
        </Flex>
      </DocSection>
      <DocSection title="Vertical">
        <Stepper steps={steps} activeStep={active} orientation="vertical" className="max-w-xs" />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "steps", type: "StepperStep[]", description: "Step labels and optional descriptions." },
            { name: "activeStep", type: "number", description: "Zero-based active index." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: "horizontal", description: "Layout direction." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function SidebarNavDocPage() {
  const [active, setActive] = useState("home");
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="SidebarNav" description="Primary app navigation with Luminet active accent bar.">
      <DocSection title="Example">
        <SidebarNav
          className="h-64 w-56 rounded-lg"
          header={<span className="text-sm font-semibold text-foreground">Luminet</span>}
          items={SIDEBAR_ITEMS.map((i) => ({ ...i, active: i.id === active, onClick: () => setActive(i.id) }))}
          footer={<span className="text-xs text-muted">Signed in as admin</span>}
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "items", type: "SidebarNavItem[]", description: "Nav rows with optional href or onClick." },
            { name: "header", type: "ReactNode", description: "Top slot (wordmark)." },
            { name: "footer", type: "ReactNode", description: "Bottom slot." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function MobileNavDocPage() {
  const [active, setActive] = useState("home");
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="MobileNav" description="Bottom tab bar for mobile commerce and app shells.">
      <DocSection title="Example">
        <MobileNav
          className="max-w-sm rounded-lg"
          items={MOBILE_ITEMS.map((i) => ({ ...i, active: i.id === active, onClick: () => setActive(i.id) }))}
        />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "active", label: "active id", defaultValue: "home" }]}
        renderPreview={(v) => (
          <MobileNav
            className="max-w-sm"
            items={MOBILE_ITEMS.map((i) => ({ ...i, active: i.id === v.active, onClick: () => undefined }))}
          />
        )}
        buildSnippet={() => `<MobileNav items={items} />`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "items", type: "MobileNavItem[]", description: "Tab items with icon and label." }]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function ContextMenuDocPage() {
  return (
    <DocPageLayout sectionLabel="Navigation" componentLabel="ContextMenu" description="Action menu for right-click or overflow patterns.">
      <DocSection title="Default">
        <ContextMenu
          className="max-w-xs"
          items={[
            { id: "open", label: "Open" },
            { id: "duplicate", label: "Duplicate" },
            { id: "archive", label: "Archive", disabled: true },
            { id: "delete", label: "Delete", destructive: true },
          ]}
        />
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "items", type: "ContextMenuItem[]", description: "Menu rows with optional destructive/disabled." },
            { name: "label", type: "string", description: "menu aria-label." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
