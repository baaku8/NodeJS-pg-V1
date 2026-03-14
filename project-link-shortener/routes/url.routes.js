import express from "express"
import handleGenerateShortUrl from "../controllers/url.controllers.js";
const router=express.Router();

router.post('/',handleGenerateShortUrl)


export default router;