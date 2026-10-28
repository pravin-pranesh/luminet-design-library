import {
  AudioRecorder,
  FilePreview,
  FilePreviewTrigger,
  FileUpload,
  Icon,
  Image,
  MediaGallery,
  VideoPlayer,
} from "@luminet/design-library";
import { useState } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const SECTION = "Media & files";

const DEMO_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#9E4244" width="400" height="300"/><text x="50%" y="50%" fill="white" font-size="24" text-anchor="middle" dy=".3em">Luminet</text></svg>',
  );

const GALLERY_ITEMS = [
  { id: "1", src: DEMO_IMAGE, alt: "Sample 1" },
  { id: "2", src: DEMO_IMAGE, alt: "Sample 2" },
  { id: "3", src: DEMO_IMAGE, alt: "Sample 3" },
  { id: "4", src: DEMO_IMAGE, alt: "Sample 4" },
];

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

export function FileUploadDocPage() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="FileUpload"
      description="Drag-and-drop upload zone with keyboard-accessible file picker."
    >
      <DocSection title="Interactive">
        <FileUpload
          className="max-w-md"
          helperText="PNG or JPG up to 10 MB"
          accept="image/*"
          onFilesSelected={(files) => {
            if (!files?.length) return;
            setFileNames(Array.from(files).map((f) => f.name));
          }}
        />
        {fileNames.length > 0 ? (
          <p className="mt-3 text-sm text-muted">Selected: {fileNames.join(", ")}</p>
        ) : null}
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Upload files" },
          { type: "boolean", key: "multiple", label: "multiple" },
        ]}
        renderPreview={(v) => (
          <FileUpload label={String(v.label)} multiple={Boolean(v.multiple)} className="max-w-md" />
        )}
        buildSnippet={(v) =>
          `<FileUpload label="${v.label}"${v.multiple ? " multiple" : ""} onFilesSelected={…} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "string", default: "Upload files", description: "Primary drop zone label." },
            { name: "helperText", type: "string", description: "Muted hint below label." },
            { name: "accept", type: "string", description: "Native accept filter." },
            { name: "multiple", type: "boolean", description: "Allow multi-select." },
            { name: "onFilesSelected", type: "(files: FileList | null) => void", description: "Selection callback." },
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "md", description: "Padding scale." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FilePreviewDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="FilePreview"
      description="Attachment row with optional thumbnail and remove action."
    >
      <DocSection title="With thumbnail">
        <FilePreview
          name="hero-banner.png"
          sizeLabel="240 KB"
          mimeLabel="image/png"
          thumbnailUrl={DEMO_IMAGE}
          onRemove={() => undefined}
          className="max-w-md"
        />
      </DocSection>
      <DocSection title="Fallback initials">
        <FilePreview name="report-q3.pdf" sizeLabel="1.2 MB" mimeLabel="application/pdf" className="max-w-md" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "name", label: "name", defaultValue: "document.pdf" }]}
        renderPreview={(v) => (
          <FilePreview name={String(v.name)} sizeLabel="128 KB" mimeLabel="application/pdf" className="max-w-md" />
        )}
        buildSnippet={(v) => `<FilePreview name="${v.name}" sizeLabel="128 KB" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "name", type: "string", description: "File name." },
            { name: "sizeLabel", type: "string", description: "Human-readable size." },
            { name: "mimeLabel", type: "string", description: "MIME or type label." },
            { name: "thumbnailUrl", type: "string", description: "Optional preview image." },
            { name: "onRemove", type: "() => void", description: "Shows remove control when set." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function FilePreviewTriggerDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="FilePreviewTrigger"
      description="File preview row paired with a secondary open action."
    >
      <DocSection title="Interactive">
        <FilePreviewTrigger
          name="invoice-1042.pdf"
          sizeLabel="86 KB"
          mimeLabel="PDF"
          triggerLabel="Open in viewer"
          className="max-w-md"
        />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "triggerLabel", label: "triggerLabel", defaultValue: "Open preview" }]}
        renderPreview={(v) => (
          <FilePreviewTrigger
            name="asset.zip"
            triggerLabel={String(v.triggerLabel)}
            sizeLabel="4 MB"
            className="max-w-md"
          />
        )}
        buildSnippet={(v) => `<FilePreviewTrigger name="…" triggerLabel="${v.triggerLabel}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "triggerLabel", type: "ReactNode", default: "Open preview", description: "Secondary button label." },
            ...["name", "sizeLabel", "mimeLabel", "thumbnailUrl", "onRemove"].map((n) => ({
              name: n,
              type: "string",
              description: "Forwarded to FilePreview.",
            })),
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function AudioRecorderDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="AudioRecorder"
      description="Voice note capture UI with record/stop affordances."
    >
      <DocSection title="Interactive">
        <AudioRecorder
          maxDurationLabel="Max 2:00 per note"
          onStart={() => undefined}
          onStop={() => undefined}
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "size",
            label: "size",
            defaultValue: "md",
            options: ["sm", "md", "lg"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => <AudioRecorder size={v.size as "md"} />}
        buildSnippet={(v) => `<AudioRecorder size="${v.size}" onStart={…} onStop={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "onStart", type: "() => void", description: "Fired when recording starts." },
            { name: "onStop", type: "() => void", description: "Fired when recording stops." },
            { name: "maxDurationLabel", type: "string", default: "Max 2:00", description: "Duration hint." },
            { name: "size", type: '"sm" | "md" | "lg"', default: "md", description: "Layout scale." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ImageDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Image"
      description="Responsive image with aspect ratio, fit, and radius tokens."
    >
      <DocSection title="Aspect ratios">
        <div className="grid max-w-lg gap-4 sm:grid-cols-2">
          <StateExample title="16:9">
            <Image src={DEMO_IMAGE} alt="Wide" aspectRatio="16/9" />
          </StateExample>
          <StateExample title="1:1">
            <Image src={DEMO_IMAGE} alt="Square" aspectRatio="1/1" />
          </StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "aspectRatio",
            label: "aspectRatio",
            defaultValue: "16/9",
            options: ["1/1", "4/3", "16/9", "auto"].map((v) => ({ value: v, label: v })),
          },
          {
            type: "select",
            key: "rounded",
            label: "rounded",
            defaultValue: "md",
            options: ["none", "md", "lg", "full"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <Image
            src={DEMO_IMAGE}
            alt="Preview"
            aspectRatio={v.aspectRatio as "16/9"}
            rounded={v.rounded as "md"}
            className="max-w-xs"
          />
        )}
        buildSnippet={(v) => `<Image src="…" alt="…" aspectRatio="${v.aspectRatio}" rounded="${v.rounded}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "aspectRatio", type: '"1/1" | "4/3" | "16/9" | "auto"', default: "auto", description: "Box ratio." },
            { name: "fit", type: '"cover" | "contain"', default: "cover", description: "object-fit mode." },
            { name: "rounded", type: '"none" | "md" | "lg" | "full"', default: "md", description: "Corner radius." },
            { name: "alt", type: "string", description: "Accessible description." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function IconDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="Icon"
      description="Sized SVG wrapper with optional color token."
    >
      <DocSection title="Sizes">
        <div className="flex items-end gap-4">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Icon key={s} size={s} color="primary" aria-hidden>
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" fill="currentColor" />
            </Icon>
          ))}
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "size",
            label: "size",
            defaultValue: "md",
            options: ["xs", "sm", "md", "lg"].map((v) => ({ value: v, label: v })),
          },
          {
            type: "select",
            key: "color",
            label: "color",
            defaultValue: "primary",
            options: ["primary", "muted", "foreground"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <Icon size={v.size as "md"} color={v.color as "primary"} aria-hidden>
            <circle cx="12" cy="12" r="8" fill="currentColor" />
          </Icon>
        )}
        buildSnippet={(v) => `<Icon size="${v.size}" color="${v.color}">…</Icon>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: "md", description: "Icon box scale." },
            { name: "color", type: "string", default: "current", description: "Semantic color token." },
            { name: "viewBox", type: "string", default: "0 0 24 24", description: "SVG viewBox." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function VideoPlayerDocPage() {
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="VideoPlayer"
      description="Native video element with Luminet chrome and optional poster."
    >
      <DocSection title="Interactive">
        <VideoPlayer title="Product demo" poster={DEMO_IMAGE} className="max-w-lg" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "title", label: "title", defaultValue: "Video" }]}
        renderPreview={(v) => <VideoPlayer title={String(v.title)} poster={DEMO_IMAGE} className="max-w-md" />}
        buildSnippet={(v) => `<VideoPlayer title="${v.title}" src="…" poster="…" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "src", type: "string", description: "Video source URL." },
            { name: "poster", type: "string", description: "Poster frame image." },
            { name: "title", type: "string", default: "Video", description: "Accessible name." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function MediaGalleryDocPage() {
  const [selectedId, setSelectedId] = useState(GALLERY_ITEMS[0]?.id);
  return (
    <DocPageLayout
      sectionLabel={SECTION}
      componentLabel="MediaGallery"
      description="Selectable thumbnail grid for attachments and product media."
    >
      <DocSection title="Interactive">
        <MediaGallery items={GALLERY_ITEMS} selectedId={selectedId} onSelect={setSelectedId} className="max-w-md" />
        <p className="mt-2 text-sm text-muted">Selected: {selectedId}</p>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "columns",
            label: "columns",
            defaultValue: "3",
            options: ["2", "3", "4"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <MediaGallery
            items={GALLERY_ITEMS.slice(0, 3)}
            columns={Number(v.columns) as 2 | 3 | 4}
            className="max-w-xs"
          />
        )}
        buildSnippet={(v) => `<MediaGallery items={items} columns={${v.columns}} selectedId={…} onSelect={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "items", type: "MediaGalleryItem[]", description: "Gallery entries with id and optional src." },
            { name: "columns", type: "2 | 3 | 4", default: "3", description: "Grid column count." },
            { name: "selectedId", type: "string", description: "Highlighted item id." },
            { name: "onSelect", type: "(id: string) => void", description: "Selection handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
