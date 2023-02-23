const express= require('express');
const router =express.Router();
const mongodb=require('mongodb')
const todo =require('../model/todoSchema')
const cors = require('cors')
const app=express()
app.use(cors())
app.use(express.json())


 
router.get('/',async(req,res)=>{
        const data = await todo.find()
        console.log("data is retrieved successfully");
        res.send(data)

    });


    
    router.put('/',(req,res)=>{
        const id=new mongodb.ObjectId(req.body.id)
        console.log(id)
        todo.findByIdAndUpdate({_id: id},req.body).then((err)=>{
            console.log(err)
        })
        res.send({data:"tell me what to update"})
    });


    router.post('/',(req,res)=>{
        // console.log(req.body);
        const list={
            title:req.body.title,
            task:[{
                taskDes:req.body.task,
                Status:req.body.Status
            }]
        }
        todo.insertMany(list)
        res.send({data:"user can succefully enter new data"})
    });
    
    router.delete('/',(req,res)=>{
        const id=new mongodb.ObjectId(req.body.id)
        todo.findByIdAndRemove({_id:id}).then((res)=>{

            res.send("data is successfully deleted")
        }
        ).catch((err)=>{
            console.log(err)})
    })
    

module.exports=router;