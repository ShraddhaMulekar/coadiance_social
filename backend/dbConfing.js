import mongoose from "mongoose";

export const dbconnect = async()=>{
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("connect to Db")
}
