import React from "react";
import HomePageClient from "./HomeClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [
    { locale: 'vi' },
    { locale: 'en' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'zh' },
  ]
}

export default async function LocalePage({
  params,
}: PageProps) {
  const { locale } = await params;
  return <HomePageClient locale={locale} />;
}
