import http from "http"
import fs from "fs"

//this creates the server.
const myServer=http.createServer((req,res)=>{
    // console.log(req.headers);
    const log=`${new Date().toLocaleTimeString()} : from the path ${req.url}\n`;
    fs.appendFile("log.txt",log,()=>{
        console.log("logged successfully")
        res.end("This is the response from the server")
    })
})

//now the server needs a port in a system to run.
myServer.listen(8000,()=>{
    console.log("Server is working!");
})