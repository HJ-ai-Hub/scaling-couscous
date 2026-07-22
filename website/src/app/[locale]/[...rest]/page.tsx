import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

interface CatchAllPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  notFound();
}
