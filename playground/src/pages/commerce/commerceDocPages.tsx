import {
  Badge,
  BagBar,
  BulkSelectionBar,
  CartItem,
  CatalogFilters,
  CatalogGrid,
  CheckoutSummary,
  CompareBar,
  DeliveryEstimate,
  Flex,
  GiftWrap,
  InventoryBadge,
  LoyaltyPoints,
  MiniCart,
  OrderHistory,
  OrderLine,
  PaymentMethod,
  PriceDisplay,
  ProductCard,
  PromoBanner,
  QuantityStepper,
  ReturnLabel,
  ReviewStars,
  ShippingSelector,
  SubscriptionPlan,
  TaxBreakdown,
  VendorCard,
  WishlistItem,
} from "@luminet/design-library";
import { useState, type ReactNode } from "react";
import { ComponentPlayground } from "../../doc/ComponentPlayground";
import { DocPageLayout } from "../../doc/DocPageLayout";
import { DocSection } from "../../doc/DocSection";
import { PropsTable, type PropDefinition } from "../../doc/PropsTable";
import { StateExample } from "../../doc/compactDocHelpers";

const DEMO_TITLE = "Luminet Merino Tee";
const DEMO_PRICE = "$48.00";
const DEMO_COMPARE = "$62.00";

const sizeProp: PropDefinition = {
  name: "size",
  type: '"xs" | "sm" | "md" | "lg"',
  default: "md",
  description: "Control sizing from the Luminet taxonomy.",
};

const classNameProp: PropDefinition = {
  name: "className",
  type: "string",
  description: "Additional Tailwind classes.",
};

const DEMO_SHIPPING = [
  { id: "standard", title: "Standard", description: "5–7 business days", price: "$8.00", eta: "Arrives Oct 12–14" },
  { id: "express", title: "Express", description: "2–3 business days", price: "$18.00", eta: "Arrives Oct 9" },
];

const DEMO_PAYMENT = [
  { id: "card", title: "Credit card", description: "Visa, Mastercard, Amex", icon: "💳" },
  { id: "paypal", title: "PayPal", description: "Pay in one click", badge: "Popular" },
];

const DEMO_TAX_LINES = [
  { id: "sub", label: "Subtotal", amount: "$96.00" },
  { id: "ship", label: "Shipping", amount: "$8.00" },
  { id: "tax", label: "Tax", amount: "$7.68" },
];

const DEMO_ORDERS = [
  { id: "1", orderNumber: "LN-10482", date: "Oct 2, 2026", total: "$111.68", status: "delivered" as const },
  { id: "2", orderNumber: "LN-10491", date: "Oct 18, 2026", total: "$48.00", status: "shipped" as const },
  { id: "3", orderNumber: "LN-10502", date: "Oct 24, 2026", total: "$132.40", status: "processing" as const },
];

const INITIAL_FILTER_SECTIONS = [
  {
    id: "category",
    title: "Category",
    options: [
      { id: "apparel", label: "Apparel", checked: true },
      { id: "accessories", label: "Accessories" },
      { id: "home", label: "Home" },
    ],
  },
  {
    id: "size",
    title: "Size",
    options: [
      { id: "s", label: "S" },
      { id: "m", label: "M", checked: true },
      { id: "l", label: "L" },
    ],
  },
];

