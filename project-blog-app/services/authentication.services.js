import jwt from "jsonwebtoken";

const secret="Superman";


function createUserToken(user){
   const payload={
    _id:user._id,
    email:user.email,
    fullName:user.fullName,
    role:user.role,
   }
//    console.log("secret",secret)
   const token=jwt.sign(payload,secret)
   return token;
}

function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

export {createUserToken,validateToken}