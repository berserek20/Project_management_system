const express = require('express')
const app = express();
const mongodb = require('mongodb')
const dbConnect = require('./model/database');
const todo =require('./model/todoSchema')

const routes=require('./controller/crudRoutes')

const cors = require('cors');
app.use(cors())

app.use(express.json());
dbConnect.mongdb();
app.use('/user',routes)
app.post('/task',async(req,res)=>{
    const id=new mongodb.ObjectId(req.body.id)
    const data =await todo.findById({_id:id})
    res.json(data)
})



app.listen(3001,()=>console.log(`server is live on http://localhost:3001`))

