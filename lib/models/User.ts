import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already in use"]
    },
    image: String,
    prompts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Prompt"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
})


const User = models.User || model('User', UserSchema);

export default User;
// "next": "13.4.19",