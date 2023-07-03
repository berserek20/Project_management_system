    // // const todo = require('../model/todoSchema')
    // // const mongodb = require('mongodb')

    // // const { tdb } = require('../model/trackSchema')
    // const { authdb } = require('../model/database')
    // const dotenv=require('dotenv')
    // const bcrypt = require('bcrypt');
    // const jwt = require('jsonwebtoken');
    // dotenv.config();

    // const secretMessage=process.env.secretMessage;
    // const maxAge=3*24*60*60
    // const createToken=(id)=>{
    //     return jwt.sign({id},secretMessage,{expiresIn:maxAge})
    // }
    // function handleErr(res,err){
    //     res.status(err.message,err.code);
    // }
    // module.exports.extlogin =async(req,res)=>{
    //     console.log('login credentials',req.body)
    //     const mail=req.body.mail_id;
    //     const password=req.body.password;
    //     try{

    //         const user = await authdb.findOne({ email: mail });
    //         console.log(user)
    //         if (user) {
    //             console.log(`Authcontroller: [note:implement regex] user:${user} password:${user.password}`);
    //             const compare = await bcrypt.compare(password, user.password);
    //             const token=createToken(user._id);
    //             console.log(`token:${token}`)
    //             res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
    //             if (compare) {
    //                 res.send({token:token});
    //             } else {
    //                 res.send("Wrong username or password.");
    //             }
    //         } 
    //     }
    //     catch(err){
    //         handleErr(res,err);
    //     }
    // }


    // // module.exports.extdocfetch=async (req, res) => {
    // //     // findById
    // //     const arr =[];
    // //     const taskObject= await tdb.find({userId: res.locals.userId})
    // //     taskObject[0].space.forEach((e)=>{
    // //         arr.push(e.spaceId.trim());
    // //     })
    // //     console.log(`docfetch:${taskObject[0].space} taskId:${arr} `,Array.isArray(arr))
        


    // //     const data = await todo.find({_id:{$in: arr }})
    // //     console.log(`fetch: ${data}`);
    // //      res.send(data)

    // // }

    // // module.exports.extaddItem=async(req,res)=>{
    // //     const id=new mongodb.ObjectId(req.body.id)
    // //     console.log("request",req)
    // //     const data=await todo.updateOne({_id:id},{
    // //         $push:{
    // //             contentBlock:{
                    
    // //                 url:req.body.url,
    // //                 content:req.body.content
    // //             }
    // //         }
    // //     })
    // //     console.log(`update item: id : ${id}`)
    // //     console.log(`${data}`)
    // // }
