import express from "express"
const port =8000
const app=express();

app.get('/',(req,res)=>{
    res.send("homepage")
})

app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})