import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    prompt: {
        type: String,
        required: [true, "Username is required"],
    },
    tags: {
        type: String,
        required: [true, "Email is required"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;