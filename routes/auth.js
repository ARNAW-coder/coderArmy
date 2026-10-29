import express from "express";
const authRouter = express.Router();
import userAuth from "../middleware/userAuth.js";
import validator from "validator";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";
import bcrypt from "bcrypt";

authRouter.post("/register", async (req,res)=>{
       try {
        const mandatoryField = ["name","password","email"];
        const isAllowed = mandatoryField.every((k)=>Object.keys(req.body).includes(k));
        if(!isAllowed){
            return res.status(400).send("missing credentials")
        }
           // validator.......s
        if(!validator.isEmail(req.body.email)){
                return res.status(400).send("invalid email format")
        }
        if(!validator.isStrongPassword(req.body.password)){
            return res.status(400).send("make strong password")
        }

        // jo password hai use hash kar do 
        req.body.password = await bcrypt.hash(req.body.password, 10);
 
        await User.create(req.body);
 
        return res.status(201).send("user created successfully");
       } catch (error) {
        console.log(error);
          res.status(500).send("ERROR : ",error);
       }


})

authRouter.post("/login", async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("missing credentials")
        }
        if(!validator.isEmail(req.body.email)){
                   return res.status(400).send("invalid email format")
            }
        if(!validator.isStrongPassword(req.body.password)){
                return res.status(400).send("make strong password")
            }
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).send("user not found with this email")
        } 
        
        const isAllowed = user.verifyPassword(req.body.password);
        if(!isAllowed){
            return res.status(401).send("Error : unauthorised access")
        }
        
        const token = user.getJWT();
        res.cookie("token",token);
        return res.status(200).send("login successful");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error: ",error.message);
    }
})

authRouter.patch("/update", async(req,res)=>{
       try {
        const payload = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        console.log(payload);
        if(!payload){
            return res.status(500).send("error verifying login status of user")
        }
 
     const id = payload._id;

         const {name , age} = req.body;
         if(!name && !age){
             return res.status(400).json({
                 message:"please enter credentials to update"
             })
         }
         await User.findByIdAndUpdate(id,{name,age},{runValidators:true, new:true})
         return res.status(200).json({message:"updated succeesfuly"})
       } catch (error) {
        console.log(error);
            return res.status(500).send(error.message);
       }
   })

authRouter.get("/info", userAuth, async(req,res)=>{
       try {
           return res.status(200).send(req.user);
       } catch (error) {
           return res.status(500).send(error.message);
       }
  }) 

authRouter.post("/logout", userAuth, async(req,res)=>{
      try {
        const {token} = req.cookies;
        const payload = jwt.decode(token);
        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp);
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logged out successfully...");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
})  

export default authRouter;  
