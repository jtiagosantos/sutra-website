import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserAction } from "@/actions/get-user-action";
import { registerCustomerAction } from "@/actions/register-customer-action";
import { registerUserAction } from "@/actions/register-user-action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const getUserActionResponse = await getUserAction({ email: user.email! })!;

        if (getUserActionResponse?.data?.code === 200) return true;

        const registerCustomerActionResponse = await registerCustomerAction({
          name: profile?.given_name ?? "",
          email: user.email!,
        });

        if (registerCustomerActionResponse?.data?.code !== 202) return false;

        const registerUserActionResponse = await registerUserAction({
          email: user.email!,
          firstName: profile?.given_name ?? "",
          lastName: profile?.family_name ?? "",
          avatar: profile?.picture ?? "",
          customerId: registerCustomerActionResponse.data.customer.id,
        });

        return registerUserActionResponse?.data?.code === 202;

      } catch {
        return false;
      }
    },
  },
});
