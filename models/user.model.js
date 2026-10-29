import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({

    name:{type:String,
        required:true,
        minLength:3,
        maxLength:20},

    age:{type:Number,
        min:13,
        max:70,
       
    },

    password:{
        type:String,
        required:true,
    },

    email:{type:String,
        required:true,
        unique:true,
    },

    gender:{type:String,
        enum:["male","female","others"],
    },

},{
    timestamps:true
})

userSchema.methods.getJWT = function(){
       return jwt.sign({_id:this._id,email:this.email},process.env.SECRET_KEY,{expiresIn:"60s"});
}

userSchema.methods.verifyPassword = async function(userpassword){
       await bcrypt.compare(userpassword,this.password);
}

const User = mongoose.model("user",userSchema);
 
export {User, }