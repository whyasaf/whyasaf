import { NextResponse, type NextRequest } from "next/server";

// Turkish keeps the unprefixed URLs. Rewriting here instead of next.config lets
// client navigations to "/" receive their RSC payload on Vercel, so the tab
// switch stays a soft navigation instead of a full page reload.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = url.pathname === "/" ? "/tr" : `/tr${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/projects", "/blog", "/blog/:slug"],
};
