const mongoose = require('mongoose')
/**
 * Model that defines the property items of our collection document
 */
const todoSchema= new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    dueDate:{
        type:String,
        required: false
    },
    completed:{
        type:Boolean,
        required:true
    }

})
const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo