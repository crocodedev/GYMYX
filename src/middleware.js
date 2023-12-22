export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/account/booking/:path*",
    "/account/checkout/:path*",
    "/account/profile/:path*",
    "/account/gid/:path*",
    "/account/training/:path*",
  ],
}
