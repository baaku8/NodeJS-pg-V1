import { randomBytes } from "crypto";
import mongoose from "mongoose";
import {createHmac} from 'crypto';
const UserSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:"/images/defaultProfileImage.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})

UserSchema.pre("save", function () {
    const user = this;

    // 1. If password isn't changed, we MUST call next() 
    // to let the save process continue.
    if (!user.isModified("password")) return;

    try {
        const salt = randomBytes(10).toString(); 
        const hashedPassword = createHmac('sha256', salt)
            .update(user.password)
            .digest('hex');

        this.salt = salt;
        this.password = hashedPassword;

        // 2. Call next() after hashing is done
    } catch (error) {
        console.log("presave error: ",error);// Pass the error to Mongoose if something goes wrong
    }
});

UserSchema.static("matchPassword",async function(email,password){
    const user= await this.findOne({email});
    if(!user) throw new Error("User Not Found");
    const salt=user.salt;
    const hashedPassword=user.password;
    const userProvidedHash=createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    if(hashedPassword!==userProvidedHash) throw new Error("incorrect Password");
    return user;
})



export const User=mongoose.model("User",UserSchema);