import express from "express";
import connectDb from "../database/db.js";
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import userAuth from "../middleware/userAuth.js";
import dotenv from 'dotenv';
import redisClient from "../config/redis.js";
import rateLimiter from "../middleware/rateLimiter.js";
import authRouter from "../routes/auth.js";
import rateLimiterslider from "../middleware/rateLimiterslide.js";
dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(rateLimiter);  - for using fixed window 
app.use(rateLimiterslider);
// routes ......

app.use("/auth", authRouter);

const InitializeConnection = async() =>{
      try {
            await redisClient.connect();
            console.log("connected to redis..");

            await connectDb();
            console.log("db connected successfully...")

            app.listen(process.env.PORT, ()=>{
                  console.log("server running");
            })
      } catch (error) {
            console.log(err);
            return res.status(500).send(error);
      }
}

InitializeConnection();

   

   




