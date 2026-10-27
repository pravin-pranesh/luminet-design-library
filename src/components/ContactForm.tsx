import type { FormHTMLAttributes } from "react";
import { FormWrapper } from "./FormWrapper";
import { InputField } from "./InputField";
import { InputTextArea } from "./InputTextArea";
import { TextInput } from "./TextInput";

export type ContactFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "children"> & {
  onSubmitSuccess?: () => void;
};

export function ContactForm({ onSubmitSuccess, ...props }: ContactFormProps) {
  return (
    <FormWrapper
      layout="grid"
      title="Contact us"
      description="We typically respond within one business day."
      submitLabel="Send message"
      onSubmit={(e) => {
        props.onSubmit?.(e);
        if (!e.defaultPrevented) {
          e.preventDefault();
          onSubmitSuccess?.();
        }
      }}
      {...props}
    >
      <InputField label="Name" htmlFor="contact-name">
        <TextInput id="contact-name" name="name" placeholder="Jane Doe" required />
      </InputField>
      <InputField label="Email" htmlFor="contact-email">
        <TextInput id="contact-email" name="email" type="email" placeholder="jane@company.com" required />
      </InputField>
      <div className="sm:col-span-2">
        <InputTextArea label="Message" name="message" placeholder="How can we help?" rows={4} required />
      </div>
    </FormWrapper>
  );
}
