import express from "express";
import dotenv from "dotenv"
dotenv.config({path:"./.env"});
import dbConnect from "./db/db_connect.js"
import path from "path"
import UrlRouter from "./routes/url.routes.js"
import UserRouter from "./routes/user.routes.js"
import StaticRouter from "./routes/staticRoute.routes.js"
import { restrictLogin } from "./middlewares/jwt.middlwares.js";
import cookieParser from "cookie-parser";



dbConnect()
.then(()=>{
    console.log("DB_connected Successfully");
})
.catch((err)=>{
    console.log(`Connection failed: ${err}`);
})
const app=express();
app.use(express.json({
    limit:"100kb",
}))
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(cookieParser());

app.use('/',StaticRouter);
app.use('/url',restrictLogin,UrlRouter);
app.use('/user',UserRouter)


//important
// app.get('/:shortId',async(req,res)=>{
//     const shortId=req.params.shortId;
//     const entry=await URL.findOneAndUpdate({
//         shortId
//     },{
//         $push:{
//             visitHistory:
//                 {
//                     timestamp:Date.now() 
//                 }
            
//         }
//     })
//     res.redirect(entry.redirectURL);
// })
app.listen(8500,()=>{
    console.log(`Server is running in port 8500!!`);
})