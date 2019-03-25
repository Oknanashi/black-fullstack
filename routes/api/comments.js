const express = require('express')
const router = express.Router()

const Comment = require('../../models/Comment')


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/test',(req,res)=>res.json({msg:'Posts route work'}))

//@action POST /movie/:id
//@Private
router.post('/movie/:id',(req,res)=>{
  console.log(req.params.id)
  const newComment = new Comment({
    name:req.body.name,
    text:req.body.text,
    movie:req.body.movie
  })
  console.log(newComment)
  newComment.save()
    .then(comment=>res.json(comment))
    .catch(err=>res.status(400).json({response:'You must be logged in to leave a comment '}))
})

//@action GET /movie/:id
//@Public
router.get('/movie/:id',(req,res)=>{
  console.log(req.params.id)
  const movie = req.params.id
  Comment.find({movie})
    .then(movie=>{
      if(!movie){
        return res.status(404).json({movie:'Movie not found'})
      }
      res.json({movie:movie})

    })
})

// //@action DELETE /movie/:id
// //@Private
// router.get('/movie/:id',(req,res)=>{
//   console.log(req.params.id)
//   const movie = req.params.id
//   Comment.find({movie})
//     .then(movie=>{
//       if(!movie){
//         return res.status(404).json({movie:'Movie not found'})
//       }
//
//       res.json({movie:movie})
//
//     })
// })


module.exports=router
