import { ToggleSwitch, toggleSwitchColors, type ToggleSwitchColor } from "@luminet/design-library";
import { useMemo } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { StateExample, buildJsxSnippet } from "../../doc/compactDocHelpers";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const COLORS = Object.keys(toggleSwitchColors) as ToggleSwitchColor[];
const PROPS: PropDefinition[] = [
  { name: "label", type: "ReactNode", description: "Label beside the switch." },
  { name: "size", type: '"sm" | "md" | "lg"', default: "md", description: "Track and thumb size." },
  { name: "color", type: "ToggleSwitchColor", default: "primary", description: "Semantic fill when on." },
  { name: "isChecked", type: "boolean", description: "Controlled on state." },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Initial on state." },
  { name: "isDisabled", type: "boolean", default: "false", description: "Disables interaction." },
  { name: "helperText", type: "ReactNode", description: "Muted helper below." },
  { name: "error", type: "boolean", description: "Error styling with errorMessage." },
  { name: "errorMessage", type: "ReactNode", description: "Shown when error is true." },
];

export function ToggleSwitchDocPage() {
  const controls = useMemo(
    () => [
      { type: "text" as const, key: "label", label: "label", defaultValue: "Email notifications" },
      {
        type: "select" as const,
        key: "size",
        label: "size",
        defaultValue: "md",
        options: ["sm", "md", "lg"].map((s) => ({ value: s, label: s })),
      },
      {
        type: "select" as const,
        key: "color",
        label: "color",
        defaultValue: "primary",
        options: COLORS.map((c) => ({ value: c, label: c })),
      },
      { type: "boolean" as const, key: "defaultChecked", label: "defaultChecked" },
      { type: "boolean" as const, key: "isDisabled", label: "isDisabled" },
      { type: "boolean" as const, key: "error", label: "error" },
      {
        type: "text" as const,
        key: "helperText",
        label: "helperText",
        defaultValue: "We send at most one email per day.",
      },
      { type: "text" as const, key: "errorMessage", label: "errorMessage", defaultValue: "Required" },
    ],
    [],
  );

  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="Toggle Switch"
      description="On/off control with semantic colors — not the deprecated two-option Switch."
    >
      <DocSection title="States">
        <div className="flex flex-wrap gap-8">
          <StateExample title="Off">
            <ToggleSwitch label="Off" />
          </StateExample>
          <StateExample title="On">
            <ToggleSwitch label="On" defaultChecked />
          </StateExample>
          <StateExample title="Disabled">
            <ToggleSwitch label="Disabled" isDisabled defaultChecked />
          </StateExample>
        </div>
      </DocSection>
      <DocSection title="Sizes">
        <div className="flex flex-wrap items-end gap-8">
          {(["sm", "md", "lg"] as const).map((s) => (
            <ToggleSwitch key={s} size={s} label={s.toUpperCase()} defaultChecked />
          ))}
        </div>
      </DocSection>
      <DocSection title="Semantic colour variants">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((color) => (
            <ToggleSwitch key={color} color={color} label={color} defaultChecked />
          ))}
        </div>
      </DocSection>
      <DocSection title="Helper and error text">
        <div className="grid max-w-md gap-6">
          <ToggleSwitch label="Marketing" helperText="Optional updates about new features." />
          <ToggleSwitch label="Terms" error errorMessage="You must accept to continue." />
        </div>
      </DocSection>
      <ComponentPlayground
        controls={controls}
        renderPreview={(v) => (
          <ToggleSwitch
            label={String(v.label)}
            size={v.size as "sm" | "md" | "lg"}
            color={v.color as ToggleSwitchColor}
            defaultChecked={Boolean(v.defaultChecked)}
            isDisabled={Boolean(v.isDisabled)}
            error={Boolean(v.error)}
            errorMessage={Boolean(v.error) ? String(v.errorMessage) : undefined}
            helperText={!v.error ? String(v.helperText) : undefined}
          />
        )}
        buildSnippet={(v) =>
          buildJsxSnippet("ToggleSwitch", v, [
            { key: "label" },
            { key: "size", omit: "md" },
            { key: "color", omit: "primary" },
            { key: "defaultChecked", omit: false },
            { key: "isDisabled", omit: false },
            { key: "error", omit: false },
          ])
        }
      />
      <DocSection title="Props">
        <PropsTable rows={PROPS} />
      </DocSection>
    </DocPageLayout>
  );
}
