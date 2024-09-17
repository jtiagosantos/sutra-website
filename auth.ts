import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        //TODO: get user by email
        //TODO: save user if they dont exist yet
        return true;
      } catch {
        return false;
      }
    },
  },
});
