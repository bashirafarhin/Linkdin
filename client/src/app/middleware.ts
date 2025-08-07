// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/dashboard", "/profile", "/settings"]; // add private pages here

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const refreshToken = req.cookies.get("refreshToken");

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isProtected && !refreshToken) {
//     const loginUrl = new URL("/", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"], // can be broader
// };
