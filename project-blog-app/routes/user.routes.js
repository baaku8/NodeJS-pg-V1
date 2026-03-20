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
    const user= await User.findOne({email});
    if(user) return res.render('signup',{error:"Email already exist"});
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/')
})

router.post('/signin',async(req,res)=>{
        const {email,password}=req.body;
    try {
        const token=await User.matchPassword(email,password);
        return res.cookie("authToken",token).redirect('/');
    } catch (error) {
        return res.render("signin",{error:"Incorrect email or password"});
        
    }
})

router.get('/logout',(req,res)=>{
     return res.clearCookie("authToken").redirect('/');
})





export default router;