//REST-Representational State Transfer
//Rest is basically an architectural design which has certain rules.
//>>The server should be independent of the client.
//>>The design shall respect all the http ptotocols.
//The apis made under these rules are called Rest API or RestFull API.

//mock_data from mockaroo.com

//middlewares
//they are basically functions that come in the between the clinet and server and has access to the req,res
//they can modify the req before it hits the routes
//mainly used for prechecking like authentication and user log registering



import express from "express"
const app=express();
import fs from "fs"
import data from './MOCK_DATA.json' with { type: 'json' };
//for users without browser or clients doing client side rendering
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
   //calling the next function is really necessary or else it will pause the req-res cycle
   console.log("Hello from middleware");
   next();
})
app.get('/api/users',(req,res)=>{
    return res.json(data);
})
//for users having browser and want server side rendering
app.get('/users',(req,res)=>{
    const html=`
    <ul>
      ${data.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `; 
    res.send(html);
})
//dynamic path parameters
app.get('/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=data.find(user=>user.id===id)
    // return res.json(user);  //same baat
    res.send(user);
})

app.post('/users',(req,res)=>{
    const body=req.body;  //but ye directly nhi hoga, we have t use a middleware for this.
    data.push({id:data.length+1,...body});  //ye sirf variable ko update kr rhe hae, for updating the json file we gotta use fs
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(data),(err,data)=>{
        if(err){
            console.log(err);
        }else{
            return res.status(201).json({"status":"success"});
        }
    })
    // console.log(body)
})
app.listen(8000,()=>{
    console.log("Server is running....")
})


//for nested methods
// app
// .route('/api/users')
// .get()
// .patch()
// .delete()

