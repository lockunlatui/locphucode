import Menu from "@/components/Menu";
import "../global.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LocDo.Tech - Công ty Công nghệ & Đào tạo Lập trình",
  description: "LocDo.Tech chuyên phát triển phần mềm và đào tạo lập trình",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale || "vi"}>
      <body>
        <div id="cursors">
          <div className="cursor sm:hidden"></div>
          <div className="shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <Menu locale={locale} />
        {children}
      </body>
    </html>
  );
}
