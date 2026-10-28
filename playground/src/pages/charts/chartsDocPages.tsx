import { ApexAreaChart, ApexBarChart } from "@luminet/design-library";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const SECTION = "Charts";

const AREA_SERIES = [12, 18, 14, 22, 19, 28, 24];
const AREA_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BAR_SERIES = [40, 65, 45, 80, 55, 72];
const BAR_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

export function ApexAreaChartDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="ApexAreaChart"
      description="Lightweight SVG area trend chart styled with Luminet primary fill."
    >
      <DocSection title="Default">
        <ApexAreaChart title="Weekly signups" series={AREA_SERIES} labels={AREA_LABELS} className="max-w-lg" />
      </DocSection>
      <DocSection title="Compact height">
        <StateExample title="height={120}">
          <ApexAreaChart title="Compact" series={AREA_SERIES} height={120} className="max-w-md" />
        </StateExample>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "title", label: "title", defaultValue: "Trend" },
          { type: "text", key: "height", label: "height", defaultValue: "160" },
        ]}
        renderPreview={(v) => (
          <ApexAreaChart
            title={String(v.title)}
            series={AREA_SERIES}
            labels={AREA_LABELS}
            height={Number(v.height) || 160}
            className="max-w-md"
          />
        )}
        buildSnippet={(v) =>
          `<ApexAreaChart title="${v.title}" series={[…]} labels={[…]} height={${v.height}} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "string", default: "Trend", description: "Chart title and aria label." },
            { name: "series", type: "number[]", description: "Y values in order." },
            { name: "labels", type: "string[]", description: "X axis labels." },
            { name: "height", type: "number", default: "160", description: "SVG viewport height." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ApexBarChartDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="ApexBarChart"
      description="Vertical bar chart with hover states and primary bars."
    >
      <DocSection title="Default">
        <ApexBarChart title="Monthly volume" series={BAR_SERIES} labels={BAR_LABELS} className="max-w-lg" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "title", label: "title", defaultValue: "Volume" }]}
        renderPreview={(v) => (
          <ApexBarChart title={String(v.title)} series={BAR_SERIES} labels={BAR_LABELS} className="max-w-md" />
        )}
        buildSnippet={(v) => `<ApexBarChart title="${v.title}" series={[…]} labels={[…]} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "string", default: "Volume", description: "Chart title and aria label." },
            { name: "series", type: "number[]", description: "Bar heights." },
            { name: "labels", type: "string[]", description: "Category labels under each bar." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
