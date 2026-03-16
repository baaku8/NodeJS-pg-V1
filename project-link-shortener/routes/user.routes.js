import express from "express"
const router=express.Router()
import { handleUserSignUp ,handleUserLogin} from "../controllers/user.controllers.js"
router.post('/',handleUserSignUp)
router.post('/login',handleUserLogin)
router.get('/login',(req,res)=>{
    res.render("login")
})
router.get('/signup',(req,res)=>{
    res.render("signup")
})


export default router;