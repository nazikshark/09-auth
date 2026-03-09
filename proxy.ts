import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "./lib/api/serverApi";

export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
export const PRIVATE_ROUTES = ["/notes", "/profile"];

export const PROXY_URL = "https://ac.goit.global/text-notes";

export function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let user = null;
  try {
    const response = await serverApi.checkSession();
    user = response.data;
  } catch (error) {
    user = null;
  }

  if (isPrivateRoute(pathname) && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute(pathname) && user) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  return NextResponse.next();
}