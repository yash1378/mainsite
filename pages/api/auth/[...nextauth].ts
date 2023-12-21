import { truncate } from "fs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add more providers as needed
  ],
  secret: "yash",
  callbacks: {
    async session({ session, user}) {
      if (user) {
        return Promise.resolve({
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        });
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('User:', user);

      if (user && user.id) {
        // const userString = JSON.stringify(user);
        return true;// Specify the path to your desired redirect page
      }

      // Handle the case where the user or user.id is undefined
      return false;
    },

  },
  // ...other configuration options
});
