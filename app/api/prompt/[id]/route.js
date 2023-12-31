import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.findById(params.id).populate("creator");
        if(!prompts) return new Response("Prompt not found", {status:404})
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 500 });
    } 
}

export const PATCH = async (req, {params}) => {
    const{ prompt, tag, likes } = await req.json();
    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found", {status:404})
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.likes= likes;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status:200})
    } catch (error) {
        return new Response("Failed to update prompt", {status:500})
    }
}

export const DELETE = async(req, {params})=>{
    try {
        await connectToDatabase();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Propmt deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt", {status:500})   
    }
}