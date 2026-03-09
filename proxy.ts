import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "./lib/api/serverApi";

export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
export const PRIVATE_ROUTES = ["/notes", "/profile"];

export function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    if (isPrivateRoute(pathname)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  if (accessToken) {
    if (isPublicRoute(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  try {
    const response = await (serverApi.checkSession as any)(refreshToken);
    const user = response.data;

    let res: NextResponse;

    if (isPublicRoute(pathname) && user) {
      res = NextResponse.redirect(new URL("/", request.url));
    } else {
      res = NextResponse.next();
    }

    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookiesArray.forEach((cookieStr) => {
        const parts = cookieStr.split(";");
        const [nameValue, ...rest] = parts;
        const [name, value] = nameValue.split("=");
        
        const options: any = {};
        rest.forEach(part => {
          const [key, val] = part.trim().split("=");
          const lowerKey = key.toLowerCase();
          if (lowerKey === "path") options.path = val;
          if (lowerKey === "max-age") options.maxAge = Number(val);
          if (lowerKey === "httponly") options.httpOnly = true;
          if (lowerKey === "secure") options.secure = true;
          if (lowerKey === "samelevel") options.sameSite = val;
        });

        res.cookies.set(name.trim(), value.trim(), options);
      });
    }

    return res;
  } catch (error) {
    if (isPrivateRoute(pathname)) {
      const res = NextResponse.redirect(new URL("/sign-in", request.url));
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
    return NextResponse.next();
  }
}