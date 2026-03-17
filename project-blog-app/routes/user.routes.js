import express from "express"
import { User } from "../models/user.models.js";
const router=express.Router();

router.get('/signin',(req,res)=>{
      res.render("signin")
})

router.get('/signup',(req,res)=>{
    res.render("signup");
})

router.post('/signup',async(req,res)=>{
    const {fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/')
})

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    const user=User.matchPassword(email,password);
    console.log("user: ",user);
    res.redirect('/')
})







export default router;