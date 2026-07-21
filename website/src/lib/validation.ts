import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  company: z.string().trim().min(2, "Enter your company name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Enter a valid phone number"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const demoSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  company: z.string().trim().min(2, "Enter your company name"),
  workEmail: z.string().trim().email("Enter a valid work email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Enter a valid phone number"),
  companySize: z.enum(["1-19", "20-49", "50-199", "200-499", "500+"], {
    message: "Select your company size",
  }),
  interests: z.array(z.string()).min(1, "Select at least one product you're interested in"),
  message: z.string().trim().optional(),
});

export type DemoFormValues = z.infer<typeof demoSchema>;
