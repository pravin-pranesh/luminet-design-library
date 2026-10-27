import { TextInput } from "@luminet/design-library";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";

const sizes = ["xs", "sm", "md", "lg"] as const;

export function TextInputDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Forms & inputs"
      componentLabel="Text Input"
      description="Single-line text field with size and border variants. Full Pixelize-style playground migration uses shared doc primitives."
    >
      <DocSection title="Sizes & borders">
        <div className="grid max-w-xl gap-6">
          {sizes.map((size) => (
            <label key={size} className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
                {size}
              </span>
              <TextInput size={size} placeholder={`${size} input`} />
            </label>
          ))}
          <TextInput borderVariant="hairline" placeholder="Hairline border" />
          <TextInput aria-invalid defaultValue="Invalid value" placeholder="Error state" />
          <TextInput disabled placeholder="Disabled" />
        </div>
      </DocSection>
    </DocPageLayout>
  );
}
