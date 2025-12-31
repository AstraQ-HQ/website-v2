"use server";

import { render } from "@react-email/render";
import { Resend } from "resend";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { ContactSubmissionEmail } from "@/emails/contact-submission";
import { env } from "@/env";
import type { ContactFormData } from "@/lib/constants";
import { ADMIN_EMAILS, CONTACT_EMAIL } from "@/lib/constants";

const resend = new Resend(env.RESEND_API_KEY);

export async function submitContactForm(formData: ContactFormData) {
  try {
    const { name, email, company, message } = formData;

    await Promise.all([
      db.insert(contactSubmissions).values({
        name,
        email,
        company: company || null,
        message,
      }),
      resend.emails.send({
        from: CONTACT_EMAIL,
        to: ADMIN_EMAILS,
        subject: `New Contact Form Submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Message:
${message}
      `,
      }),
      (async () => {
        const emailHtml = await render(ContactSubmissionEmail({ name }));
        await resend.emails.send({
          from: CONTACT_EMAIL,
          to: email,
          subject: "We received your message",
          html: emailHtml,
        });
      })(),
    ]);

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
}
