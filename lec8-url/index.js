
// https://www.youtube.com/results?search_query=chai+aur+code
//this is the example of a url,
//https://--->this is the network protocol through which communication is done.
//www.youtube.com/---is the domain name
// /results---is the page or path.
// after ? is basically the query parameters through which is processed and corresponding to it content is displayed.


import http from "http"
import fs from "fs"
import url from "url"       //this is a package that is used to parse a url
//this creates the server.
const myServer=http.createServer((req,res)=>{
    if(req.url==="/favicon.ico") return res.end();
    if(req.url==="/.well-known/appspecific/com.chrome.devtools.json") return res.end();
    const myUrl=url.parse(req.url,true)        //this true denotes that now this is ready to parse query parameters also.
    console.log(myUrl)
    // console.log(req.headers);
    const log=`${new Date().toLocaleTimeString()} : from the path ${req.url}\n`;
    fs.appendFile("./lec8-url/log.txt",log,()=>{
        console.log("logged successfully")
        res.end(`This is the response from the server at the url ${myUrl.pathname}`)
    })
})

//now the server needs a port in a system to run.
myServer.listen(8000,()=>{
    console.log("Server is working!");
})


//so we can see that http mae hr ek path ke liye hume alg se get,post ,patch ke codes likhna pdhta hae,so it gets
//messy and code readability decreases.
//to solve this we have express , which is a framework that internally uses http and its easier to write and its more readable