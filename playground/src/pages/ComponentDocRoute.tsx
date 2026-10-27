import type { ReactElement } from "react";
import { Navigate, useParams } from "react-router-dom";
import { findNavLeaf } from "../nav/component-registry";
import { ButtonDocPage } from "./button/ButtonDocPage";
import { CheckboxDocPage } from "./checkbox/CheckboxDocPage";
import { ComingSoonPage } from "./ComingSoonPage";
import { OverviewPage } from "./OverviewPage";
import { TextInputDocPage } from "./text-input/TextInputDocPage";

const LIVE_PAGES: Record<string, () => ReactElement> = {
  "getting-started/overview": () => <OverviewPage />,
  "forms-inputs/checkbox": () => <CheckboxDocPage />,
  "forms-inputs/text-input": () => <TextInputDocPage />,
  "actions-utilities/button": () => <ButtonDocPage />,
};

export function ComponentDocRoute() {
  const { section, component } = useParams<{ section: string; component: string }>();

  if (!section || !component) {
    return <Navigate to="/" replace />;
  }

  const key = `${section}/${component}`;
  const LivePage = LIVE_PAGES[key];
  if (LivePage) {
    return <LivePage />;
  }

  const leaf = findNavLeaf(section, component);
  if (leaf?.status === "live") {
    return <ComingSoonPage sectionId={section} componentId={component} />;
  }

  return <ComingSoonPage sectionId={section} componentId={component} />;
}
