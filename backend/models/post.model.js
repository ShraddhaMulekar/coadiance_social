import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {type:String, required:true},
    content : {type:String, required:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    image : {type:String},
    likes : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    comments : [
        {
            user : {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
            text : {type:String, required:true},
            createdAt : {type:Date, default:Date.now}
        }
    ],
    createdAt : {type:Date, default:Date.now}
}, {
    versionKey:false
})

export const PostModel = mongoose.model("Post", postSchema)