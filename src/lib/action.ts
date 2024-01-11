"use server"

import { revalidatePath } from "next/cache";
import { Post, User } from "./model";
import { connectToDb } from "./utils"
import mongoose from "mongoose";
import { signIn, signOut } from "./auth";


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

export const registerUser = async (formData:any) =>{
    const {username,email,password,repeatPassword,img} = Object.fromEntries(formData);
    if(password !== repeatPassword){
        return{error:"Password did not match"}
    } 
    try {
        connectToDb();
        const user = await User.findOne({username});
        if(user){
            return {error:"user already exist"}
        }
        const newUser = new User ({
            username,
            email,
            password,
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