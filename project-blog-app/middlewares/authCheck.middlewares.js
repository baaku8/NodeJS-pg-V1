import { validateToken } from "../services/authentication.services.js";

function checkAuthfromCookies(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue) return next();

        try {
            const payload=validateToken(tokenCookieValue);
            req.user=payload;
            res.locals.user = userPayload;
        } catch (error) {}
        next();
    }
}

export {checkAuthfromCookies};