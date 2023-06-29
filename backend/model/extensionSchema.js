const mongoose = require('mongoose');
const {extdb}=require('./database');

const extSchema =  mongoose.Schema(
    {
        url:{
            type:String,
            required:[true,'url is required'],
            unique:true,
           
        },
        content: {
            type:Array,
            minlength:[6,'password is to short'],
        }


    }

   )
module.exports = extdb.model("auths",extSchema);
