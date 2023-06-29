const todo = require('../model/todoSchema')
const mongodb = require('mongodb')
const { tdb } = require('../model/trackSchema')

module.exports.extdocfetch=async (req, res) => {
    // findById
    const arr =[];
    const taskObject= await tdb.find({userId:res.locals.userId})
    taskObject[0].space.forEach((e)=>{
        arr.push(e.spaceId.trim());
    })
    console.log(`docfetch:${taskObject[0].space} taskId:${arr} `,Array.isArray(arr))
    


    const data = await todo.find({_id:{$in: arr }})
    // console.log(`fetch: ${data}`);
     res.send(data)

}

module.exports.extaddItem=async(req,res)=>{
    const id=new mongodb.ObjectId(req.body.id)
    const data=await todo.updateOne({_id:id},{
        $push:{
            task:{
                
                taskDes:req.body.taskDes,
                Status:req.body.Status
            }
        }
    })
    console.log(`update item: id : ${id}`)
    console.log(`${data}`)
}
