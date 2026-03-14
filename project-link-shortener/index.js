import express from "express";
import dotenv from "dotenv"
dotenv.config({path:"./.env"});
import dbConnect from "./db/db_connect.js"
import UrlRouter from "./routes/url.routes.js"
import { URL } from "./models/url.models.js";
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
app.use('/url',UrlRouter);

//important
app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:
                {
                    timestamp:Date.now() 
                }
            
        }
    })
    res.redirect(entry.redirectURL);
})
app.listen(8500,()=>{
    console.log(`Server is running in port 8500!!`);
})