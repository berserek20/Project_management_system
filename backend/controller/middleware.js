const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')

dotenv.config();
const secretMessage= process.env.secretMessage;
const routesCheck=(req,res,next)=>{
    console.log(req);
    console.log(req.cookies);
    
    if(req.cookies && req.cookies.jwt){
        const token=req.cookies.jwt;
        const check=jwt.verify(token,secretMessage);
        if(check){
            next();
        }
        else{
            res.send("Not allowed.")
        }  
    }
    else{
        res.send("Not a valid token.")
    }
}

module.exports.routesCheck=routesCheck;