import mongoose, {Schema, model, models} from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', //reference to the User model
    },
    prompt:{
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag:{
        type:String,
        required: [true, 'Tag is required'],
    },
    likes:{
        type: Number,
        default: 0,
    }
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;