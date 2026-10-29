import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI);    
}

export default connectDb;   