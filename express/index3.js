import express from "express";
import connectDb from "../database/db.js";
import {User} from "../models/user.model.js";

const app = express();

app.use(express.json());

app.get("/home", (req,res)=>{
    res.send("this is home");
   })

   app.post("/info", async (req,res)=>{
       await User.create(req.body);
       res.send("user created successfully");
   })

   app.patch("/update/:id", async(req,res)=>{
    const {id} = req.params;
        const {name , city} = req.body;
        if(!name && !city){
            return res.status(400).json({
                message:"please enter credentials to update"
            })
        }
        await User.findByIdAndUpdate(id,{name,city},{runValidators:true, new:true})
        return res.status(200).json({message:"updated succeesfuly"})
   })

connectDb()
   .then(()=>{console.log("db connected successfully");
    app.listen(3000,()=>{
          console.log("server running");
    })
   })
   .catch((err)=>{
    console.log(err);
   })

   

   




