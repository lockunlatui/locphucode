import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["vi", "en", "zh", "ja", "ko"];
const defaultLocale = "vi";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\.[^/]*$).*)",
  ],
};
