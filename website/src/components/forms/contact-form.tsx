"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactFormValues } from "@/lib/validation";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-card border border-border bg-white p-10 text-center shadow-soft">
        <span className="flex size-14 items-center justify-center rounded-full bg-mint/30 text-[#0f5c50]">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="mt-5 font-brand text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
          Thanks for reaching out — someone from the GajiPay team will get back to you within one
          business day.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-card border border-border bg-white p-8 shadow-soft sm:p-10" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Nurul Ain" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name ? <FieldError message={errors.name.message} /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Kedai Kopi Kayangan Sdn Bhd" autoComplete="organization" {...register("company")} aria-invalid={!!errors.company} />
          {errors.company ? <FieldError message={errors.company.message} /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email ? <FieldError message={errors.email.message} /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+60 12-345 6789" autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone ? <FieldError message={errors.phone.message} /> : null}
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="message">How can we help?</Label>
          <Textarea id="message" placeholder="Tell us about your team and what you're looking for..." {...register("message")} aria-invalid={!!errors.message} />
          {errors.message ? <FieldError message={errors.message.message} /> : null}
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-rose-600">
          <AlertCircle className="size-4" /> Something went wrong — please try again in a moment.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-rose-600">
      <AlertCircle className="size-3.5" /> {message}
    </p>
  );
}
