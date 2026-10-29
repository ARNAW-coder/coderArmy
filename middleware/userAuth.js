import {User} from "../models/user.model.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });


const userAuth = async (req,res,next) =>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).send("error: token not found")
        }
        const payload = jwt.verify(token,process.env.SECRET_KEY);
        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked){
            throw new Error("Invalid token");
        }
        const {_id} = payload;
        if(!_id){
            return res.status(400).send("error: id is missing");
        }
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send("user not found")
        }
        req.user = user;
    
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }

}

export default userAuth;