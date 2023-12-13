import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { token } = credentials

        const response = await fetch("https://gymyx.cro.codes/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          return null
        }

        const result = await response.json()
        const user = {
          ...result.data,
          token: token,
        }

        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ trigger, token, user, account, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session,
        }
      }
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          full_name: user.full_name,
          phone: user.phone,
          email: user.email,
          image: user.image,
        }
      }

      return token
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.full_name = token.full_name
      session.user.phone = token.phone
      session.user.email = token.email
      session.user.image = token.image

      return session
    },
  },
}
