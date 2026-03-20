import express from "express"
import multer from "multer";
import { Blog } from "../models/blog.models.js";
import path from "path"
const router=express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
})

const upload = multer({ storage: storage })


router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    })
})

router.get('/:id',async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    // console.log(blog)
    if(!blog) return res.redirect('/home');
    return res.render('blog-page',{
        user:req.user,
        blog
    })
})
router.post('/add-new',upload.single('coverImage'),async(req,res)=>{
    const {title,body} =req.body;
    const blog= await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
     })
     return res.redirect(`/blog/${blog._id}`);
})
export default router;