"use server"

import { revalidatePath } from "next/cache";
import { Post, User } from "./model";
import { connectToDb } from "./utils"
import mongoose from "mongoose";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"


export const addPost =async (formData:any)=>{

   const {title,slug,desc,userId} = Object.fromEntries(formData);
  
    try {
        connectToDb();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error('Invalid userId');
            return { error: 'Invalid userId' };
        }

        const newPost = new Post({
            title,
            slug,
            desc,
            userId,
        })

        await newPost.save();
        console.log("saved to Db")
        revalidatePath("/blog")

    } catch (error) {
        console.log(error)
        return{error:"something went wrong"}
    }
}

export const deletePost =async (formData:any)=>{
   
    const {id} = Object.fromEntries(formData);

    try {
        await Post.findByIdAndDelete(id)
        console.log("deleted from db")
        revalidatePath("/blog")
    } catch (error) {
        console.log(error)
        return{error:"something went wrong"}
    }
}

export const handleGithubSession = async()=>{
    await signIn("github")
}

export const handleGoogleSession = async()=>{
    await signIn("google");
}

export const handlelogout = async ()=>{
    "use server"
    await signOut();
    console.log("successfully Logged Out");
}

export const registerUser = async ({formData}:any) =>{
    const {username,email,password,repeatPassword,img} = Object.fromEntries(formData);
    
    if(password !== repeatPassword){
        return{error:"Password did not match"}
    } 
    try {
        connectToDb();
        const user = await User.findOne({ username });
        if(user){
            return {error:"user already exist"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = new User ({
            username,
            email,
            password:hashPassword,
            img
        })
        await newUser.save();
        console.log("saved to db");
        return { success: true };
    } catch (error) {
        console.log(error)
        // return{succes:false}
    }
}

export const loginhandler = async({formData}:any)=>{
  const {username,password} = Object.fromEntries(formData);

  try {
    await signIn("credentials",{username , password});
  } catch (error) {
    console.log(error)
    if(error.message.includes("CredentialsSignin")){
        return{error:"Invalid username or password"};
    }
    throw error;
  }
}