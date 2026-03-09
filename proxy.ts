import { NextRequest } from "next/server";

export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
export const PRIVATE_ROUTES = ["/notes", "/profile"];

export const PROXY_URL = "https://ac.goit.global/text-notes";

export function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}