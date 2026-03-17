import express, { urlencoded } from "express";
import multer from "multer";
import path from "path";

const app=express();

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(urlencoded({extended:false}));


app.get('/',(req,res)=>{
    res.render("homepage");
})
const upload=multer({storage})
app.post('/upload',upload.single("ProfileImage"),(req,res)=>{
   console.log(req.file);
   res.redirect('/');
})

app.listen(8200,()=>{
    console.log("Server is running...")
})