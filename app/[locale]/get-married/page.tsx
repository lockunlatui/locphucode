import GetMarriedClient from "./GetMarriedClient";

export async function generateStaticParams() {
  return [
    { locale: "vi" },
    { locale: "en" },
    { locale: "ja" },
    { locale: "ko" },
    { locale: "zh" },
  ];
}

export default function GetMarriedPage() {
  return <GetMarriedClient />;
}
