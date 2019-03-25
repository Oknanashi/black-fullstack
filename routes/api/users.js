const express = require('express')
const router = express.Router()
const  bcrypt = require('bcryptjs')
const User = require('../../models/User')


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//@route GET api/User/test
//@access Public
router.get('/test',(req,res)=>res.json({msg:'User route works'}))


//@route POST api/user/register
//@access Public

router.post('/register',(req,res)=>{
  const errors = {}
  User.findOne({email:req.body.email})
    .then(user=>{
      if(user){
        return res.status(400).json({error:'Email already exists'})
      }
      else {
        const newUser = new User({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password
        })
        console.log(req.body)
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err)throw err
            newUser.password=hash
            newUser.save()
              .then(user=>res.json(user))
              .catch(err=>console.log(err))
          })
        })
      }
    })
})


//@route POST api/user/login
//@access Public

router.post('/login',(req,res)=>{
  const email = req.body.email
  const password = req.body.password

  console.log(req.body)
  User.findOne({email})
    .then(user=>{
      if(!user){
        return res.status(404).json({error:'User not found'})
      }
      //Check password
      bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(isMatch){
              res.json({user:user,id:user.id})
          }else{

              return res.status(400).json({error:'Password is incorrect'})
            }
        })

    })
})
//@route POST api/users/current
//@access Private
router.post('/current',(req,res)=>{
  const id = req.body.id
  console.log(req.body.id)
  User.findById(id)
    .then(user=>{
      if(!user){
        return res.status(404).json({email:'User not found'})
      }

      res.json({user:user,id:user.id})
    })
    .catch(err=>console.log(err))
})

module.exports=router
