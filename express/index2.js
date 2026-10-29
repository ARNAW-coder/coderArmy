import express from "express";
import { Auth } from "../middleware/auth.js";
const app = express();

app.use(Auth);

app.get("/user", (req,res)=>{
     res.send("detail 1 --- done");
})

app.listen(5000,(req,res)=>{
    console.log("server started at port : 5000");
})
