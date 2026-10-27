import { Button } from "@luminet/design-library";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";

const buttonVariants = ["solid", "outline", "ghost", "link", "destructive"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

export function ButtonDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Actions & utilities"
      componentLabel="Button"
      description="Interactive button with size and variant matrix. Full Pixelize-style doc sections will migrate to shared doc primitives."
    >
      <DocSection title="Size × variant">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-muted">Size</th>
                {buttonVariants.map((variant) => (
                  <th key={variant} className="px-3 py-2 capitalize text-muted">
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 font-mono text-xs uppercase text-muted">{size}</td>
                  {buttonVariants.map((variant) => (
                    <td key={variant} className="px-3 py-3">
                      <Button
                        size={size}
                        variant={variant}
                        borderVariant={variant === "outline" ? "default" : "none"}
                      >
                        Label
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
    </DocPageLayout>
  );
}
