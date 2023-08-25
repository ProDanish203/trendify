"use server"
import Prompt from "../models/Prompt"
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

        const create = await Prompt.create({
            prompt, tags, author: authorId
        });

        revalidatePath(path);
        
        if(create){
            return {success: true, message: "Prompt created successfully"}
        } 
        else{
            return {success: false, message: "An error occured while creating the prompt"}
        }
    }catch(error:any){
        throw new Error(`Failed to create prompt: ${error.message}`)
    }
}