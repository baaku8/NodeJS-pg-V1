import { nanoid } from "nanoid"
import { URL } from "../models/url.models.js";
const handleGenerateShortUrl=async(req,res)=>{
   const shortID=nanoid(8);
   const body=req.body;
   if(!body.url) return res.status(400).json({error:"url is required"});
   await URL.create({
      shortId:shortID,
      redirectURL:body.url,
      visitHistory:[],
   })
   return res.status(201).json({id:`http://localhost:8500/${shortID}`});
}

export default handleGenerateShortUrl;