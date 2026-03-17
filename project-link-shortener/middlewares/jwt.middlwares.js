import jwt from "jsonwebtoken";

const setUser = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return null; // Return null if token is expired or tampered with
    }
}

const restrictLogin = async (req, res, next) => {
    // console.log("Cookies received:", req.cookies); 
    // console.log("headers: ",req.headers["authorization"])
    // const userid = req.cookies?.authToken;
      const userid=req.headers["authorization"];
    //   console.log(userid);
    // console.log("User ID from cookie:", userid);
    if (!userid) {
        console.log("No cookie found, redirecting...");
        return res.redirect('/user/login');
    }
    const token=userid.split(" ")[1]; 
    // const user = getUser(userid);
    const user=getUser(token);
    if (!user) {
        console.log("Invalid token, redirecting...");
        return res.redirect('/user/login');
    }

    req.user = user;
    next();
}
export {setUser,getUser,restrictLogin}