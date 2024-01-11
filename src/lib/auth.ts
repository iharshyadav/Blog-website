import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google";
import { connectToDb } from "./utils";
import { User } from "./model";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    google({
       clientId: process.env.GOOGLE_ID,
       clientSecret:process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks:{
    async signIn({user,account,profile}:any){
       console.log(profile)
       if(account.provider ==="github"){
        connectToDb();
        try {
          const user = await User.findOne({email:profile.email});
          if(!user){
            const newUser = new User({
              username:profile.login,
              email:profile.email,
              image:profile.avatar_url
            })
            await newUser.save()
          }
        } catch (error) {
          console.log(error)
          return false;
        }
       }
       if(account.provider ==="google"){
        connectToDb();
        try {
          const googleUser = await User.findOne({email:profile.email});
          if(!googleUser){
            const newGoogleUser = new User ({
              username: profile.name,
              email: profile.email,
              image:profile.avatar_url,
            })
            await newGoogleUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
       }
       return true;
    }
  }
});