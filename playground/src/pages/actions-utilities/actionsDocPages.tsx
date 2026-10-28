import { CopyButton, Kbd, KbdShortcut, PinToggle, SortControl, ThemeToggle } from "@luminet/design-library";
import { useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const SECTION = "Actions & utilities";

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

const sizeProp: PropDefinition = {
  name: "size",
  type: '"xs" | "sm" | "md" | "lg"',
  default: "sm",
  description: "Control sizing from the Luminet taxonomy.",
};

export function KbdDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Kbd"
      description="Keyboard key cap for shortcuts and inline hints."
    >
      <DocSection title="Inline shortcuts">
        <p className="text-sm text-foreground">
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command palette.
        </p>
      </DocSection>
      <DocSection title="Sizes">
        <div className="flex items-center gap-2">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Kbd key={s} size={s}>
              {s}
            </Kbd>
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "children", label: "label", defaultValue: "Enter" }]}
        renderPreview={(v) => <Kbd>{String(v.children)}</Kbd>}
        buildSnippet={(v) => `<Kbd>${v.children}</Kbd>`}
      />
      <DocSection title="Props">
        <PropsTable rows={[{ name: "children", type: "ReactNode", description: "Key label." }, sizeProp, classNameProp]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function KbdShortcutDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="KbdShortcut"
      description="Precomposed shortcut row with optional action label."
    >
      <DocSection title="Examples">
        <div className="flex flex-col gap-3">
          <KbdShortcut keys={["⌘", "K"]} label="Search" />
          <KbdShortcut keys={["Ctrl", "Shift", "P"]} label="Command menu" />
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Save" },
          { type: "text", key: "keys", label: "keys (comma)", defaultValue: "⌘,S" },
        ]}
        renderPreview={(v) => (
          <KbdShortcut
            label={String(v.label)}
            keys={String(v.keys)
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean)}
          />
        )}
        buildSnippet={(v) => `<KbdShortcut keys={[${String(v.keys).split(",").map((k) => `"${k.trim()}"`).join(", ")}]} label="${v.label}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "keys", type: "string[]", description: "Ordered key caps." },
            { name: "label", type: "string", description: "Trailing action name." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CopyButtonDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="CopyButton"
      description="One-click copy to clipboard with temporary success label."
    >
      <DocSection title="Interactive">
        <CopyButton value="npm install @luminet/design-library" copyLabel="Copy install command" />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "value", label: "value", defaultValue: "abc-123-token" },
          { type: "text", key: "copyLabel", label: "copyLabel", defaultValue: "Copy" },
        ]}
        renderPreview={(v) => (
          <CopyButton value={String(v.value)} copyLabel={String(v.copyLabel)} copiedLabel="Copied!" />
        )}
        buildSnippet={(v) => `<CopyButton value="${v.value}" copyLabel="${v.copyLabel}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "value", type: "string", description: "Text written to clipboard." },
            { name: "copyLabel", type: "string", default: "Copy", description: "Idle button label." },
            { name: "copiedLabel", type: "string", default: "Copied", description: "Label after success." },
            { name: "…", type: "ButtonProps", description: "Inherits Button variants and sizes." },
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PinToggleDocPage() {
  const [pinned, setPinned] = useState(false);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="PinToggle"
      description="Icon toggle for pinning records or filters."
    >
      <DocSection title="Interactive">
        <PinToggle pinned={pinned} onPinnedChange={setPinned} label={pinned ? "Unpin" : "Pin item"} />
        <p className="mt-2 text-sm text-muted">{pinned ? "Pinned" : "Not pinned"}</p>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "pinned", label: "pinned" }]}
        renderPreview={(v) => <PinToggle pinned={Boolean(v.pinned)} onPinnedChange={() => undefined} />}
        buildSnippet={(v) => `<PinToggle pinned={${v.pinned ? "true" : "false"}} onPinnedChange={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "pinned", type: "boolean", description: "Current pinned state." },
            { name: "onPinnedChange", type: "(pinned: boolean) => void", description: "Toggle callback." },
            { name: "label", type: "string", default: "Pin", description: "Accessible name." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function SortControlDocPage() {
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="SortControl"
      description="Table header control that toggles ascending and descending sort."
    >
      <DocSection title="Interactive">
        <SortControl label="Created" direction={direction} onToggle={() => setDirection((d) => (d === "asc" ? "desc" : "asc"))} />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Name" },
          {
            type: "select",
            key: "direction",
            label: "direction",
            defaultValue: "asc",
            options: [
              { value: "asc", label: "asc" },
              { value: "desc", label: "desc" },
            ],
          },
        ]}
        renderPreview={(v) => (
          <SortControl label={String(v.label)} direction={v.direction as "asc"} onToggle={() => undefined} />
        )}
        buildSnippet={(v) => `<SortControl label="${v.label}" direction="${v.direction}" onToggle={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "string", description: "Column label." },
            { name: "direction", type: '"asc" | "desc"', default: "asc", description: "Current sort direction." },
            { name: "onToggle", type: "() => void", description: "Click handler to flip direction." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ThemeToggleDocPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="ThemeToggle"
      description="Segmented control for light, dark, and system appearance."
    >
      <DocSection title="Interactive">
        <ThemeToggle theme={theme} onChange={setTheme} />
        <p className="mt-3 text-sm text-muted">Selected: {theme}</p>
      </DocSection>
      <StateExample title="Static light">
        <ThemeToggle theme="light" />
      </StateExample>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "theme",
            label: "theme",
            defaultValue: "system",
            options: ["light", "dark", "system"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => <ThemeToggle theme={v.theme as "light"} />}
        buildSnippet={(v) => `<ThemeToggle theme="${v.theme}" onChange={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "theme", type: '"light" | "dark" | "system"', default: "light", description: "Active segment." },
            { name: "onChange", type: "(theme) => void", description: "Selection callback." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
