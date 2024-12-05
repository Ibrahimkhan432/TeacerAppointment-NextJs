import connectDB from "@/lib/ConnectDb"
import { UserModal } from "@/lib/modal/UserModal";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

async function handleLogin(obj) {
  connectDB();
  const user = await UserModal.findOne({ email: obj.email });
  if (user) {
    return user;
  }
  else {
    let newUser = await UserModal(obj);
    newUser = await newUser.save();
    return newUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  })],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        let obj = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          picture: profile.picture
        }
        const user = await handleLogin(obj)
        // console.log("user",obj);

        return true; // Do different verification for other providers that don't have `email_verified`
      }
      return true;
    },
    async jwt({ token }) {
      const user = await handleLogin({ email: token.email })
      // console.log("user>",user);
      token._id = user._id;
      token._role = user.role;

      return token;
    },
    session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token._role;
      return session
    },
  },
})