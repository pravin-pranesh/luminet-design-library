import * as Luminet from "@luminet/design-library";
import { useMemo, type ComponentType, type ReactNode } from "react";
import { ComponentPlayground } from "../doc/ComponentPlayground";
import { DocPageLayout } from "../doc/DocPageLayout";
import { DocSection } from "../doc/DocSection";
import { PropsTable, type PropDefinition } from "../doc/PropsTable";
import catalogMeta from "../doc/catalog-meta.json";

type CatalogEntry = (typeof catalogMeta)[number];

const COMMON_PROPS: PropDefinition[] = [
  { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "md", description: "Spacing and typography scale." },
  { name: "title", type: "ReactNode", description: "Primary heading or label inside the component." },
  { name: "description", type: "ReactNode", description: "Supporting copy." },
  { name: "children", type: "ReactNode", description: "Nested content." },
  { name: "className", type: "string", description: "Additional Tailwind classes." },
  { name: "disabled", type: "boolean", description: "Disables interaction when supported." },
];

function PreviewWrapper({ exportName, children }: { exportName: string; children: ReactNode }) {
  if (exportName === "Modal" || exportName === "AlertDialog" || exportName === "ConfirmDialog" || exportName === "LimitReachedModal") {
    return <div className="text-sm text-muted">Use the playground toggle or wire isOpen in your app.</div>;
  }
  return children;
}

function renderInstance(
  Comp: ComponentType<Record<string, unknown>>,
  exportName: string,
  values: Record<string, string | boolean>,
): ReactNode {
  const size = (values.size as "md") ?? "md";
  const title = String(values.title ?? exportName);
  if (exportName === "Modal" || exportName === "AlertDialog") {
    return (
      <Comp
        isOpen
        onClose={() => undefined}
        onConfirm={() => undefined}
        title={title}
        description="Preview"
      />
    );
  }
  if (exportName === "Pagination") {
    return <Comp page={2} pageCount={5} onPageChange={() => undefined} />;
  }
  if (exportName === "FilterBar") {
    return (
      <Comp
        chips={[
          { id: "a", label: "Active", active: true },
          { id: "b", label: "Draft" },
        ]}
      />
    );
  }
  if (exportName === "AppSwitcher") {
    return (
      <Comp
        apps={[
          { id: "1", name: "Sales", description: "CRM" },
          { id: "2", name: "Store", description: "Commerce" },
        ]}
        currentAppId="1"
      />
    );
  }
  if (exportName === "DescriptionList") {
    return (
      <Comp
        items={[
          { term: "SKU", description: "LN-001" },
          { term: "Status", description: "In stock" },
        ]}
      />
    );
  }
  if (exportName === "ProductCard") {
    return <Comp title="Merino tee" price="$48" />;
  }
  if (exportName === "CartItem") {
    return <Comp title="Merino tee" price="$48" quantity={1} />;
  }
  if (exportName === "BagBar") {
    return <Comp itemCount={2} subtotal="$96" />;
  }
  if (exportName === "CopyButton") {
    return <Comp value="npm i @luminet/design-library" />;
  }
  if (exportName === "Avatar") {
    return <Comp name="Alex Rivera" />;
  }
  if (exportName === "Table") {
    return (
      <Comp>
        <Luminet.TableHead>
          <Luminet.TableRow>
            <Luminet.TableHeaderCell>Name</Luminet.TableHeaderCell>
            <Luminet.TableHeaderCell>Role</Luminet.TableHeaderCell>
          </Luminet.TableRow>
        </Luminet.TableHead>
        <Luminet.TableBody>
          <Luminet.TableRow>
            <Luminet.TableCell>Jamie</Luminet.TableCell>
            <Luminet.TableCell>Admin</Luminet.TableCell>
          </Luminet.TableRow>
        </Luminet.TableBody>
      </Comp>
    );
  }
  if (exportName === "List") {
    return (
      <Comp variant="divided">
        <Luminet.ListItem>First</Luminet.ListItem>
        <Luminet.ListItem>Second</Luminet.ListItem>
      </Comp>
    );
  }
  return (
    <Comp
      size={size}
      title={title}
      description="Luminet presentation component."
      disabled={Boolean(values.disabled)}
    />
  );
}

function resolveComponent(exportName: string): ComponentType<Record<string, unknown>> | null {
  const lib = Luminet as Record<string, unknown>;
  const Comp = lib[exportName];
  if (typeof Comp === "function") {
    return Comp as ComponentType<Record<string, unknown>>;
  }
  return null;
}

export function CatalogDocPage({ sectionId, componentId }: { sectionId: string; componentId: string }) {
  const entry = useMemo(
    () => catalogMeta.find((e) => e.sectionId === sectionId && e.id === componentId) as CatalogEntry | undefined,
    [sectionId, componentId],
  );

  const Comp = useMemo(() => (entry ? resolveComponent(entry.exportName) : null), [entry]);

  if (!entry) {
    return null;
  }

  if (!Comp) {
    return (
      <DocPageLayout sectionLabel={entry.sectionLabel} componentLabel={entry.label} benefit={entry.benefit} exportName={entry.exportName}>
        <DocSection title="Implementation">
          <p className="text-sm text-muted">Export {entry.exportName} is not available from the package yet.</p>
        </DocSection>
      </DocPageLayout>
    );
  }

  const previewValues = { size: "md", title: entry.label, disabled: false };

  return (
    <DocPageLayout
      sectionLabel={entry.sectionLabel}
      componentLabel={entry.label}
      benefit={entry.benefit}
      exportName={entry.exportName}
      description={`Accessible, token-driven ${entry.label} for sales-ready product UI.`}
    >
      <DocSection title="States" description="Default and disabled presentations.">
        <PreviewWrapper exportName={entry.exportName}>
          <div className="flex flex-wrap gap-6">
            {renderInstance(Comp, entry.exportName, previewValues)}
            {renderInstance(Comp, entry.exportName, { ...previewValues, title: `${entry.label} (disabled)`, disabled: true })}
          </div>
        </PreviewWrapper>
      </DocSection>
      <DocSection title="Sizes" description="xs through lg use shared Luminet spacing tokens.">
        <div className="grid gap-4 md:grid-cols-2">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size}>{renderInstance(Comp, entry.exportName, { ...previewValues, size })}</div>
          ))}
        </div>
      </DocSection>
      <DocSection title="Semantic colour variants" description="Primary actions and surfaces use brand primary #9E4244 via theme tokens.">
        {renderInstance(Comp, entry.exportName, previewValues)}
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "title", label: "title", defaultValue: entry.label },
          {
            type: "select",
            key: "size",
            label: "size",
            defaultValue: "md",
            options: ["xs", "sm", "md", "lg"].map((v) => ({ value: v, label: v })),
          },
          { type: "boolean", key: "disabled", label: "disabled" },
        ]}
        renderPreview={(v) => renderInstance(Comp, entry.exportName, v)}
        buildSnippet={(v) =>
          `<${entry.exportName} size="${v.size}" title="${v.title}"${v.disabled ? " disabled" : ""} />`
        }
      />
      <DocSection title="Props">
        <PropsTable rows={COMMON_PROPS} />
      </DocSection>
    </DocPageLayout>
  );
}
