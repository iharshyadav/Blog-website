import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { User } from "./model";
import { authConfig } from "./auth.config";

const loginhandler = async (credentials:any) =>{
   try {
    connectToDb();
    const user = await User.findOne({username : credentials.username});
    if(!user) throw new Error("Wrong credentials!")

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if(!isPasswordCorrect) throw new Error("Password did mot match");

    return user;

   } catch (error) {
    throw new Error("Failed to login!");
   }
}



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await loginhandler(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log(profile);
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      if (account.provider === "google") {
        connectToDb();
        try {
          const googleUser = await User.findOne({ email: profile.email });
          if (!googleUser) {
            const newGoogleUser = new User({
              username: profile.name,
              email: profile.email,
              image: profile.avatar_url,
            });
            await newGoogleUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});