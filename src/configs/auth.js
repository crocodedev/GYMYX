import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { token } = credentials
        console.log("CREADENTIALS", credentials)

        const response = await fetch("https://gymyx.cro.codes/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          return false
        }

        const result = await response.json()
        const user = result.data
        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  //   pages: {
  //     signIn: "/",
  //   },
}
