import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
    fileName :{type:String, required:true},
    filePath :{type:String, required:true},
    uploadedBy :{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    createdAt :{type:Date, default:Date.now}
})

const UploadModel = mongoose.model("Upload", UploadSchema)

export default UploadModel