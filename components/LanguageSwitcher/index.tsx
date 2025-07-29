"use client";
import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import "./style.module.scss";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Replace the current locale in the URL with the new one
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the locale segment
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <div className="language-switcher">
      <div className="current-language">
        🌍 {localeNames[currentLocale as Locale]}
      </div>
      <div className="language-dropdown">
        {locales.map((locale) => (
          <button
            key={locale}
            className={`language-option ${
              locale === currentLocale ? "active" : ""
            }`}
            onClick={() => handleLocaleChange(locale)}
          >
            {localeNames[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
