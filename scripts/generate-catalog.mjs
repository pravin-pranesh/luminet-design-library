/**
 * Generates src/catalog/generated.tsx and playground/src/doc/catalog-meta.json
 * from playground/src/nav/component-registry.ts
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const registryPath = path.join(ROOT, "playground/src/nav/component-registry.ts");
const registryText = fs.readFileSync(registryPath, "utf8");

const EXISTING = new Set([
  "Button", "ButtonGroupIcon", "TextInput", "InputTextArea", "NoteTextArea", "NumberInput",
  "Search", "PinInput", "RangeSlider", "ToggleSwitch", "Checkbox", "RadioButton", "RadioButtonGroup",
  "Dropdown", "Select", "SearchSelect", "MultiSelect", "DatePicker", "Backdrop", "Modal",
  "AlertDialog", "Tooltip", "List", "ListItem", "Table", "TableHead", "TableBody", "TableRow",
  "TableHeaderCell", "TableCell", "DescriptionList", "FormWrapper", "ContactForm", "FeedbackForm",
  "FileUpload", "FileUploader", "FilePreview", "Collapse", "AppSwitcher", "FilterBar", "Pagination",
  "Avatar", "Image", "Icon", "Kbd", "CopyButton", "LazyWrapper", "ProductCard", "CartItem", "BagBar",
  "FormControl", "FormField", "FormLabel", "FormHelperText", "FormErrorMessage", "FieldMessage",
  "Alert", "AlertTitle", "AlertDescription", "AlertIcon", "ConfirmDialog",
  "Box", "Flex", "Grid", "Container", "Card", "Divider", "Heading", "EmptyState", "ErrorState", "Badge",
  "Link", "IconButton", "Breadcrumbs", "Header", "HeaderActions", "Drawer", "DrawerHeader", "DrawerBody",
  "DrawerFooter", "Accordion", "AccordionItem", "Loading", "CircularProgress", "Tabs", "TabList", "Tab",
  "TabPanel", "InputField", "cn",
]);

const ID_EXPORT = {
  overview: "GettingStartedOverview",
  theming: "ThemingGuide",
  "appearance-settings": "AppearanceSettings",
  "text-input": "TextInput",
  "note-text-area": "NoteTextArea",
  "input-text-area": "InputTextArea",
  "toggle-switch": "ToggleSwitch",
  checkbox: "Checkbox",
  "radio-button": "RadioButton",
  "radio-button-group": "RadioButtonGroup",
  select: "Select",
  "search-select": "SearchSelect",
  "multi-select": "MultiSelect",
  "number-input": "NumberInput",
  "pin-input": "PinInput",
  "range-slider": "RangeSlider",
  "date-picker": "DatePicker",
  search: "Search",
  dropdown: "Dropdown",
  "copy-button": "CopyButton",
  "copy-button-util": "CopyButton",
  "file-upload": "FileUpload",
  "file-uploader": "FileUploader",
  "list-item": "ListItem",
  button: "Button",
  "button-group-icon": "ButtonGroupIcon",
  "alert-dialog": "AlertDialog",
  "lazy-wrapper": "LazyWrapper",
  "app-switcher": "AppSwitcher",
  "filter-bar": "FilterBar",
  "product-card": "ProductCard",
  "cart-item": "CartItem",
  "bag-bar": "BagBar",
  "description-list": "DescriptionList",
  "form-wrapper": "FormWrapper",
  "contact-form": "ContactForm",
  "feedback-form": "FeedbackForm",
  "file-preview": "FilePreview",
  modal: "Modal",
  tooltip: "Tooltip",
  table: "Table",
  list: "List",
  collapse: "Collapse",
  backdrop: "Backdrop",
  pagination: "Pagination",
  image: "Image",
  icon: "Icon",
  kbd: "Kbd",
};

function idToExport(id, label) {
  if (ID_EXPORT[id]) return ID_EXPORT[id];
  const fromLabel = label.replace(/\s+/g, "");
  if (/^[A-Z][a-zA-Z0-9]*$/.test(fromLabel)) return fromLabel;
  return id
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

const leafRe = /leaf\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)"(?:,\s*"(live|planned)")?\)/g;
const leaves = [];
let m;
while ((m = leafRe.exec(registryText))) {
  leaves.push({ sectionId: m[1], id: m[2], label: m[3] });
}

const meta = leaves.map(({ sectionId, id, label }) => {
  const exportName = idToExport(id, label);
  const section = registryText.match(new RegExp(`id: "${sectionId}"[\\s\\S]*?label: "([^"]+)"`))?.[1] ?? sectionId;
  return {
    key: `${sectionId}/${id}`,
    sectionId,
    id,
    label,
    sectionLabel: section,
    exportName,
    benefit: `Ship ${label} with Luminet tokens and accessible defaults for production UI.`,
  };
});

const toGenerate = new Map();
for (const entry of meta) {
  if (EXISTING.has(entry.exportName)) continue;
  if (!toGenerate.has(entry.exportName)) {
    toGenerate.set(entry.exportName, entry);
  }
}

function templateFor(exportName, sectionId) {
  if (sectionId === "page-examples") {
    return "page";
  }
  if (sectionId === "charts") {
    return "chart";
  }
  if (exportName === "Link" || exportName.endsWith("Link")) {
    return "link";
  }
  if (exportName === "Divider") {
    return "divider";
  }
  if (exportName === "Heading") {
    return "heading";
  }
  if (exportName === "Hide") {
    return "hide";
  }
  if (exportName.includes("Button") || exportName === "IconButton" || exportName === "UpgradeButton") {
    return "button";
  }
  return "surface";
}

function emitComponent(exportName, sectionId) {
  const kind = templateFor(exportName, sectionId);
  if (kind === "page") {
    return `
export const ${exportName} = forwardRef<HTMLDivElement, LuminetCommonProps>(function ${exportName}(
  { size = "md", title = "${exportName.replace(/PageLayout$|Page$/, "")}", description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl space-y-4", className)} {...props}>
      <header className={luminetSurfaceClass(size, "border-primary/20")}>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children ?? <PlaceholderBlock label="Content region" />}</div>
    </div>
  );
});`;
  }
  if (kind === "chart") {
    return `
export const ${exportName} = forwardRef<HTMLDivElement, LuminetCommonProps>(function ${exportName}(
  { size = "md", title, className, ...props },
  ref,
) {
  const bars = [40, 65, 45, 80, 55];
  return (
    <div ref={ref} role="img" aria-label={title ? String(title) : "${exportName} preview"} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <p className="mb-3 font-medium">{title}</p> : null}
      <div className="flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: \`\${h}%\` }} />
        ))}
      </div>
    </div>
  );
});`;
  }
  if (kind === "link") {
    return `
export const ${exportName} = forwardRef<HTMLAnchorElement, LuminetCommonProps & AnchorHTMLAttributes<HTMLAnchorElement>>(function ${exportName}(
  { size = "md", title, children, className, href = "#", ...props },
  ref,
) {
  return (
    <a ref={ref} href={href} className={cn("text-primary underline-offset-4 hover:underline", size === "xs" ? "text-xs" : size === "lg" ? "text-base" : "text-sm", className)} {...props}>
      {children ?? title ?? "Link"}
    </a>
  );
});`;
  }
  if (kind === "divider") {
    return `
export const ${exportName} = forwardRef<HTMLHRElement, LuminetCommonProps>(function ${exportName}(
  { className, ...props },
  ref,
) {
  return <hr ref={ref} className={cn("border-0 border-t border-border", className)} {...props} />;
});`;
  }
  if (kind === "heading") {
    return `
export const ${exportName} = forwardRef<HTMLHeadingElement, LuminetCommonProps>(function ${exportName}(
  { size = "md", title, children, className, ...props },
  ref,
) {
  const tag = size === "lg" ? "h1" : size === "sm" ? "h3" : "h2";
  return createElement(tag, { ref, className: cn("font-semibold tracking-tight text-foreground", size === "xs" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg", className), ...props }, children ?? title ?? "Heading");
});`;
  }
  if (kind === "hide") {
    return `
export const ${exportName} = forwardRef<HTMLDivElement, LuminetCommonProps & { when?: boolean }>(function ${exportName}(
  { when = false, children, ...props },
  ref,
) {
  if (when) return null;
  return <div ref={ref} {...props}>{children}</div>;
});`;
  }
  if (kind === "button") {
    return `
export const ${exportName} = forwardRef<HTMLButtonElement, LuminetCommonProps & ButtonHTMLAttributes<HTMLButtonElement>>(function ${exportName}(
  { size = "md", title, children, className, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} disabled={disabled} className={cn("inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors duration-150 hover:bg-primary-hover disabled:opacity-50", size === "xs" ? "text-xs px-2 py-1" : size === "lg" ? "text-base px-5 py-3" : "text-sm", className)} {...props}>
      {children ?? title ?? "${exportName}"}
    </button>
  );
});`;
  }
  return `
export const ${exportName} = forwardRef<HTMLDivElement, LuminetCommonProps>(function ${exportName}(
  { size = "md", title, description, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(luminetSurfaceClass(size), className)} {...props}>
      {title ? <div className="font-medium text-foreground">{title}</div> : null}
      {description ? <p className={luminetMutedText(size)}>{description}</p> : null}
      {children ?? <PlaceholderBlock label="${exportName}" />}
    </div>
  );
});`;
}

const imports = `import {
  forwardRef,
  createElement,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "../lib/cn";
import { luminetMutedText, luminetSurfaceClass, type LuminetCommonProps } from "../lib/luminet-common";

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-foreground/[0.02] px-3 py-6 text-center text-sm text-muted">
      {label}
    </div>
  );
}
`;

const body = [...toGenerate.entries()]
  .map(([name, entry]) => emitComponent(name, entry.sectionId))
  .join("\n");

const outPath = path.join(ROOT, "src/catalog/generated.tsx");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${imports}\n${body}\n`);

const exportNames = [...new Set(meta.map((e) => e.exportName))];
const indexExtra = exportNames.filter((n) => !EXISTING.has(n));
const exportLine = indexExtra.map((n) => `export { ${n} } from "./catalog/generated";`).join("\n");

const indexPath = path.join(ROOT, "src/index.ts");
const indexText = fs.readFileSync(indexPath, "utf8");
const baseEnd = indexText.indexOf('export { cn } from "./lib/cn";');
const base =
  baseEnd >= 0
    ? indexText.slice(0, baseEnd).replace(/\nexport \{[^}]+\} from "\.\/catalog\/generated";\n/g, "")
    : indexText;
const merged = `${base.trim()}\n${exportLine}\nexport { cn } from "./lib/cn";\n`;
fs.writeFileSync(indexPath, merged);

const metaPath = path.join(ROOT, "playground/src/doc/catalog-meta.json");
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));

console.log(`Generated ${toGenerate.size} components, ${meta.length} doc entries.`);
