import mongoose from "mongoose";

const logOutSchema = new mongoose.Schema(
    {
        token : {type:String, required:true},
        createdAt: {type:Date, default:Date.now, expires:"1d"}
    }, {
        versionKey:false
    }
)

export const LogOutModel = mongoose.model("logOut", logOutSchema)