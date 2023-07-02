const todo = require('../model/todoSchema')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const { tdb } = require('../model/trackSchema')

module.exports.docfetch = async (req, res) => {
    // findById
    const arr = [];
    const taskObject = await tdb.find({ userId: res.locals.userId })
    console.log(taskObject, "userId", res.locals.userId)
    if (taskObject == []) {
        res.send("while checking track database the user to be found currently not having any project created ")
    }
    else {


        taskObject[0].space.forEach((e) => {
            arr.push(e.spaceId.trim());
        })
        console.log(`docfetch:${taskObject[0].space} taskId:${arr} `, Array.isArray(arr))



        const data = await todo.find({ _id: { $in: arr } })
        // console.log(`fetch: ${data}`);
        res.send(data);
    }

}



module.exports.docCreate = async (req, res) => {
    const taskObject = await tdb.find({ userId: res.locals.userId })
    const spacearr = taskObject[0].space; //find space in track database to check user space array and attributes

    console.log(req.body.taskDes, "spacearray", spacearr);

    const list = {
        title: req.body.title,
        task: [{
            taskDes: req.body.taskDes,
            Status: req.body.Status
        }]
    }
    const todoInsertResponse = await todo.insertMany(list);//create a new document in todo database and insert  requested values
    console.log("response docCreate", todoInsertResponse[0]._id);
    spacearr.push({ spaceId: todoInsertResponse[0]._id, role: "owner" });
    const trackInsertResponse = await tdb.updateOne({ userId: res.locals.userId }, { $set: { space: spacearr } })//in track database user space updated with new spaceId
    console.log("track db update Response", trackInsertResponse);
    res.send("user can succefully enter new data" )
}

module.exports.docDelete = async (req, res) => {
    // console.log(`crudController id ${res.locals.userId}`)
    const taskObject = await tdb.find({ userId: res.locals.userId });
    const selectedSpace = taskObject[0].space.filter((e) => {
        return e.spaceId.trim() == req.body.id;
    })
    const role = selectedSpace[0].role
    console.log(`delete spaceId ${selectedSpace}  role: ${role}`, Array.isArray(selectedSpace))
    console.log(`selectedSpace.Id=>`, selectedSpace[0]._id)

    if (role == "owner") {

        const spacearrayIds = taskObject[0].space.filter((e) => {
            return e.spaceId != req.body.id;
        });

        // filtering out spaces whose id is same as the requested id which is asked to be deleted

        console.log("userSpaceArray", spacearrayIds, "boolean", Array.isArray(spacearrayIds))

        // below query updates(removes) the spaceId and userRole with the spacearray comprises of all space Object except the one which we don't need and updates the track db document for the logged in user
        await tdb.updateOne({ spaceId: req.body.id }, { $set: { space: spacearrayIds } })//work on it, it still updating any of the tow documents


        // console.log("clearSpace",clearSpace)
        const id = new mongodb.ObjectId(req.body.id)
        // it delete the whole space with all the task from todo collection

        const removeSpace = await todo.deleteOne({ _id: id })

        console.log(`remove`, removeSpace, `selectedSpace`, selectedSpace[0]._id)

        res.send("data is successfully deleted")


    }
    else {
        res.send("user doesn't have permission to delete the space")
    }
}

module.exports.itemUpdate = async (req, res) => {
    // const space = await todo.find({_id: req.body.id})
    const reqSpaceId = req.body.spaceId;
    const reqTaskId = req.body.id;
    // if (reqTaskId) {res.send("please Select a task to be updated first");}
    console.log(`crudcontroller item Update task_id:${reqTaskId}  `)//space:${space}
    const taskObject = await tdb.find({ userId: res.locals.userId });
    console.log("taskObject", taskObject)

    const selectedSpace = taskObject[0].space.filter((e) => {
        return e.spaceId.trim() === reqSpaceId;
    })
    console.log(` spaceId ${selectedSpace}  `, Array.isArray(selectedSpace))
    const role = selectedSpace[0].role
    console.log(`selectedSpace.Id=>`, selectedSpace[0]._id, "role", role)
    // console.log(`PUT ID ${id}`)
    const space = await todo.findById({ _id: reqSpaceId });
    const taskarr = space.task.filter((e) => {
        return e._id != reqTaskId;
    })
    taskarr.push({_id: reqTaskId, taskDes: req.body.taskDes,
        Status: req.body.Status})
    console.log("taskarr", taskarr);
    const objectId = new mongodb.ObjectId(reqTaskId);

    if (role === 'owner' || 'contributor') {

        todo.updateOne(
            { _id: reqSpaceId,task:{$elemMatch:{_id:objectId}} },
            {
                $set: {
                    "task.$.taskDes": req.body.taskDes,
                    "task.$.status": req.body.Status
                   
                }

            },
            null,
            (err, res) => {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    console.log("Response", res);
                }
            }
        )
        res.send( "Content has been updated" )
    }
    else {
        res.send( "user has only permission to read content" )
    }

}

module.exports.fetchItems = async (req, res) => {
    const id = new mongodb.ObjectId(req.body.id)
    const data = await todo.findById({ _id: id })
    res.json(data)
}

module.exports.addItem = async (req, res) => {
    const taskObject = await tdb.find({ userId: res.locals.userId });
    const selectedSpace = taskObject[0].space.filter((e) => {
        return e.spaceId.trim() == req.body.id;
    })
    const role = selectedSpace[0].role
    console.log(`delete spaceId ${selectedSpace}  role: ${role}`, Array.isArray(selectedSpace));

    const id = new mongodb.ObjectId(req.body.id)
    if(role=="owner"){

        const data = await todo.updateOne({ _id: id }, {
            $push: {
                task: {
    
                    taskDes: req.body.taskDes,
                    Status: req.body.Status
                }
            }
        })
        console.log(`update item: id : ${id}`)
        console.log(`${data}`)
        res.send("new item has been added");
    }
    else{
        res.send("user doesn't have access to add new item")
    }
}