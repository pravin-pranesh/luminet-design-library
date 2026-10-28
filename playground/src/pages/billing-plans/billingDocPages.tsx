import { InvoiceRow, PlanPill, UpgradeButton, UsageMeter } from "@luminet/design-library";
import { useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const SECTION = "Billing & plans";

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

export function UpgradeButtonDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="UpgradeButton"
      description="Primary upgrade CTA using Luminet brand colors."
    >
      <DocSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <UpgradeButton label="Upgrade" />
          <UpgradeButton variant="outline" label="Compare plans" />
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Upgrade" },
          {
            type: "select",
            key: "variant",
            label: "variant",
            defaultValue: "solid",
            options: [
              { value: "solid", label: "solid" },
              { value: "outline", label: "outline" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <UpgradeButton label={String(v.label)} variant={v.variant as "solid"} />
        )}
        buildSnippet={(v) => `<UpgradeButton label="${v.label}" variant="${v.variant}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "string", default: "Upgrade", description: "Button text." },
            { name: "variant", type: '"solid" | "outline"', default: "solid", description: "Visual style." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "sm", description: "Height and padding." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PlanPillDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="PlanPill"
      description="Compact plan badge for headers, settings, and account menus."
    >
      <DocSection title="Plans">
        <div className="flex flex-wrap gap-2">
          {(["free", "starter", "growth", "enterprise"] as const).map((plan) => (
            <PlanPill key={plan} plan={plan} />
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "plan",
            label: "plan",
            defaultValue: "starter",
            options: ["free", "starter", "growth", "enterprise"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => <PlanPill plan={v.plan as "starter"} />}
        buildSnippet={(v) => `<PlanPill plan="${v.plan}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "plan",
              type: '"free" | "starter" | "growth" | "enterprise"',
              default: "starter",
              description: "Plan tier styling.",
            },
            { name: "children", type: "ReactNode", description: "Override label text." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "sm", description: "Pill scale." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function UsageMeterDocPage() {
  const [used, setUsed] = useState(7200);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="UsageMeter"
      description="Quota progress bar with warning and danger thresholds."
    >
      <DocSection title="Interactive">
        <UsageMeter label="API calls" used={used} limit={10000} unit="" className="max-w-md" />
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="rounded-md border border-border px-3 py-1 text-sm hover:bg-foreground/[0.03]"
            onClick={() => setUsed((u) => Math.max(0, u - 1000))}
          >
            −1k
          </button>
          <button
            type="button"
            className="rounded-md border border-border px-3 py-1 text-sm hover:bg-foreground/[0.03]"
            onClick={() => setUsed((u) => Math.min(10000, u + 1000))}
          >
            +1k
          </button>
        </div>
      </DocSection>
      <DocSection title="Threshold tones">
        <div className="max-w-md space-y-4">
          <StateExample title="Healthy">
            <UsageMeter label="Storage" used={40} limit={100} unit=" GB" />
          </StateExample>
          <StateExample title="Warning (≥70%)">
            <UsageMeter label="Seats" used={8} limit={10} />
          </StateExample>
          <StateExample title="Critical (≥90%)">
            <UsageMeter label="Records" used={9500} limit={10000} />
          </StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Usage" },
          { type: "text", key: "used", label: "used", defaultValue: "50" },
          { type: "text", key: "limit", label: "limit", defaultValue: "100" },
        ]}
        renderPreview={(v) => (
          <UsageMeter
            label={String(v.label)}
            used={Number(v.used) || 0}
            limit={Number(v.limit) || 100}
            className="max-w-md"
          />
        )}
        buildSnippet={(v) => `<UsageMeter label="${v.label}" used={${v.used}} limit={${v.limit}} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "string", description: "Meter title." },
            { name: "used", type: "number", description: "Current usage." },
            { name: "limit", type: "number", description: "Plan cap." },
            { name: "unit", type: "string", default: '""', description: "Suffix appended to counts." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function InvoiceRowDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="InvoiceRow"
      description="Invoice list row with status badge and optional PDF download."
    >
      <DocSection title="Statuses">
        <div className="max-w-lg divide-y divide-border rounded-lg border border-border px-4">
          <InvoiceRow invoiceNumber="INV-2026-0142" date="Oct 1, 2026" amount="$129.00" status="paid" onDownload={() => undefined} />
          <InvoiceRow invoiceNumber="INV-2026-0158" date="Oct 15, 2026" amount="$129.00" status="open" />
          <InvoiceRow invoiceNumber="INV-2026-0091" date="Sep 1, 2026" amount="$129.00" status="overdue" onDownload={() => undefined} />
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "status",
            label: "status",
            defaultValue: "paid",
            options: ["paid", "open", "overdue"].map((v) => ({ value: v, label: v })),
          },
          { type: "boolean", key: "download", label: "onDownload" },
        ]}
        renderPreview={(v) => (
          <InvoiceRow
            invoiceNumber="INV-2026-0001"
            date="Oct 28, 2026"
            amount="$99.00"
            status={v.status as "paid"}
            onDownload={v.download ? () => undefined : undefined}
            className="max-w-lg px-2"
          />
        )}
        buildSnippet={(v) =>
          `<InvoiceRow invoiceNumber="…" date="…" amount="…" status="${v.status}"${v.download ? " onDownload={…}" : ""} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "invoiceNumber", type: "ReactNode", description: "Primary identifier." },
            { name: "date", type: "ReactNode", description: "Issue or due date." },
            { name: "amount", type: "ReactNode", description: "Formatted total." },
            { name: "status", type: '"paid" | "open" | "overdue"', default: "paid", description: "Badge variant." },
            { name: "onDownload", type: "() => void", description: "Shows PDF action when set." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
