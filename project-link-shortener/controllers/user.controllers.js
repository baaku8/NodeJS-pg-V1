import { setUser } from "../middlewares/jwt.middlwares.js";
import { User } from "../models/users.models.js"


const handleUserSignUp=async(req,res)=>{
    const {username,password}=req.body;
    console.log(req.body)
    await User.create({
        username:username,
        password:password,
    })
    res.redirect('/')
}

//jb bhi hmlog login krte hae to we make a jwt token and store it as a cookie
//then we again make a middleware for verifying the token and insert that middlewares on all those urls 
// where authentication is required.
//process and functions:
//setUser-->takes the payload and converts into a jwt token.
//login-->takes inputs for the payload and then calls setUser which returns the token and this token is stored in the cookies.
//getUser--->verifies the token and returns the user data.
//middleware-handleAuth-->takes the cookie from the browser and calls the getUser function, if everything is correct
// redirect to the requested page.



const handleUserLogin=async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username:username,
        password:password
    });
    if(!user){
        return res.render("login",{error:"Invalid username or password"});
    }else{
       const token=setUser(user);
    //    res.cookie("authToken",token)
        // console.log("token",token);
        // req.headers["authorization"]=token;
    //    return res.redirect('/url');
       return res.json({token})
    }

}
export {handleUserSignUp,handleUserLogin}