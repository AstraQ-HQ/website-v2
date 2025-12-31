"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/actions/contact";
import { type ContactFormData, contactFormSchema } from "@/lib/constants";

export function ContactUsSection() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    } as ContactFormData,
    validators: {
      onChange: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: Handle response
      await submitContactForm(value);
    },
  });

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden">
      <div className="relative z-10 flex items-center justify-center gap-6 self-stretch border-border border-t border-b px-6 py-12 md:px-24 md:py-12">
        <div className="relative z-20 flex flex-col md:flex-row w-full items-center justify-center gap-6 overflow-hidden rounded-lg px-6 py-5 md:py-8">
          <div className="flex flex-col items-start justify-start gap-3 self-stretch">
            <div className="flex flex-col justify-center self-stretch font-mono text-3xl text-secondary-foreground leading-tight tracking-tight md:text-5xl md:leading-[56px]">
              Get in touch
            </div>
            <div className="self-stretch font-medium font-sans text-base text-muted-foreground leading-7">
              Have questions? We'd love to hear from you.
              <br />
              Send us a message and we'll respond as soon as possible.
            </div>
          </div>
          <div className="flex w-full max-w-[497px] flex-col items-center justify-center gap-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex w-full flex-col gap-6"
            >
              <FieldSet>
                <FieldGroup>
                  <form.Field name="name">
                    {(field) => (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                        >
                          Name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Your name"
                          className="border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                        />
                        {field.state.meta.errors.length > 0 ? (
                          <div className="text-red-500 text-sm mt-1">
                            {field.state.meta.errors.join(", ")}
                          </div>
                        ) : null}
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="email">
                    {(field) => (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                        >
                          Email
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="your.email@example.com"
                          className="border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                        />
                        {field.state.meta.errors.length > 0 ? (
                          <div className="text-red-500 text-sm mt-1">
                            {field.state.meta.errors.join(", ")}
                          </div>
                        ) : null}
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="company">
                    {(field) => (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                        >
                          Company
                          <FieldDescription className="font-normal font-sans text-muted-foreground text-xs leading-5">
                            Optional
                          </FieldDescription>
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Your company name"
                          className="border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                        />
                        {field.state.meta.errors.length > 0 ? (
                          <div className="text-red-500 text-sm mt-1">
                            {field.state.meta.errors.join(", ")}
                          </div>
                        ) : null}
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="message">
                    {(field) => (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                        >
                          Message
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Tell us about your product or questions..."
                          className="min-h-[120px] resize-none border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                        />
                        {field.state.meta.errors.length > 0 ? (
                          <div className="text-red-500 text-sm mt-1">
                            {field.state.meta.errors.join(", ")}
                          </div>
                        ) : null}
                      </Field>
                    )}
                  </form.Field>
                </FieldGroup>
              </FieldSet>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="flex items-center justify-start gap-4">
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      variant="default"
                      className="h-10 overflow-hidden px-12 py-[6px] w-full md:w-auto"
                    >
                      <div className="relative z-10 flex flex-col justify-center font-medium font-sans text-[13px] text-primary-foreground leading-5">
                        {isSubmitting ? "Sending..." : "Send message"}
                      </div>
                    </Button>
                  </div>
                )}
              </form.Subscribe>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
