import express from "express";
import { Auth } from "../middleware/auth.js";
const app = express();


app.use("/about",(req,res)=>{
    res.send("this is about");
})
app.use("/contact",(req,res)=>{
    res.send("this is contact");
})


 app.post("/login",Auth, (req,res)=>{
    res.send("login successfully....")
 })

 app.use("/",(req,res)=>{
    res.send("this is home");
})

app.listen(4000,()=>{
    console.log("server is running");
})