"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createDemoSchema, type DemoFormValues } from "@/lib/validation";
import { getProducts } from "@/content/products";
import type { Locale } from "@/i18n/routing";

const companySizes: DemoFormValues["companySize"][] = ["1-19", "20-49", "50-199", "200-499", "500+"];

export function DemoForm() {
  const t = useTranslations("forms.demo");
  const tValidation = useTranslations("forms.validation");
  const locale = useLocale() as Locale;
  const products = getProducts(locale);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const demoSchema = useMemo(
    () =>
      createDemoSchema({
        nameRequired: tValidation("nameRequired"),
        companyRequired: tValidation("companyRequired"),
        emailInvalid: tValidation("emailInvalid"),
        workEmailInvalid: tValidation("workEmailInvalid"),
        phoneInvalid: tValidation("phoneInvalid"),
        messageMin: tValidation("messageMin"),
        companySizeRequired: tValidation("companySizeRequired"),
        interestsRequired: tValidation("interestsRequired"),
      }),
    [tValidation],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { interests: [] },
  });

  const onSubmit = async (values: DemoFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ interests: [] });
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
        <h3 className="mt-5 font-brand text-xl font-semibold text-ink">{t("successTitle")}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{t("successDescription")}</p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          {t("bookAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-card border border-border bg-white p-8 shadow-soft sm:p-10" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-name">{t("nameLabel")}</Label>
          <Input id="demo-name" placeholder={t("namePlaceholder")} autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name ? <FieldError message={errors.name.message} /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-company">{t("companyLabel")}</Label>
          <Input id="demo-company" placeholder={t("companyPlaceholder")} autoComplete="organization" {...register("company")} aria-invalid={!!errors.company} />
          {errors.company ? <FieldError message={errors.company.message} /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-email">{t("workEmailLabel")}</Label>
          <Input id="demo-email" type="email" placeholder={t("emailPlaceholder")} autoComplete="email" {...register("workEmail")} aria-invalid={!!errors.workEmail} />
          {errors.workEmail ? <FieldError message={errors.workEmail.message} /> : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-phone">{t("phoneLabel")}</Label>
          <Input id="demo-phone" type="tel" placeholder={t("phonePlaceholder")} autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone ? <FieldError message={errors.phone.message} /> : null}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="demo-size">{t("companySizeLabel")}</Label>
          <select
            id="demo-size"
            defaultValue=""
            className="flex h-13 w-full rounded-control border border-border-strong bg-white px-4 text-[0.95rem] text-ink transition-colors duration-200 focus-visible:border-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/25"
            {...register("companySize")}
            aria-invalid={!!errors.companySize}
          >
            <option value="" disabled>
              {t("selectEmployeeCount")}
            </option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size} {t("employeesSuffix")}
              </option>
            ))}
          </select>
          {errors.companySize ? <FieldError message={errors.companySize.message} /> : null}
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <Label>{t("interestsLabel")}</Label>
          <Controller
            control={control}
            name="interests"
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {products.map((product) => {
                  const checked = field.value?.includes(product.shortName);
                  return (
                    <label
                      key={product.slug}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-control border px-4 py-3 text-sm transition-colors",
                        checked ? "border-blue bg-blue/5 text-ink" : "border-border-strong text-ink-soft hover:border-ink/20",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border-strong text-blue-deep focus-visible:outline-2 focus-visible:outline-blue"
                        checked={checked}
                        onChange={(event) => {
                          const next = event.target.checked
                            ? [...(field.value ?? []), product.shortName]
                            : (field.value ?? []).filter((v: string) => v !== product.shortName);
                          field.onChange(next);
                        }}
                      />
                      {product.shortName}
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.interests ? <FieldError message={errors.interests.message as string} /> : null}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="demo-message">{t("messageLabel")}</Label>
          <Textarea id="demo-message" placeholder={t("messagePlaceholder")} {...register("message")} />
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-rose-600">
          <AlertCircle className="size-4" /> {t("errorGeneric")}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {isSubmitting ? t("submitLoading") : t("submitIdle")}
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
