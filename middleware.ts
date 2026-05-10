import { withAuth } from "next-auth/middleware";
import { env } from "@/config/env";

const authSecret =
  env.NEXTAUTH_SECRET ?? env.AUTH_SECRET ?? "dev-only-change-this-secret";

export default withAuth({
  secret: authSecret,
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/profile/:path*", "/orders/:path*", "/settings/:path*"],
};
