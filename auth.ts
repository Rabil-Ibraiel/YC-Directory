import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { USER_QUERY_BY_ID } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile}) {
      const userExist = await client.fetch(USER_QUERY_BY_ID, {id: profile?.id})
      if(!userExist) {
        await writeClient.create({
          _type: "author",
          name: user?.name,
          email: profile?.email,
          image: user?.image,
          id: profile?.id,
          bio: profile?.bio,
          username: profile?.login
        })
      }
      
      return true
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const author = await client.fetch(USER_QUERY_BY_ID, {
          id: profile?.id
        })
        token.id = author._id
      }
      return token
    },
    async session({ session, token, user }) {

      Object.assign(session, {id: token.id})
      return session
    }
  }
})