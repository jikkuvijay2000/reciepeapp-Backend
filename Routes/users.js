const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../Models/users');

const router = express.Router();


router.post('/register' ,async(req,res)=>
{
   try{
    const {username,password}=req.body;
    const user = await userModel.findOne({username})
    if(user)
        {
            res.status(401).json("User already registered!")
            console.log(user);
            return;
        }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new userModel({username,password:hashedPassword})
    await newUser.save()
    res.status(200).json(`${username} has been successfully registered`)
   }catch(err)
   {
    res.status(500).json("Internal Server Error")
    return;
   }

})





router.post('/login',async(req,res)=>
{
    try{

        const {username,password} =req.body;
    const user = await userModel.findOne({username});
    if(!user)
        {
            res.status(401).json(`${username} is not registered!`)
            return;
        }

    const IsPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!IsPasswordCorrect)
        {
            res.status(401).json("Incorrect password,try again!")
            return;
        }
        
        const token = jwt.sign({id:user._id},"secret");
        res.json({token,id:user._id})

    }catch(err)
    {
        res.status(500).json("Internal Server Error")
        return;
    }

})


module.exports={userRouter:router}
