import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types


const postSchema = mongoose.Schema(
    {
        description: { type: String, required: true },
        image: { type: String },
        // fileId: { type:String },
        // fileName: { type:String },

        // // likes:[{type:ObjectId,ref:"User"}],
        postedBy:{
            type:ObjectId,
            ref:"User",
            required: true
         }
    }, 
    { timestamps: true }
)

export default postSchema