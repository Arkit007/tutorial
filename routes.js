var express = require('express');
var router = express.Router();
var Movie = require('./Models/Book')
var User = require('./Models/User')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

//to fetch movies
router.get('/Book',async(req,res)=>{
    console.log("inside");
    try{
        const imovie = await Movie.find()
        res.send(imovie)
    }catch(e){
        console.log(e.toString());
    }
})

//to add the movies
router.post("/Book",async(req,res)=>{
    const imovie = new Movie({
        name:req.body.name,
        rating:req.body.rating
    })

    await imovie.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})


// api for updating movie

router.patch('/Book/:id',async (req,res)=>{
    const imovie = await Movie.findOne({_id:req.params.id})
    imovie.name = req.body.name
    imovie.rating = req.body.rating
    await imovie.save((err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }
    })

})

//delete api

router.delete("/Book/:name",async(req,res)=>{
    await Movie.deleteOne({name:req.params.name},(err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }

    })
})


router.post('/users',async(req,res)=>{
    
    //generate salt key
    salt = await bcrypt.genSalt(10)
    console.log(salt)

    hashedpswd = await bcrypt.hash(req.body.password,salt)
    console.log(hashedpswd)

    const iuser = new User({
        uname:req.body.uname,
        password:hashedpswd
    })  
    await iuser.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})

module.exports = router 