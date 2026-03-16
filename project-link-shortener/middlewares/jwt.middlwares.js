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
    console.log("Cookies received:", req.cookies); // DEBUG: See if cookies are actually being parsed
    
    const userid = req.cookies?.authToken;
    console.log("User ID from cookie:", userid); // DEBUG: Check if 'uid' exists

    if (!userid) {
        console.log("No cookie found, redirecting...");
        return res.redirect('/user/login');
    }

    const user = getUser(userid);
    if (!user) {
        console.log("Invalid token, redirecting...");
        return res.redirect('/user/login');
    }

    req.user = user;
    next();
}
export {setUser,getUser,restrictLogin}