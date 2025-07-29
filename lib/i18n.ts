// Utility function to get messages for a specific locale
export function getMessages(locale: string) {
  try {
    // Use dynamic import instead of require for better Next.js compatibility
    const messages = require(`../public/lang/${locale}.tsx`);
    return messages.default || messages;
  } catch (error) {
    console.warn(`Failed to load locale ${locale}, falling back to Vietnamese`);
    // Fallback to Vietnamese if locale not found
    const fallback = require(`../public/lang/vi.tsx`);
    return fallback.default || fallback;
  }
}

// Translation function
export function useTranslation(locale: string) {
  const messages = getMessages(locale);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = messages;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, messages };
}

// Available locales
export const locales = ["vi", "en", "zh", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];

// Locale names for display
export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};

// Default locale
export const defaultLocale: Locale = "vi";
