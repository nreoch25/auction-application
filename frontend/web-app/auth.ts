import type { NextAuthOptions } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  providers: [
    DuendeIDS6Provider({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://localhost:5001",
      authorization: {
        params: {
          scope: "openid profile auctionApp",
        },
      },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.accessToken = token.accessToken as string;
        // Add expiration time to session
        if (token.exp && typeof token.exp === "number") {
          const expiresDate = new Date(token.exp * 1000).toISOString();
          session.expires = expiresDate;
        }
      }
      return session;
    },
  },
};
