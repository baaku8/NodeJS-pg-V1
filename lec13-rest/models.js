import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    ip_address:{
        type:String,
    }
},
{
    timestamps:true,
})

export const User=mongoose.model('User',UserSchema);