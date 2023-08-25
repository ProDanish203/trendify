"use server"
import Prompt from "../models/Prompt"
import User from "../models/User";
import { connectDb } from "../mongoose"
import { revalidatePath } from "next/cache";

interface CreateParams{
    prompt: string;
    tags: string;
    authorId: string;
    path: string;
}

export const createPrompt = async ({prompt, tags, authorId, path}: CreateParams) => {
    try{
        await connectDb();

        const post = await Prompt.create({
            prompt, tags, author: authorId
        });

        await User.findByIdAndUpdate(authorId, {
            $push: { prompts: post._id }
        })

        if(post){
            revalidatePath(path);
            return {success: true, message: "Prompt created successfully"}
        } 
        else{
            return {success: false, message: "An error occured while creating the prompt"}
        }
    }catch(error:any){
        throw new Error(`Failed to create prompt: ${error.message}`)
    }
}


export const getFeed = async ({pageNo = 1, limit = 20}) => {
    try{
        await connectDb();

        const skip = (pageNo - 1) * limit;

        const posts = await Prompt.find()
            .populate({
                path: "author",
                model: User,
                select: "username image _id email"
            })
            .skip(skip)
            .limit(limit)
            .sort({createdAt: "desc"});

        const totalPostsCount = await Prompt.countDocuments();

        const isNext = totalPostsCount > skip + posts.length;

        return {posts, isNext};
    }catch(error:any){
        throw new Error(`Failed to fetch feed: ${error.message}`)
    }
}


export const getUsersPosts = async (userId:string) => {
    try{
        await connectDb();
        const posts = await Prompt.find({author: userId})
            .populate({
                path: "author",
                model: User,
                select: "username image _id email"
            })
            .sort({createdAt: "desc"});

        return posts;
    }catch(error:any){
        throw new Error(`Failed to fetch feed: ${error.message}`)
    }
}