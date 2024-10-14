import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes } from "./api/auth/routes";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { nextUrl } = request
  const token = await getToken({ req: request });

  const isLogging = !!token 

  console.log(token)
  const isApiRoutes = nextUrl.pathname.includes(apiAuthPrefix)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
  const isProtectedRoutes = protectedRoutes.includes(nextUrl.pathname)

  if (isApiRoutes) {
      return null
  }

  if (isAuthRoutes) {
      if (isLogging) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null
  }

  if (!isLogging && isProtectedRoutes) {
      return Response.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};