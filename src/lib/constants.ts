import { z } from "zod";

export const CONTACT_EMAIL = "contact@astraqcyberdefence.com";
export const ADMIN_EMAILS = [""];

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
