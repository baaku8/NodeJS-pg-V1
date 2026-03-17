import express from "express"
import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: './.env' })
import UserRoute from "./routes/user.routes.js"
import DBConnect from "./db/index.js";

//configurations
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//databaseConnection
DBConnect().then(()=>{
    console.log("DB_Connected Successfully");
}).catch((e)=>{
    console.log("ERROR",e);
})


app.get('/',(req,res)=>{
    res.render("home");
})
app.use('/user',UserRoute)
app.listen(process.env.PORT,()=>{
    console.log("Server is running...")
})