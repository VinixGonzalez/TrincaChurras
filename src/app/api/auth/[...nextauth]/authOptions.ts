import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {},
  pages: {
    // error: "/login",
    // signIn: "/login",
    signOut: "/",
    // newUser: '' // place to redirect the user at the first login
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
