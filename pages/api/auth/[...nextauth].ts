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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Redirect to another page after successful sign-in
      return Promise.resolve('/intro'); // Specify the path to your desired redirect page
    },
  },
  // ...other configuration options
});
