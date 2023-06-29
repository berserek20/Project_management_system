const mongoose = require('mongoose');
const { todo } = require('./database');
const taskType=[{
    taskDes: String,
    Status: Boolean
}];
const newContent = [{
                    url: String,
                    content: Array
                    }]
const schema = new mongoose.Schema({
    title:String,
    task: taskType,
    contentBlock:newContent
    

})

module.exports = todo.model("todos",schema)
