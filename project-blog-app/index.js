import dotenv from "dotenv"
dotenv.config({ path: './.env' })

import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import UserRoute from "./routes/user.routes.js"
import BlogRoute from "./routes/blog.routes.js"
import {Blog} from './models/blog.models.js'
import DBConnect from "./db/index.js";
import { checkAuthfromCookies } from "./middlewares/authCheck.middlewares.js"

//configurations
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(cookieParser());
app.use(checkAuthfromCookies("authToken")); 
app.use(express.static(path.resolve('./public')));

//databaseConnection
DBConnect().then(()=>{
    console.log("DB_Connected Successfully");
}).catch((e)=>{
    console.log("ERROR",e);
})


app.get('/',async(req,res)=>{
    // console.log("user",req.user)
    const allBlogs=await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
})
app.use('/user',UserRoute)
app.use('/blog',BlogRoute)


app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found",
        path: req.path
    });
});
app.listen(process.env.PORT||8250,()=>{
    console.log("Server is running...at http://localhost:8250")
})