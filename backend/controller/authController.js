
const dotenv=require('dotenv')
const authdb =require('../model/authSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

const secretMessage=process.env.secretMessage;
const maxAge=3*24*60*60
const createToken=(id)=>{
    return jwt.sign({id},secretMessage,{expiresIn:maxAge})
}

module.exports.signup =async(req,res)=>{
    const mail=req.body.mail_id;
    const salt =await bcrypt.genSalt();

    const password=await bcrypt.hash(req.body.password,salt);
   
    try{
        
        const user = await authdb.insertMany({
            email:mail,
            password:password
        })
        console.log(user[0]._id.toString());
        const token=createToken(user[0]._id);
        console.log(`token:${token}`)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.send("Auth Successful");
    }
    catch(err){
            console.log(err);
    }
    
}

module.exports.login =async(req,res)=>{
    console.log(req.body)
    const mail=req.body.mail_id;
    const password=req.body.password;

    const user = await authdb.findOne({ email: mail });
    console.log(`user:${user} password:${user.password}`);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      const token=createToken(user._id);
        console.log(`token:${token}`)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
      if (compare) {
        res.send("Auth Successful");
      } else {
        res.send("Wrong username or password.");
      }
    
}
}