export function ProductCardDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="ProductCard"
      description="Catalog tile with image, pricing, optional badge, and primary add-to-bag action using Luminet primary (#9E4244)."
    >
      <DocSection title="States">
        <StateExample title="Default">
          <ProductCard title={DEMO_TITLE} price={DEMO_PRICE} className="max-w-xs" />
        </StateExample>
        <div className="mt-6">
          <StateExample title="Sale badge">
            <ProductCard
              title={DEMO_TITLE}
              price={DEMO_PRICE}
              compareAtPrice={DEMO_COMPARE}
              badge="Sale"
              className="max-w-xs"
            />
          </StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "title", label: "title", defaultValue: DEMO_TITLE },
          { type: "text", key: "price", label: "price", defaultValue: DEMO_PRICE },
          { type: "text", key: "badge", label: "badge", defaultValue: "New" },
          { type: "boolean", key: "compareAt", label: "compareAtPrice" },
        ]}
        renderPreview={(v) => (
          <ProductCard
            title={String(v.title)}
            price={String(v.price)}
            badge={String(v.badge) || undefined}
            compareAtPrice={v.compareAt ? DEMO_COMPARE : undefined}
            className="max-w-xs"
          />
        )}
        buildSnippet={(v) =>
          `<ProductCard title="${v.title}" price="${v.price}"${v.badge ? ` badge="${v.badge}"` : ""}${v.compareAt ? ` compareAtPrice="${DEMO_COMPARE}"` : ""} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "string", description: "Product name." },
            { name: "price", type: "string", description: "Current price display." },
            { name: "compareAtPrice", type: "string", description: "Strikethrough reference price." },
            { name: "badge", type: "string", description: "Promotional badge over the image." },
            { name: "imageUrl", type: "string", description: "Product image URL." },
            { name: "onAddToCart", type: "() => void", description: "Add to bag handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CartItemDocPage() {
  const [qty, setQty] = useState(2);
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="CartItem"
      description="Bag row with thumbnail, inline quantity controls, line price, and remove action."
    >
      <DocSection title="Interactive">
        <CartItem
          title={DEMO_TITLE}
          variantLabel="Size M · Heather"
          price={DEMO_PRICE}
          quantity={qty}
          onQuantityChange={setQty}
          onRemove={() => setQty(1)}
          className="max-w-lg"
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "title", label: "title", defaultValue: DEMO_TITLE },
          { type: "text", key: "variantLabel", label: "variantLabel", defaultValue: "Size M" },
        ]}
        renderPreview={(v) => (
          <CartItem title={String(v.title)} variantLabel={String(v.variantLabel)} price={DEMO_PRICE} quantity={1} className="max-w-lg" />
        )}
        buildSnippet={(v) =>
          `<CartItem title="${v.title}" variantLabel="${v.variantLabel}" price="${DEMO_PRICE}" quantity={1} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "string", description: "Line item title." },
            { name: "variantLabel", type: "string", description: "SKU or variant summary." },
            { name: "price", type: "string", description: "Line price." },
            { name: "quantity", type: "number", description: "Current quantity." },
            { name: "onQuantityChange", type: "(n: number) => void", description: "Quantity stepper callback." },
            { name: "onRemove", type: "() => void", description: "Remove line handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function BagBarDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="BagBar"
      description="Sticky footer bar summarizing bag count and subtotal with checkout actions."
    >
      <DocSection title="States">
        <StateExample title="Multiple items">
          <BagBar itemCount={3} subtotal="$144.00" onViewBag={() => undefined} onCheckout={() => undefined} />
        </StateExample>
        <div className="mt-6">
          <StateExample title="Single item">
            <BagBar itemCount={1} subtotal={DEMO_PRICE} onCheckout={() => undefined} />
          </StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "itemCount", label: "itemCount", defaultValue: "2" },
          { type: "text", key: "subtotal", label: "subtotal", defaultValue: "$96.00" },
        ]}
        renderPreview={(v) => (
          <BagBar itemCount={Number(v.itemCount)} subtotal={String(v.subtotal)} onCheckout={() => undefined} />
        )}
        buildSnippet={(v) => `<BagBar itemCount={${v.itemCount}} subtotal="${v.subtotal}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "itemCount", type: "number", description: "Number of items in the bag." },
            { name: "subtotal", type: "string", description: "Formatted subtotal." },
            { name: "onViewBag", type: "() => void", description: "Secondary view bag action." },
            { name: "onCheckout", type: "() => void", description: "Primary checkout action." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function BulkSelectionBarDocPage() {
  const [selected, setSelected] = useState(4);
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="BulkSelectionBar"
      description="Primary-tinted selection bar for catalog bulk actions; hidden when nothing is selected."
    >
      <DocSection title="States">
        <StateExample title="Active selection">
          <BulkSelectionBar
            selectedCount={selected}
            totalCount={12}
            onClear={() => setSelected(0)}
            onAction={() => undefined}
            actionLabel="Add to bag"
          />
        </StateExample>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "selectedCount", label: "selectedCount", defaultValue: "3" },
          { type: "text", key: "actionLabel", label: "actionLabel", defaultValue: "Add to bag" },
        ]}
        renderPreview={(v) => (
          <BulkSelectionBar
            selectedCount={Number(v.selectedCount)}
            totalCount={10}
            actionLabel={String(v.actionLabel)}
            onClear={() => undefined}
            onAction={() => undefined}
          />
        )}
        buildSnippet={(v) =>
          `<BulkSelectionBar selectedCount={${v.selectedCount}} actionLabel="${v.actionLabel}" />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "selectedCount", type: "number", description: "Selected item count; bar hidden when 0." },
            { name: "totalCount", type: "number", description: "Optional total for “n of m” copy." },
            { name: "actionLabel", type: "string", default: "Add to bag", description: "Primary action label." },
            { name: "onClear", type: "() => void", description: "Clear selection." },
            { name: "onAction", type: "() => void", description: "Bulk action handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CheckoutSummaryDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="CheckoutSummary"
      description="Order summary sidebar with tax breakdown and full-width place-order button."
    >
      <DocSection title="Default">
        <CheckoutSummary
          subtotal="$96.00"
          shipping="$8.00"
          tax="$7.68"
          total="$111.68"
          className="max-w-sm"
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "checkoutLabel", label: "checkoutLabel", defaultValue: "Place order" },
          { type: "text", key: "total", label: "total", defaultValue: "$111.68" },
        ]}
        renderPreview={(v) => (
          <CheckoutSummary
            lines={DEMO_TAX_LINES}
            total={String(v.total)}
            checkoutLabel={String(v.checkoutLabel)}
            className="max-w-sm"
          />
        )}
        buildSnippet={(v) => `<CheckoutSummary total="${v.total}" checkoutLabel="${v.checkoutLabel}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "ReactNode", default: "Order summary", description: "Summary heading." },
            { name: "lines", type: "TaxLine[]", description: "Custom line items; overrides subtotal/shipping/tax." },
            { name: "subtotal", type: "ReactNode", description: "Subtotal when lines omitted." },
            { name: "shipping", type: "ReactNode", description: "Shipping line." },
            { name: "tax", type: "ReactNode", description: "Tax line." },
            { name: "total", type: "ReactNode", description: "Order total." },
            { name: "checkoutLabel", type: "string", default: "Place order", description: "CTA label." },
            { name: "onCheckout", type: "() => void", description: "Place order handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function OrderLineDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="OrderLine"
      description="Label/value row for receipts and summaries with optional emphasis."
    >
      <DocSection title="Variants">
        <div className="max-w-sm rounded-lg border border-border bg-card p-4">
          <OrderLine label="Subtotal" value="$96.00" muted />
          <OrderLine label="Shipping" value="$8.00" muted />
          <OrderLine label="Total" value="$111.68" emphasize />
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "label", label: "label", defaultValue: "Subtotal" },
          { type: "text", key: "value", label: "value", defaultValue: "$96.00" },
          { type: "boolean", key: "emphasize", label: "emphasize" },
          { type: "boolean", key: "muted", label: "muted", defaultValue: true },
        ]}
        renderPreview={(v) => (
          <OrderLine
            label={String(v.label)}
            value={String(v.value)}
            emphasize={Boolean(v.emphasize)}
            muted={Boolean(v.muted)}
            className="max-w-sm"
          />
        )}
        buildSnippet={(v) =>
          `<OrderLine label="${v.label}" value="${v.value}"${v.emphasize ? " emphasize" : ""}${v.muted ? " muted" : ""} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", description: "Left column label." },
            { name: "value", type: "ReactNode", description: "Right column value; strings use PriceDisplay." },
            { name: "muted", type: "boolean", description: "Muted label styling." },
            { name: "emphasize", type: "boolean", description: "Emphasized value typography." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PriceDisplayDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="PriceDisplay"
      description="Tabular price with optional compare-at and currency prefix."
    >
      <DocSection title="Sizes">
        <Flex gap="4" wrap align="end">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <PriceDisplay key={s} size={s} price={DEMO_PRICE} compareAt={DEMO_COMPARE} />
          ))}
        </Flex>
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
          { type: "boolean", key: "compareAt", label: "compareAt" },
        ]}
        renderPreview={(v) => (
          <PriceDisplay
            size={v.size as "md"}
            price={DEMO_PRICE}
            compareAt={v.compareAt ? DEMO_COMPARE : undefined}
          />
        )}
        buildSnippet={(v) =>
          `<PriceDisplay size="${v.size}" price="${DEMO_PRICE}"${v.compareAt ? ` compareAt="${DEMO_COMPARE}"` : ""} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "price", type: "ReactNode", description: "Current price." },
            { name: "compareAt", type: "ReactNode", description: "Strikethrough reference price." },
            { name: "currency", type: "ReactNode", description: "Optional currency prefix." },
            sizeProp,
            { name: "align", type: '"start" | "end"', default: "start", description: "Flex alignment." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function QuantityStepperDocPage() {
  const [value, setValue] = useState(2);
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="QuantityStepper"
      description="Accessible increment/decrement control with min/max bounds."
    >
      <DocSection title="Sizes">
        <Flex gap="3" wrap align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <QuantityStepper key={s} size={s} value={2} onChange={() => undefined} />
          ))}
        </Flex>
      </DocSection>
      <DocSection title="Interactive">
        <QuantityStepper value={value} onChange={setValue} min={1} max={10} />
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
          { type: "boolean", key: "disabled", label: "disabled" },
        ]}
        renderPreview={(v) => (
          <QuantityStepper size={v.size as "md"} value={3} disabled={Boolean(v.disabled)} onChange={() => undefined} />
        )}
        buildSnippet={(v) => `<QuantityStepper size="${v.size}" value={3}${v.disabled ? " disabled" : ""} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "value", type: "number", description: "Current quantity." },
            { name: "onChange", type: "(value: number) => void", description: "Change handler." },
            { name: "min", type: "number", default: "1", description: "Minimum value." },
            { name: "max", type: "number", default: "99", description: "Maximum value." },
            { name: "disabled", type: "boolean", description: "Disables buttons." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PromoBannerDocPage() {
  const [visible, setVisible] = useState(true);
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="PromoBanner"
      description="Inline promotion region with primary, neutral, and success variants."
    >
      <DocSection title="Variants">
        {(["primary", "neutral", "success"] as const).map((variant) => (
          <StateExample key={variant} title={variant}>
            <PromoBanner
              variant={variant}
              title="Free shipping over $75"
              description="Use code LUMINET at checkout."
              actionLabel="Shop now"
              onAction={() => undefined}
              className="mb-4 max-w-2xl"
            />
          </StateExample>
        ))}
      </DocSection>
      {visible ? (
        <DocSection title="Dismissible">
          <PromoBanner
            title="Member preview"
            description="Early access to the winter collection."
            onDismiss={() => setVisible(false)}
            className="max-w-2xl"
          />
        </DocSection>
      ) : null}
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "variant",
            label: "variant",
            defaultValue: "primary",
            options: ["primary", "neutral", "success"].map((v) => ({ value: v, label: v })),
          },
          { type: "text", key: "title", label: "title", defaultValue: "Free shipping over $75" },
        ]}
        renderPreview={(v) => (
          <PromoBanner variant={v.variant as "primary"} title={String(v.title)} className="max-w-2xl" />
        )}
        buildSnippet={(v) => `<PromoBanner variant="${v.variant}" title="${v.title}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "ReactNode", description: "Promo headline." },
            { name: "description", type: "ReactNode", description: "Supporting copy." },
            { name: "actionLabel", type: "string", description: "CTA label when onAction provided." },
            { name: "onAction", type: "() => void", description: "Primary action." },
            { name: "onDismiss", type: "() => void", description: "Shows dismiss control." },
            { name: "variant", type: '"primary" | "neutral" | "success"', default: "primary", description: "Visual tone." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ShippingSelectorDocPage() {
  const [method, setMethod] = useState("standard");
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="ShippingSelector"
      description="Choice cards for shipping methods with price and ETA."
    >
      <DocSection title="Interactive">
        <ShippingSelector options={DEMO_SHIPPING} value={method} onChange={setMethod} className="max-w-md" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "label", label: "label", defaultValue: "Shipping method" }]}
        renderPreview={(v) => (
          <ShippingSelector options={DEMO_SHIPPING} value="standard" label={String(v.label)} className="max-w-md" />
        )}
        buildSnippet={(v) => `<ShippingSelector label="${v.label}" options={…} value="standard" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "options", type: "ShippingOption[]", description: "Selectable shipping methods." },
            { name: "value", type: "string", description: "Selected option id." },
            { name: "onChange", type: "(id: string) => void", description: "Selection handler." },
            { name: "label", type: "string", default: "Shipping method", description: "Group label." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function PaymentMethodDocPage() {
  const [method, setMethod] = useState("card");
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="PaymentMethod"
      description="Payment method choice group with optional icons and badges."
    >
      <DocSection title="Interactive">
        <PaymentMethod options={DEMO_PAYMENT} value={method} onChange={setMethod} className="max-w-md" />
      </DocSection>
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <PaymentMethod options={DEMO_PAYMENT} value="card" className="max-w-md" />}
        buildSnippet={() => `<PaymentMethod options={…} value="card" onChange={setMethod} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "options", type: "PaymentMethodOption[]", description: "Payment choices." },
            { name: "value", type: "string", description: "Selected option id." },
            { name: "onChange", type: "(id: string) => void", description: "Selection handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function WishlistItemDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="WishlistItem"
      description="Saved item row with stock state and move-to-bag action."
    >
      <DocSection title="States">
        <StateExample title="In stock">
          <WishlistItem
            title={DEMO_TITLE}
            price={DEMO_PRICE}
            compareAt={DEMO_COMPARE}
            inStock
            onMoveToBag={() => undefined}
            onRemove={() => undefined}
            className="max-w-lg"
          />
        </StateExample>
        <div className="mt-6">
          <StateExample title="Out of stock">
            <WishlistItem title={DEMO_TITLE} price={DEMO_PRICE} inStock={false} className="max-w-lg" />
          </StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "boolean", key: "inStock", label: "inStock", defaultValue: true }]}
        renderPreview={(v) => (
          <WishlistItem title={DEMO_TITLE} price={DEMO_PRICE} inStock={Boolean(v.inStock)} className="max-w-lg" />
        )}
        buildSnippet={(v) => `<WishlistItem title="${DEMO_TITLE}" price="${DEMO_PRICE}" inStock={${v.inStock}} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "title", type: "string", description: "Product name." },
            { name: "price", type: "string", description: "Current price." },
            { name: "compareAt", type: "string", description: "Compare-at price." },
            { name: "inStock", type: "boolean", default: "true", description: "Stock availability." },
            { name: "onMoveToBag", type: "() => void", description: "Move to bag handler." },
            { name: "onRemove", type: "() => void", description: "Remove from wishlist." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CatalogGridDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="CatalogGrid"
      description="Responsive product grid wrapper with 2–4 column presets."
    >
      <DocSection title="Columns">
        {([2, 3, 4] as const).map((columns) => (
          <StateExample key={columns} title={`${columns} columns`}>
            <CatalogGrid columns={columns}>
              {Array.from({ length: columns }, (_, i) => (
                <ProductCard key={i} title={`Item ${i + 1}`} price={DEMO_PRICE} />
              ))}
            </CatalogGrid>
          </StateExample>
        ))}
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
          <CatalogGrid columns={Number(v.columns) as 3}>
            <ProductCard title="Alpha" price={DEMO_PRICE} />
            <ProductCard title="Beta" price="$36.00" />
          </CatalogGrid>
        )}
        buildSnippet={(v) => `<CatalogGrid columns={${v.columns}}>…</CatalogGrid>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "columns", type: "2 | 3 | 4", default: "3", description: "Grid column count." },
            { name: "children", type: "ReactNode", description: "Product cards or tiles." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CatalogFiltersDocPage() {
  const [sections, setSections] = useState(INITIAL_FILTER_SECTIONS);
  const [sort, setSort] = useState("featured");

  const toggle = (sectionId: string, optionId: string) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              options: sec.options.map((opt) =>
                opt.id === optionId ? { ...opt, checked: !opt.checked } : opt,
              ),
            }
          : sec,
      ),
    );
  };

  const activeCount = sections.reduce((n, s) => n + s.options.filter((o) => o.checked).length, 0);

  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="CatalogFilters"
      description="Filter sidebar with mobile sort chips for catalog browsing."
    >
      <DocSection title="Interactive">
        <CatalogFilters
          sections={sections}
          sortOptions={[
            { id: "featured", label: "Featured" },
            { id: "price-asc", label: "Price ↑" },
            { id: "price-desc", label: "Price ↓" },
          ]}
          sortValue={sort}
          onSortChange={setSort}
          onToggle={toggle}
          onClear={() =>
            setSections((prev) =>
              prev.map((s) => ({ ...s, options: s.options.map((o) => ({ ...o, checked: false })) })),
            )
          }
          activeCount={activeCount}
        />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "activeCount", label: "activeCount", defaultValue: "2" }]}
        renderPreview={(v) => (
          <CatalogFilters sections={INITIAL_FILTER_SECTIONS} activeCount={Number(v.activeCount)} />
        )}
        buildSnippet={(v) => `<CatalogFilters sections={…} activeCount={${v.activeCount}} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "sections", type: "FilterSidebarSection[]", description: "Filter groups and options." },
            { name: "sortOptions", type: "CatalogSort[]", description: "Mobile sort chip options." },
            { name: "sortValue", type: "string", description: "Active sort id." },
            { name: "onSortChange", type: "(id: string) => void", description: "Sort change handler." },
            { name: "onToggle", type: "(sectionId, optionId) => void", description: "Checkbox toggle." },
            { name: "onClear", type: "() => void", description: "Clear all filters." },
            { name: "activeCount", type: "number", description: "Active filter count badge." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function MiniCartDocPage() {
  const [qty, setQty] = useState(1);
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="MiniCart"
      description="Dropdown-style bag panel with scrollable lines and checkout footer."
    >
      <DocSection title="With items">
        <MiniCart itemCount={2} subtotal="$96.00" onCheckout={() => undefined} onViewBag={() => undefined}>
          <CartItem title={DEMO_TITLE} price={DEMO_PRICE} quantity={qty} onQuantityChange={setQty} />
          <CartItem title="Canvas Tote" price="$48.00" quantity={1} />
        </MiniCart>
      </DocSection>
      <DocSection title="Empty">
        <MiniCart itemCount={0} subtotal="$0.00" />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "itemCount", label: "itemCount", defaultValue: "1" },
          { type: "text", key: "subtotal", label: "subtotal", defaultValue: DEMO_PRICE },
        ]}
        renderPreview={(v) => (
          <MiniCart itemCount={Number(v.itemCount)} subtotal={String(v.subtotal)}>
            {Number(v.itemCount) > 0 ? (
              <CartItem title={DEMO_TITLE} price={String(v.subtotal)} quantity={1} />
            ) : null}
          </MiniCart>
        )}
        buildSnippet={(v) => `<MiniCart itemCount={${v.itemCount}} subtotal="${v.subtotal}">…</MiniCart>`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "itemCount", type: "number", description: "Badge count in header." },
            { name: "subtotal", type: "ReactNode", description: "Footer subtotal." },
            { name: "children", type: "ReactNode", description: "Cart line items." },
            { name: "emptyMessage", type: "ReactNode", default: "Your bag is empty.", description: "Empty state copy." },
            { name: "onCheckout", type: "() => void", description: "Checkout handler." },
            { name: "onViewBag", type: "() => void", description: "View full bag handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function OrderHistoryDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="OrderHistory"
      description="Past orders list with status badges and view actions."
    >
      <DocSection title="Default">
        <OrderHistory
          orders={DEMO_ORDERS.map((o) => ({ ...o, onView: () => undefined }))}
        />
      </DocSection>
      <ComponentPlayground
        controls={[]}
        renderPreview={() => <OrderHistory orders={DEMO_ORDERS.slice(0, 2)} />}
        buildSnippet={() => `<OrderHistory orders={orders} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "orders", type: "OrderHistoryEntry[]", description: "Order rows to render." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function SubscriptionPlanDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="SubscriptionPlan"
      description="Pricing card for subscriptions with highlighted recommended tier."
    >
      <DocSection title="Variants">
        <Flex gap="4" wrap>
          <SubscriptionPlan
            name="Starter"
            price="$9"
            description="For individuals."
            features={["1 store", "Basic analytics"]}
            className="min-w-[14rem] flex-1"
          />
          <SubscriptionPlan
            name="Growth"
            price="$29"
            highlighted
            badge="Popular"
            description="For growing brands."
            features={["3 stores", "Priority support", "Loyalty module"]}
            className="min-w-[14rem] flex-1"
          />
        </Flex>
      </DocSection>
      <DocSection title="Sizes">
        <Flex gap="3" wrap>
          {(["sm", "md", "lg"] as const).map((s) => (
            <SubscriptionPlan key={s} size={s} name={s} price="$19" className="min-w-[10rem]" />
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "boolean", key: "highlighted", label: "highlighted" },
          { type: "text", key: "name", label: "name", defaultValue: "Pro" },
          { type: "text", key: "price", label: "price", defaultValue: "$49" },
        ]}
        renderPreview={(v) => (
          <SubscriptionPlan
            name={String(v.name)}
            price={String(v.price)}
            highlighted={Boolean(v.highlighted)}
            features={["Unlimited SKUs"]}
            className="max-w-xs"
          />
        )}
        buildSnippet={(v) =>
          `<SubscriptionPlan name="${v.name}" price="${v.price}"${v.highlighted ? " highlighted" : ""} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "name", type: "ReactNode", description: "Plan name." },
            { name: "price", type: "ReactNode", description: "Price amount." },
            { name: "interval", type: "ReactNode", default: "/ month", description: "Billing interval suffix." },
            { name: "features", type: "ReactNode[]", description: "Feature bullet list." },
            { name: "highlighted", type: "boolean", description: "Primary ring and solid CTA." },
            { name: "badge", type: "ReactNode", description: "Optional plan badge." },
            { name: "ctaLabel", type: "string", default: "Choose plan", description: "Button label." },
            { name: "onSelect", type: "() => void", description: "Plan selection handler." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function InventoryBadgeDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="InventoryBadge"
      description="Stock status indicator with semantic colors and optional quantity."
    >
      <DocSection title="Statuses">
        <Flex gap="4" wrap>
          <InventoryBadge status="inStock" />
          <InventoryBadge status="lowStock" quantity={3} />
          <InventoryBadge status="outOfStock" />
          <InventoryBadge status="preOrder" />
        </Flex>
      </DocSection>
      <DocSection title="Sizes">
        <Flex gap="3" wrap align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <InventoryBadge key={s} size={s} status="inStock" />
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "status",
            label: "status",
            defaultValue: "inStock",
            options: ["inStock", "lowStock", "outOfStock", "preOrder"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <InventoryBadge status={v.status as "inStock"} quantity={v.status === "lowStock" ? 5 : undefined} />
        )}
        buildSnippet={(v) => `<InventoryBadge status="${v.status}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            {
              name: "status",
              type: '"inStock" | "lowStock" | "outOfStock" | "preOrder"',
              default: "inStock",
              description: "Stock semantic.",
            },
            { name: "label", type: "ReactNode", description: "Override default label." },
            { name: "quantity", type: "number", description: "Shown for low stock." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function CompareBarDocPage() {
  const [items, setItems] = useState<ReactNode[]>([
    <Badge key="a" size="sm" variant="subtle">
      Merino Tee
    </Badge>,
    <Badge key="b" size="sm" variant="subtle">
      Canvas Tote
    </Badge>,
  ]);
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="CompareBar"
      description="Sticky compare tray for selected catalog items."
    >
      <DocSection title="Default">
        <CompareBar
          items={items}
          onClear={() => setItems([])}
          onCompare={() => undefined}
        />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "maxItems", label: "maxItems", defaultValue: "4" }]}
        renderPreview={(v) => (
          <CompareBar
            maxItems={Number(v.maxItems)}
            items={[
              <Badge key="1" size="sm">
                A
              </Badge>,
              <Badge key="2" size="sm">
                B
              </Badge>,
            ]}
            onCompare={() => undefined}
          />
        )}
        buildSnippet={(v) => `<CompareBar maxItems={${v.maxItems}} items={…} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "items", type: "ReactNode[]", description: "Selected product chips." },
            { name: "maxItems", type: "number", default: "4", description: "Maximum compare slots." },
            { name: "onCompare", type: "() => void", description: "Compare action (disabled below 2 items)." },
            { name: "onClear", type: "() => void", description: "Clear selection." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ReviewStarsDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="ReviewStars"
      description="Accessible star rating with optional review count."
    >
      <DocSection title="Ratings">
        <Flex gap="4" wrap align="center">
          <ReviewStars rating={5} reviewCount={128} />
          <ReviewStars rating={4.2} reviewCount={42} />
          <ReviewStars rating={2.5} />
        </Flex>
      </DocSection>
      <DocSection title="Sizes">
        <Flex gap="3" wrap align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <ReviewStars key={s} size={s} rating={4} reviewCount={12} />
          ))}
        </Flex>
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "rating", label: "rating", defaultValue: "4" },
          { type: "text", key: "reviewCount", label: "reviewCount", defaultValue: "24" },
        ]}
        renderPreview={(v) => (
          <ReviewStars rating={Number(v.rating)} reviewCount={Number(v.reviewCount)} />
        )}
        buildSnippet={(v) => `<ReviewStars rating={${v.rating}} reviewCount={${v.reviewCount}} />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "rating", type: "number", description: "Star rating (0–max)." },
            { name: "max", type: "number", default: "5", description: "Maximum stars." },
            { name: "reviewCount", type: "number", description: "Review count suffix." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function DeliveryEstimateDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="DeliveryEstimate"
      description="Delivery window chip with optional icon and tone."
    >
      <DocSection title="Tones">
        {(["neutral", "success", "warning"] as const).map((tone) => (
          <StateExample key={tone} title={tone}>
            <DeliveryEstimate tone={tone} dateRange="Oct 12 – Oct 14" icon="📦" className="mb-3" />
          </StateExample>
        ))}
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "tone",
            label: "tone",
            defaultValue: "neutral",
            options: ["neutral", "success", "warning"].map((v) => ({ value: v, label: v })),
          },
          { type: "text", key: "dateRange", label: "dateRange", defaultValue: "Oct 12 – Oct 14" },
        ]}
        renderPreview={(v) => (
          <DeliveryEstimate tone={v.tone as "neutral"} dateRange={String(v.dateRange)} icon="📦" />
        )}
        buildSnippet={(v) => `<DeliveryEstimate tone="${v.tone}" dateRange="${v.dateRange}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "label", type: "ReactNode", default: "Estimated delivery", description: "Leading label." },
            { name: "dateRange", type: "ReactNode", description: "Delivery window text." },
            { name: "icon", type: "ReactNode", description: "Leading icon slot." },
            { name: "tone", type: '"neutral" | "success" | "warning"', default: "neutral", description: "Border/background tone." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function GiftWrapDocPage() {
  const [checked, setChecked] = useState(true);
  const [message, setMessage] = useState("Happy birthday!");
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="GiftWrap"
      description="Optional gift wrap upsell with message field when selected."
    >
      <DocSection title="Interactive">
        <GiftWrap
          checked={checked}
          onCheckedChange={setChecked}
          message={message}
          onMessageChange={setMessage}
          className="max-w-md"
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "boolean", key: "checked", label: "checked", defaultValue: true },
          { type: "text", key: "price", label: "price", defaultValue: "$4.00" },
        ]}
        renderPreview={(v) => (
          <GiftWrap
            checked={Boolean(v.checked)}
            price={String(v.price)}
            onCheckedChange={() => undefined}
            className="max-w-md"
          />
        )}
        buildSnippet={(v) => `<GiftWrap checked={${v.checked}} price="${v.price}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "checked", type: "boolean", description: "Gift wrap selected." },
            { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Toggle handler." },
            { name: "message", type: "string", description: "Gift message value." },
            { name: "onMessageChange", type: "(message: string) => void", description: "Message field handler." },
            { name: "price", type: "string", default: "$4.00", description: "Add-on price." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function LoyaltyPointsDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="LoyaltyPoints"
      description="Points balance strip with optional redeem action."
    >
      <DocSection title="Variants">
        <StateExample title="Default">
          <LoyaltyPoints balance="1,240 pts" onRedeem={() => undefined} className="max-w-md" />
        </StateExample>
        <div className="mt-6">
          <StateExample title="Highlight">
            <LoyaltyPoints balance="2,500 pts" variant="highlight" onRedeem={() => undefined} className="max-w-md" />
          </StateExample>
        </div>
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "variant",
            label: "variant",
            defaultValue: "default",
            options: ["default", "highlight"].map((v) => ({ value: v, label: v })),
          },
          { type: "text", key: "balance", label: "balance", defaultValue: "1,240 pts" },
        ]}
        renderPreview={(v) => (
          <LoyaltyPoints variant={v.variant as "default"} balance={String(v.balance)} className="max-w-md" />
        )}
        buildSnippet={(v) => `<LoyaltyPoints variant="${v.variant}" balance="${v.balance}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "balance", type: "ReactNode", description: "Points balance display." },
            { name: "label", type: "ReactNode", default: "Loyalty points", description: "Section label." },
            { name: "redeemLabel", type: "string", default: "Redeem", description: "Redeem button label." },
            { name: "onRedeem", type: "() => void", description: "Redeem handler." },
            { name: "variant", type: '"default" | "highlight"', default: "default", description: "Visual emphasis." },
            sizeProp,
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function ReturnLabelDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="ReturnLabel"
      description="Return shipping label card with print and download actions."
    >
      <DocSection title="Statuses">
        {(["ready", "printed", "expired"] as const).map((status) => (
          <StateExample key={status} title={status}>
            <ReturnLabel
              carrier="Luminet Logistics"
              trackingId="RTN-8842-ACME"
              status={status}
              onPrint={() => undefined}
              onDownload={() => undefined}
              className="mb-4 max-w-md"
            />
          </StateExample>
        ))}
      </DocSection>
      <ComponentPlayground
        controls={[
          {
            type: "select",
            key: "status",
            label: "status",
            defaultValue: "ready",
            options: ["ready", "printed", "expired"].map((v) => ({ value: v, label: v })),
          },
        ]}
        renderPreview={(v) => (
          <ReturnLabel
            carrier="Luminet Logistics"
            trackingId="RTN-8842-ACME"
            status={v.status as "ready"}
            onPrint={() => undefined}
            className="max-w-md"
          />
        )}
        buildSnippet={(v) => `<ReturnLabel status="${v.status}" carrier="…" trackingId="…" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "carrier", type: "ReactNode", description: "Carrier name." },
            { name: "trackingId", type: "ReactNode", description: "Tracking identifier." },
            { name: "status", type: '"ready" | "printed" | "expired"', default: "ready", description: "Label status." },
            { name: "onPrint", type: "() => void", description: "Print label action." },
            { name: "onDownload", type: "() => void", description: "Download PDF action." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function TaxBreakdownDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="TaxBreakdown"
      description="Bordered summary of line amounts and emphasized total."
    >
      <DocSection title="Default">
        <TaxBreakdown lines={DEMO_TAX_LINES} total="$111.68" className="max-w-sm" />
      </DocSection>
      <ComponentPlayground
        controls={[{ type: "text", key: "total", label: "total", defaultValue: "$111.68" }]}
        renderPreview={(v) => <TaxBreakdown lines={DEMO_TAX_LINES} total={String(v.total)} className="max-w-sm" />}
        buildSnippet={(v) => `<TaxBreakdown lines={…} total="${v.total}" />`}
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "lines", type: "TaxLine[]", description: "Amount rows (id, label, amount)." },
            { name: "total", type: "ReactNode", description: "Grand total." },
            { name: "totalLabel", type: "ReactNode", default: "Total", description: "Total row label." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}

export function VendorCardDocPage() {
  return (
    <DocPageLayout
      sectionLabel="Commerce"
      componentLabel="VendorCard"
      description="Marketplace seller summary with avatar, rating, and visit link."
    >
      <DocSection title="Default">
        <VendorCard
          name="Luminet Studio"
          rating={4.8}
          reviewCount={312}
          description="Small-batch apparel and accessories from Portland, OR."
          onVisit={() => undefined}
          className="max-w-lg"
        />
      </DocSection>
      <ComponentPlayground
        controls={[
          { type: "text", key: "name", label: "name", defaultValue: "Luminet Studio" },
          { type: "text", key: "rating", label: "rating", defaultValue: "4.8" },
          { type: "text", key: "reviewCount", label: "reviewCount", defaultValue: "312" },
        ]}
        renderPreview={(v) => (
          <VendorCard
            name={String(v.name)}
            rating={Number(v.rating)}
            reviewCount={Number(v.reviewCount)}
            className="max-w-lg"
          />
        )}
        buildSnippet={(v) =>
          `<VendorCard name="${v.name}" rating={${v.rating}} reviewCount={${v.reviewCount}} />`
        }
      />
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: "name", type: "ReactNode", description: "Vendor display name." },
            { name: "rating", type: "number", description: "Average star rating." },
            { name: "reviewCount", type: "number", description: "Review count for ReviewStars." },
            { name: "description", type: "ReactNode", description: "Seller bio." },
            { name: "avatarUrl", type: "string", description: "Avatar image URL." },
            { name: "onVisit", type: "() => void", description: "Visit store link handler." },
            classNameProp,
          ]}
        />
      </DocSection>
    </DocPageLayout>
  );
}
