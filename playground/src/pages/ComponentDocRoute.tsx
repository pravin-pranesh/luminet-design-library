import type { ReactElement } from "react";
import { Navigate, useParams } from "react-router-dom";
import { findNavLeaf } from "../nav/component-registry";
import { ButtonDocPage } from "./button/ButtonDocPage";
import { CheckboxDocPage } from "./checkbox/CheckboxDocPage";
import { ComingSoonPage } from "./ComingSoonPage";
import {
  ButtonGroupIconDocPage,
  DatePickerDocPage,
  DropdownDocPage,
  InputTextAreaDocPage,
  MultiSelectDocPage,
  NoteTextAreaDocPage,
  NumberInputDocPage,
  PinInputDocPage,
  RangeSliderDocPage,
  SearchDocPage,
  SearchSelectDocPage,
  SelectDocPage,
} from "./forms/phase1DocPages";
import { OverviewPage } from "./OverviewPage";
import { RadioButtonDocPage } from "./radio-button/RadioButtonDocPage";
import { TextInputDocPage } from "./text-input/TextInputDocPage";
import { ToggleSwitchDocPage } from "./toggle-switch/ToggleSwitchDocPage";

const LIVE_PAGES: Record<string, () => ReactElement> = {
  "getting-started/overview": () => <OverviewPage />,
  "forms-inputs/checkbox": () => <CheckboxDocPage />,
  "forms-inputs/text-input": () => <TextInputDocPage />,
  "forms-inputs/radio-button": () => <RadioButtonDocPage />,
  "forms-inputs/radio-button-group": () => <RadioButtonDocPage />,
  "forms-inputs/toggle-switch": () => <ToggleSwitchDocPage />,
  "forms-inputs/number-input": () => <NumberInputDocPage />,
  "forms-inputs/input-text-area": () => <InputTextAreaDocPage />,
  "forms-inputs/search": () => <SearchDocPage />,
  "forms-inputs/pin-input": () => <PinInputDocPage />,
  "forms-inputs/range-slider": () => <RangeSliderDocPage />,
  "forms-inputs/dropdown": () => <DropdownDocPage />,
  "forms-inputs/select": () => <SelectDocPage />,
  "forms-inputs/search-select": () => <SearchSelectDocPage />,
  "forms-inputs/multi-select": () => <MultiSelectDocPage />,
  "forms-inputs/date-picker": () => <DatePickerDocPage />,
  "forms-inputs/note-text-area": () => <NoteTextAreaDocPage />,
  "actions-utilities/button": () => <ButtonDocPage />,
  "actions-utilities/button-group-icon": () => <ButtonGroupIconDocPage />,
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
