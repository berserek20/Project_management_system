const todo = require('../model/todoSchema')
const mongodb = require('mongodb')
const { tdb } = require('../model/trackSchema')

module.exports.docfetch=async (req, res) => {
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

// module.exports.docfetch=async (req, res) => {
//     const data = await todo.find()
//     console.log("data is retrieved successfully");
//     res.send(data)

// }

module.exports.docCreate=(req, res) => {
    console.log(req.body.taskDes);
    const list = {
        title: req.body.title,
        task: [{
            taskDes: req.body.taskDes,
            Status: req.body.Status
        }]
    }
    todo.insertMany(list)
    res.send({ data: "user can succefully enter new data" })
}

module.exports.docDelete=async(req, res) => {
    console.log(`crudController id ${res.locals.userId}`)
    const taskObject= await tdb.find({ userId: res.locals.userId } );
    const selectedSpace = taskObject[0].space.filter((e)=>{
        return e.spaceId.trim() == req.body.id
    })
    console.log(` spaceId ${selectedSpace}  role: ${selectedSpace[0].role}`,Array.isArray(selectedSpace))
    // const id = new mongodb.ObjectId(req.body.id)
    // todo.findByIdAndRemove({ _id: id }).then((res) => {

    //     res.send("data is successfully deleted")
    // }
    // ).catch((err) => {
    //     console.log(err)
    // })
}

module.exports.itemUpdate=(req, res) => {
    // console.log(`PUT ID ${id}`)
    console.log(req.body)

    const objectId = new mongodb.ObjectId(req.body.id);

    todo.updateOne(
        { "task._id": objectId },
        {
            "$set": { "task.$.taskDes": req.body.taskDes,
            "array.$.Status": req.body.Status },
            // "$set": { }
        },
        null,
        (err,res)=>{
            if(err){
                console.log("Error",err);
            }
            else{
                console.log("Response",res);
            }
        }
    )

    
    res.send({ data: "tell me what to update" })
}

module.exports.fetchItems=async(req,res)=>{
    const id=new mongodb.ObjectId(req.body.id)
    const data =await todo.findById({_id:id})
    res.json(data)
}

module.exports.addItem=async(req,res)=>{
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