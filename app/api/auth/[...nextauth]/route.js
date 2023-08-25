import User from "@/lib/models/User";
import { connectDb } from "@/lib/mongoose"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"



const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
      ],
    callbacks:{
      async session({ session }){
        try{
          await connectDb();
          const sessionUser = await User.findOne({ email: session.user.email });
  
          session.user.id = sessionUser._id;
  
          return session;
  
        }catch(error){
          console.log(error);
          return;
        }
      },
      async signIn({ profile }){
        try{
          await connectDb();
  
          // check existing user
          const userExists = await User.findOne({email: profile.email})
          // create new user
          if(!userExists){
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            })
          }else{
            return userExists;
          }
          
        }catch(error){
          console.log(error.message)
          return false;
        }
      }
    },
})

export { handler as GET, handler as POST }