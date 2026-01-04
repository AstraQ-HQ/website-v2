"use client";

import { useForm } from "@tanstack/react-form";
import Script from "next/script";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useTurnstile } from "@/hooks/use-turnstile";
import { submitContactForm } from "@/lib/actions/contact";
import {
  type ContactFormData,
  contactFormSchema,
  siteConfig,
} from "@/lib/constants";

export function ContactUsSection() {
  const { title, subtitle } = siteConfig.pages.home.contactUs;
  const turnstileRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      turnstileToken: "",
    } as ContactFormData,
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await submitContactForm(value);
      if (!result.success) {
        resetTurnstile();
      } else {
        form.reset();
        // TODO: Show success message/toast here
      }
    },
  });

  const { buildTurnstile, resetTurnstile } = useTurnstile(
    turnstileRef,
    (token) => form.setFieldValue("turnstileToken", token),
  );

  return (
    <section
      id="contact"
      className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border"
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        async
        defer
        onReady={buildTurnstile}
      />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6 md:gap-12">
          <div className="flex flex-col items-start justify-start gap-3 self-stretch">
            <div className="flex flex-col justify-center self-stretch font-mono text-3xl text-secondary-foreground leading-tight tracking-tight md:text-5xl md:leading-[56px]">
              {title}
            </div>
            <div className="self-stretch font-medium font-sans text-base text-muted-foreground leading-7 whitespace-pre-line">
              {subtitle}
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
                        <FieldError errors={field.state.meta.errors} />
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
                        <FieldError errors={field.state.meta.errors} />
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
                        <FieldError errors={field.state.meta.errors} />
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
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="turnstileToken">
                    {(field) => (
                      <Field>
                        <FieldContent>
                          <div ref={turnstileRef} />
                        </FieldContent>
                        <FieldError errors={field.state.meta.errors} />
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
    </section>
  );
}
