import { AppearanceSettings, ThemeToggle, ThemingGuide } from "@luminet/design-library";
import { useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";

const SECTION = "Getting started";

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

export function ThemingGuideDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Theming"
      description="CSS variable reference for customizing Luminet after importing theme.css."
    >
      <DocSection title="Token table">
        <ThemingGuide />
      </DocSection>
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <ThemingGuide className="max-w-lg" />}
        buildSnippet={() => `import { ThemingGuide } from "@luminet/design-library";\n\n<ThemingGuide />`}
      />
      <DocSection title="Setup">
        <pre className="overflow-x-auto rounded-lg border border-border bg-foreground/[0.03] p-4 text-xs">
          {`import "@luminet/design-library/theme.css";

:root {
  --color-primary: #9E4244;
}`}
        </pre>
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={[classNameProp]} />
      </DocSection>
    </DocPageLayout>
  );
}

export function AppearanceSettingsDocPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="AppearanceSettings"
      description="Settings panel combining theme mode and density preferences."
    >
      <DocSection title="Interactive panel">
        <AppearanceSettings />
      </DocSection>
      <DocSection title="Theme segment (extract)">
        <ThemeToggle theme={theme} onChange={setTheme} />
        <p className="mt-2 text-sm text-muted">Preview selection: {theme}</p>
      </DocSection>
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <AppearanceSettings className="max-w-sm" />}
        buildSnippet={() => `import { AppearanceSettings } from "@luminet/design-library";\n\n<AppearanceSettings />`}
      />
      <DocSection title="Props">
        <PropsTable rows={[classNameProp]} />
      </DocSection>
    </DocPageLayout>
  );
}
