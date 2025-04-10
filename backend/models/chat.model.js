import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    message:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
},{
    versionKey : false
})

const ChatModel = mongoose.model("Chat", ChatSchema)

export default ChatModel