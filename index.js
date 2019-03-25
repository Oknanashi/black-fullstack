const express = require('express')
const mongoose = require('mongoose')
const bodyParser =require('body-parser')
const passport = require('passport')

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

const port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server running on port ${port}`))
