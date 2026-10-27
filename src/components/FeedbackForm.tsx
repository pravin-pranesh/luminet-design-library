import type { FormHTMLAttributes } from "react";
import { FormWrapper } from "./FormWrapper";
import { InputTextArea } from "./InputTextArea";
import { Select } from "./Select";

const FEEDBACK_TYPES = [
  { value: "bug", label: "Bug report" },
  { value: "idea", label: "Product idea" },
  { value: "praise", label: "Praise" },
];

export type FeedbackFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "children">;

export function FeedbackForm(props: FeedbackFormProps) {
  return (
    <FormWrapper
      title="Share feedback"
      description="Help us improve Luminet components."
      submitLabel="Submit feedback"
      layout="stack"
      onSubmit={(e) => {
        props.onSubmit?.(e);
        if (!e.defaultPrevented) e.preventDefault();
      }}
      {...props}
    >
      <Select label="Type" name="type" options={FEEDBACK_TYPES} defaultValue="idea" />
      <InputTextArea label="Details" name="details" placeholder="Tell us more…" rows={5} required />
    </FormWrapper>
  );
}
