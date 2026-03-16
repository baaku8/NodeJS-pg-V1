import express from "express"
import handleGenerateShortUrl from "../controllers/url.controllers.js";
const router=express.Router();

router.post('/',handleGenerateShortUrl)
router.get('/',(req,res)=>{
    res.render("url")
})

export default router;