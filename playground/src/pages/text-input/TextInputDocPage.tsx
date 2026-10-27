import { TextInput } from "@luminet/design-library";
import { useMemo } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const sizes = ["xs", "sm", "md", "lg"] as const;
const borderVariants = ["none", "hairline", "default", "emphasis", "dashed"] as const;

const TEXT_INPUT_PROPS: PropDefinition[] = [
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg"',
    default: "sm",
    description: "Control height, padding, and font size.",
  },
  {
    name: "borderVariant",
    type: '"none" | "hairline" | "default" | "emphasis" | "dashed"',
    default: "default",
    description: "Border style; focus ring uses primary semantic token.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text when empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables editing and dims the field.",
  },
  {
    name: "aria-invalid",
    type: "boolean",
    description: "When true, applies destructive border and ring (error state).",
  },
  {
    name: "type",
    type: "string",
    default: "text",
    description: "Native input type (text, email, password, etc.).",
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
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted">{title}</span>
      {children}
    </div>
  );
}

function buildTextInputSnippet(values: Record<string, string | boolean>) {
  const lines: string[] = ["<TextInput"];
  if (values.size !== "sm") lines.push(`  size="${values.size}"`);
  if (values.borderVariant !== "default") {
    lines.push(`  borderVariant="${values.borderVariant}"`);
  }
  if (values.placeholder) lines.push(`  placeholder="${String(values.placeholder).replace(/"/g, '\\"')}"`);
  if (values.disabled) lines.push("  disabled");
  if (values.error) lines.push("  aria-invalid");
  lines.push("/>");
  return lines.join("\n");
}

export function TextInputDocPage() {
  const playgroundControls = useMemo(
    () => [
      {
        type: "text" as const,
        key: "placeholder",
        label: "placeholder",
        defaultValue: "Enter your email",
      },
      {
        type: "select" as const,
        key: "size",
        label: "Size",
        defaultValue: "sm",
        options: sizes.map((s) => ({ value: s, label: s.toUpperCase() })),
      },
      {
        type: "select" as const,
        key: "borderVariant",
        label: "borderVariant",
        defaultValue: "default",
        options: borderVariants.map((b) => ({ value: b, label: b })),
      },
      { type: "boolean" as const, key: "disabled", label: "disabled" },
      { type: "boolean" as const, key: "error", label: "aria-invalid (error)" },
    ],
    [],
  );

  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="Text Input"
      description="Single-line text field with size and border variants, focus ring, and destructive error styling."
    >
      <DocSection title="States">
        <div className="grid max-w-xl gap-6 md:grid-cols-2">
          <StateExample title="Empty">
            <TextInput placeholder="Placeholder text" />
          </StateExample>
          <StateExample title="Filled">
            <TextInput defaultValue="hello@luminet.app" />
          </StateExample>
          <StateExample title="Error">
            <TextInput aria-invalid defaultValue="not-an-email" placeholder="Email" />
          </StateExample>
          <StateExample title="Disabled">
            <TextInput disabled placeholder="Disabled" />
          </StateExample>
        </div>
      </DocSection>

      <DocSection title="Sizes">
        <div className="grid max-w-xl gap-4">
          {sizes.map((size) => (
            <StateExample key={size} title={size.toUpperCase()}>
              <TextInput size={size} placeholder={`${size} input`} />
            </StateExample>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Border variants"
        description="Shared borderVariant tokens; hover deepens border toward primary."
      >
        <div className="grid max-w-xl gap-4">
          {borderVariants.map((borderVariant) => (
            <StateExample key={borderVariant} title={borderVariant}>
              <TextInput borderVariant={borderVariant} placeholder={`${borderVariant} border`} />
            </StateExample>
          ))}
        </div>
      </DocSection>

      <DocSection
        title="Helper and error text"
        description="Pair with FormField / FieldMessage when available; error uses aria-invalid on the input."
      >
        <div className="grid max-w-xl gap-8 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Work email</label>
            <TextInput placeholder="you@company.com" />
            <p className="mt-1.5 text-xs text-muted">We will never share your email.</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Work email</label>
            <TextInput aria-invalid defaultValue="bad@" />
            <p className="mt-1.5 text-xs font-medium text-destructive">Enter a valid email address.</p>
          </div>
        </div>
      </DocSection>

      <ComponentPlayground
        controls={playgroundControls}
        renderPreview={(values) => (
          <div className="w-full max-w-xs">
            <TextInput
              size={values.size as (typeof sizes)[number]}
              borderVariant={values.borderVariant as (typeof borderVariants)[number]}
              placeholder={String(values.placeholder)}
              disabled={Boolean(values.disabled)}
              aria-invalid={Boolean(values.error) || undefined}
            />
          </div>
        )}
        buildSnippet={buildTextInputSnippet}
      />

      <DocSection title="Props">
        <PropsTable rows={TEXT_INPUT_PROPS} />
      </DocSection>
    </DocPageLayout>
  );
}
