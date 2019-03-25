const express = require('express')
const mongoose = require('mongoose')
const bodyParser =require('body-parser')
const passport = require('passport')
const path = require('path')
const users = require('./routes/api/users')
const comments = require('./routes/api/comments')
const app = express()



//Body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Connect to MongoDb
const db = require('./config/keys').mongoURI
mongoose
  .connect(db,{useNewUrlParser:true})
  .then(()=>console.log('Mongo db connected'))
  .catch((err)=>console.log(err,'Db error connection'))


app.use('/api/users',users)
app.use('/api/comments',comments)

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname,'build')))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})

const port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server running on port ${port}`))
