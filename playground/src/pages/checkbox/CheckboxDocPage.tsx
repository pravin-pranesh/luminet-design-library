import {
  Checkbox,
  type CheckboxColor,
  checkboxColors,
} from "@luminet/design-library";
import { useMemo, useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const COLOR_ORDER: CheckboxColor[] = [
  "primary",
  "success",
  "warning",
  "destructive",
  "accent",
  "neutral",
];

const SEMANTIC_LABELS: Record<CheckboxColor, string> = {
  primary: "Primary",
  success: "Success",
  warning: "Warning",
  destructive: "Destructive",
  accent: "Accent",
  neutral: "Neutral",
};

const CHECKBOX_PROPS: PropDefinition[] = [
  {
    name: "label",
    type: "ReactNode",
    description: "Label text shown beside the control.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: "md",
    description: "Visual size of the checkbox box and label typography.",
  },
  {
    name: "color",
    type: '"primary" | "success" | "warning" | "destructive" | "accent" | "neutral"',
    default: "primary",
    description: "Semantic fill when checked or indeterminate; unchecked keeps a neutral border.",
  },
  {
    name: "isChecked",
    type: "boolean",
    description: "Controlled checked state. Pair with onChange.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Initial checked state when uncontrolled.",
  },
  {
    name: "isIndeterminate",
    type: "boolean",
    default: "false",
    description: "Shows a dash icon and sets the native indeterminate property.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims the field.",
  },
  {
    name: "helperText",
    type: "ReactNode",
    description: "Muted helper copy below the control.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "When true with errorMessage, shows the error treatment.",
  },
  {
    name: "errorMessage",
    type: "ReactNode",
    description: "Error message; replaces helper text while error is true.",
  },
  {
    name: "labelClampLines",
    type: "number",
    description: "Clamps the label to N lines; full label is available via title tooltip when label is a string.",
  },
  {
    name: "onChange",
    type: "ChangeEventHandler<HTMLInputElement>",
    description: "Native change handler for the underlying input.",
  },
];

function StateExample({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {children}
      <span className="text-xs text-muted">{title}</span>
    </div>
  );
}

function IndeterminateParentDemo() {
  const permissions = [
    { id: "view", label: "View records" },
    { id: "create", label: "Create records" },
    { id: "edit", label: "Edit records" },
    { id: "delete", label: "Delete records" },
    { id: "export", label: "Export to CSV" },
    { id: "settings", label: "Manage settings" },
  ] as const;

  const [checked, setChecked] = useState<Record<string, boolean>>({
    view: true,
    create: true,
    edit: false,
    delete: false,
    export: false,
    settings: false,
  });

  const values = Object.values(checked);
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean);
  const parentIndeterminate = someChecked && !allChecked;

  function toggleAll(next: boolean) {
    setChecked(Object.fromEntries(permissions.map((p) => [p.id, next])));
  }

  return (
    <div className="max-w-md space-y-3">
      <Checkbox
        label="All permissions"
        isChecked={allChecked}
        isIndeterminate={parentIndeterminate}
        onChange={(e) => toggleAll(e.target.checked)}
      />
      <div className="space-y-2 border-l-2 border-border pl-4">
        {permissions.map((perm) => (
          <Checkbox
            key={perm.id}
            label={perm.label}
            isChecked={checked[perm.id]}
            onChange={(e) =>
              setChecked((prev) => ({ ...prev, [perm.id]: e.target.checked }))
            }
          />
        ))}
      </div>
    </div>
  );
}

function buildCheckboxSnippet(values: Record<string, string | boolean>) {
  const lines: string[] = ["<Checkbox"];
  const push = (name: string, value: string) => {
    if (value) lines.push(`  ${name}=${value}`);
  };

  push("label", `"${String(values.label).replace(/"/g, '\\"')}"`);
  push("size", `"${values.size}"`);
  push("color", `"${values.color}"`);
  if (values.defaultChecked) lines.push("  defaultChecked");
  if (values.isIndeterminate) lines.push("  isIndeterminate");
  if (values.isDisabled) lines.push("  isDisabled");
  if (values.error) lines.push("  error");
  if (values.helperText) push("helperText", `"${values.helperText}"`);
  if (values.error && values.errorMessage) {
    push("errorMessage", `"${values.errorMessage}"`);
  }
  lines.push("/>");
  return lines.join("\n");
}

