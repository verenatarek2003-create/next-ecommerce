import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { z } from "zod";
import { axiosClient } from "@/core/infrastructure/http/axios-client";
import { env } from "@/config/env";
import type { AuthUserResponse } from "@/types/api";

const authSecret =
  env.NEXTAUTH_SECRET ?? env.AUTH_SECRET ?? "dev-only-change-this-secret";

const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const providers: NonNullable<NextAuthOptions["providers"]> = [
  Credentials({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(rawCredentials) {
      const parsed = credentialsSchema.safeParse(rawCredentials);
      if (!parsed.success) {
        return null;
      }

      try {
        const { data } = await axiosClient.post<AuthUserResponse>("/auth/login", {
          username: parsed.data.username,
          password: parsed.data.password,
          expiresInMins: 60,
        });

        return {
          id: String(data.id),
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          image: data.image,
          role: "user",
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
      } catch {
        return null;
      }
    },
  }),
];

if (env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (env.AUTH_FACEBOOK_ID && env.AUTH_FACEBOOK_SECRET) {
  providers.push(
    Facebook({
      clientId: env.AUTH_FACEBOOK_ID,
      clientSecret: env.AUTH_FACEBOOK_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "user";
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.refreshToken = (user as { refreshToken?: string }).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.sub ?? "");
        session.user.role = (token.role as string) ?? "user";
        session.user.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
  secret: authSecret,
};

export const auth = () => getServerSession(authOptions);
