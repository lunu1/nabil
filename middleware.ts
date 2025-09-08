import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminArea = pathname.startsWith("/admin");
  const isPostsApi = pathname.startsWith("/api/posts");

  // Protect admin pages & any non-GET writes to posts API
  const needsAuth = isAdminArea || (isPostsApi && req.method !== "GET");
  if (!needsAuth) return NextResponse.next();

  const isLoggedIn = req.cookies.get("admin")?.value === "1";
  if (!isLoggedIn) {
    if (isAdminArea) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/posts/:path*"],
};
