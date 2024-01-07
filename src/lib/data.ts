import { Post, User } from "./model";
import { connectToDb } from "./utils";


export const getPosts = async ()=>{
    try {
     connectToDb()
    const posts = await Post.find();
    return posts;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to Fetch Posts!");
    }

}

export const getPost =async (slug)=>{
    try {
         connectToDb()
        const post = await Post.find({slug});
        return post
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch Post!");
    }
}

export const getUser = async (id)=>{
    try {
         connectToDb()
        const user = await User.findById(id)
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch User!");
    } 
}

export const getUsers = async ()=>{
    try {
         connectToDb()
        const users = await User.find()
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to Fetch Users!");
    } 
}