export function CheckboxDocPage() {
  const playgroundControls = useMemo(
    () => [
      {
        type: "text" as const,
        key: "label",
        label: "Label",
        defaultValue: "Notify me when a deal closes",
      },
      {
        type: "select" as const,
        key: "size",
        label: "Size",
        defaultValue: "md",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
      },
      {
        type: "select" as const,
        key: "color",
        label: "Semantic color",
        defaultValue: "primary",
        options: COLOR_ORDER.map((c) => ({ value: c, label: SEMANTIC_LABELS[c] })),
      },
      { type: "boolean" as const, key: "defaultChecked", label: "defaultChecked", defaultValue: true },
      { type: "boolean" as const, key: "isIndeterminate", label: "isIndeterminate" },
      { type: "boolean" as const, key: "isDisabled", label: "isDisabled" },
      { type: "boolean" as const, key: "error", label: "error" },
      {
        type: "text" as const,
        key: "helperText",
        label: "helperText",
        defaultValue: "About one message a month.",
      },
      {
        type: "text" as const,
        key: "errorMessage",
        label: "errorMessage",
        defaultValue: "This field is required",
      },
    ],
    [],
  );

  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="Checkbox"
      description="Checkbox control with size and semantic color variants, helper and error messaging, indeterminate groups, and clamped labels."
    >
      <DocSection title="States">
        <div className="flex flex-wrap items-start justify-center gap-10">
          <StateExample title="Unchecked">
            <Checkbox aria-label="Unchecked" />
          </StateExample>
          <StateExample title="Checked">
            <Checkbox defaultChecked aria-label="Checked" />
          </StateExample>
          <StateExample title="Indeterminate">
            <Checkbox isIndeterminate aria-label="Indeterminate" />
          </StateExample>
          <StateExample title="Disabled">
            <Checkbox isDisabled aria-label="Disabled" />
          </StateExample>
          <StateExample title="Disabled checked">
            <Checkbox defaultChecked isDisabled aria-label="Disabled checked" />
          </StateExample>
        </div>
      </DocSection>

      <DocSection title="Sizes">
        <div className="flex flex-wrap items-end justify-center gap-12">
          <StateExample title="Small">
            <Checkbox size="sm" defaultChecked label="Small" />
          </StateExample>
          <StateExample title="Medium">
            <Checkbox size="md" defaultChecked label="Medium" />
          </StateExample>
          <StateExample title="Large">
            <Checkbox size="lg" defaultChecked label="Large" />
          </StateExample>
        </div>
      </DocSection>

      <DocSection
        title="Semantic variants"
        description="Unchecked keeps a neutral border; checked and indeterminate use Luminet semantic tokens from theme.css."
      >
        <div className="space-y-6">
          {COLOR_ORDER.map((color) => (
            <div key={color} className="flex flex-wrap items-center gap-8">
              <span className="w-24 text-sm font-medium text-foreground">{SEMANTIC_LABELS[color]}</span>
              <Checkbox color={color} aria-label={`${color} unchecked`} />
              <Checkbox color={color} defaultChecked aria-label={`${color} checked`} />
              <Checkbox color={color} isIndeterminate aria-label={`${color} indeterminate`} />
              <span
                className="hidden size-3 rounded-sm sm:inline-block"
                style={{ backgroundColor: checkboxColors[color] }}
                title={color}
              />
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Helper and error text"
        description="Helper text is replaced by an error message while error is true."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Checkbox
            label="Email me about product updates"
            helperText="About one message a month. Unsubscribe any time."
            defaultChecked
          />
          <Checkbox
            label="I accept the terms of service"
            error
            errorMessage="You must accept the terms to continue"
          />
        </div>
      </DocSection>

      <DocSection
        title="Indeterminate parent"
        description="A parent reflecting a partially selected group — the canonical use of indeterminate."
      >
        <IndeterminateParentDemo />
      </DocSection>

      <DocSection
        title="Clamped label"
        description="Long labels clamp to one line with ellipsis; hover shows the full string via title."
      >
        <div className="max-w-sm">
          <Checkbox
            label="Send weekly digest emails including product updates, security notices, and billing reminders"
            labelClampLines={1}
            defaultChecked
          />
        </div>
      </DocSection>

      <ComponentPlayground
        controls={playgroundControls}
        renderPreview={(values) => (
          <Checkbox
            label={String(values.label)}
            size={values.size as "sm" | "md" | "lg"}
            color={values.color as CheckboxColor}
            defaultChecked={Boolean(values.defaultChecked)}
            isIndeterminate={Boolean(values.isIndeterminate)}
            isDisabled={Boolean(values.isDisabled)}
            error={Boolean(values.error)}
            errorMessage={values.error ? String(values.errorMessage) : undefined}
            helperText={!values.error && values.helperText ? String(values.helperText) : undefined}
          />
        )}
        buildSnippet={buildCheckboxSnippet}
      />

      <DocSection title="Props">
        <PropsTable rows={CHECKBOX_PROPS} />
      </DocSection>
    </DocPageLayout>
  );
}
