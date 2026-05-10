import { withAuth } from "next-auth/middleware";
import { resolvedAuthSecret } from "@/config/env";

export const proxy = withAuth({
  secret: resolvedAuthSecret,
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/profile/:path*", "/orders/:path*", "/settings/:path*"],
};
