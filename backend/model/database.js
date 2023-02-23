const dotenv=require('dotenv')
const mongoose = require('mongoose')
dotenv.config();
const url = process.env.dbConnect;

const mongdb = ()=>{
    mongoose.connect(url).then(()=>{
        console.log("database is connected")
    }).catch(err=>console.log(err));
}

module.exports={mongdb}
