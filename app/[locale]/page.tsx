import React from "react";
import HomePageClient from "./HomeClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  return <HomePageClient locale={locale} />;
}
