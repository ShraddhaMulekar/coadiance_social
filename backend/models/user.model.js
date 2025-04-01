import mongoose, { version } from "mongoose"

const UserSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    pass : {type:String, required:true},
    name : {type:String, required:true},
    skills : [{type:String}],
    role : {type:String, enum:["user", "admin"], default:"user"},
    avatar :{type:String},
    createdAt :{type:Date, default:Date.now}
},{
    versionKey:false
})

export let UserModel = mongoose.model("User", UserSchema)