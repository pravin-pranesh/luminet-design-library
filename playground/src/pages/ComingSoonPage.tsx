import { findNavLeaf, findNavSection } from "../nav/component-registry";
import { DocPageLayout } from "../doc/DocPageLayout";

type ComingSoonPageProps = {
  sectionId: string;
  componentId: string;
};

export function ComingSoonPage({ sectionId, componentId }: ComingSoonPageProps) {
  const section = findNavSection(sectionId);
  const leaf = findNavLeaf(sectionId, componentId);

  return (
    <DocPageLayout
      sectionLabel={section?.label ?? sectionId}
      componentLabel={leaf?.label ?? componentId}
      description="This component is catalogued for Pixelize parity. Documentation will appear here when the component ships."
    >
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <p className="text-lg font-medium text-foreground">Coming soon</p>
        <p className="mt-2 text-sm text-muted">
          Status: <span className="font-mono text-xs">planned</span>
        </p>
      </div>
    </DocPageLayout>
  );
}
