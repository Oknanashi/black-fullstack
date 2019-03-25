const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  movie:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})
module.exports = Comment = mongoose.model('comments',CommentSchema)
