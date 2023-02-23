const mongoose = require('mongoose')
const taskType=[{
    taskDes: String,
    Status: Boolean
}];
const schema = new mongoose.Schema({
    title:String,
    task: taskType
})
module.exports = mongoose.model("todo",schema)
