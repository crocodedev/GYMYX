import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { token } = credentials;

        const response = await fetch("https://gymyx.cro.codes/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return null;
        }

        const result = await response.json();
        const user = {
          ...result.data,
          token: token,
        };

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },
  pages: {
    signOut: "/account/login",
    signIn: "/account/login",
  },
  callbacks: {
    async jwt({ trigger, token, user, account, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session,
        };
      }
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          full_name: user?.full_name || null,
          phone: user?.phone || null,
          email: user?.email || null,
          image: user?.image || null,
          is_active_enter_code: user?.is_active_enter_code || null,
          enter_code: user?.enter_code || null,
          subscriptions: user?.subscriptions || null,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.full_name = token?.full_name || null;
      session.user.phone = token?.phone || null;
      session.user.email = token?.email || null;
      session.user.image = token?.image || null;
      session.user.is_active_enter_code = token?.is_active_enter_code || null;
      session.user.enter_code = token?.enter_code || null;
      session.user.subscriptions = token?.subscriptions || null;

      return session;
    },
  },
};
