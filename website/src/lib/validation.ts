import { z } from "zod";

type ValidationMessages = {
  nameRequired: string;
  companyRequired: string;
  emailInvalid: string;
  workEmailInvalid: string;
  phoneInvalid: string;
  messageMin: string;
  companySizeRequired: string;
  interestsRequired: string;
};

export function createContactSchema(messages: ValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired),
    company: z.string().trim().min(2, messages.companyRequired),
    email: z.string().trim().email(messages.emailInvalid),
    phone: z.string().trim().min(7, messages.phoneInvalid).max(20, messages.phoneInvalid),
    message: z.string().trim().min(10, messages.messageMin),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

export function createDemoSchema(messages: ValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired),
    company: z.string().trim().min(2, messages.companyRequired),
    workEmail: z.string().trim().email(messages.workEmailInvalid),
    phone: z.string().trim().min(7, messages.phoneInvalid).max(20, messages.phoneInvalid),
    companySize: z.enum(["1-19", "20-49", "50-199", "200-499", "500+"], {
      message: messages.companySizeRequired,
    }),
    interests: z.array(z.string()).min(1, messages.interestsRequired),
    message: z.string().trim().optional(),
  });
}

export type DemoFormValues = z.infer<ReturnType<typeof createDemoSchema>>;

const defaultMessages: ValidationMessages = {
  nameRequired: "Enter your full name",
  companyRequired: "Enter your company name",
  emailInvalid: "Enter a valid email address",
  workEmailInvalid: "Enter a valid work email address",
  phoneInvalid: "Enter a valid phone number",
  messageMin: "Tell us a little more (at least 10 characters)",
  companySizeRequired: "Select your company size",
  interestsRequired: "Select at least one product you're interested in",
};

// Used for server-side re-validation in API routes, where messages are never
// rendered to a user, so a fixed locale is fine.
export const contactSchema = createContactSchema(defaultMessages);
export const demoSchema = createDemoSchema(defaultMessages);
