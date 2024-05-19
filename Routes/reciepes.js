
const express= require('express')
const { reciepesModel } = require('../Models/reciepes');
const { userModel } = require('../Models/users');
const users = require('./users');


const router = express.Router()

router.get('/', async (req,res)=>
{
    try{

        const reciepe = await reciepesModel.find({})
        res.json(reciepe);

    }
    catch(err)
    {
        res.json(err)
    }

});



router.post('/', async (req,res)=>
{
    const reciepe = new reciepesModel(req.body);  
    try
    {
     const response =  await reciepe.save()
     res.json(response);
    }
    catch(err)
    {
       res.json(err);
    }

});

// saved Reciepe calls

router.put('/',async (req,res)=>
{
  
    try
    {
        const reciepe = await reciepesModel.findById(req.body.reciepeID);
        const user = await userModel.findById(req.body.userID);
        user.savedReciepes.push(reciepe)
        await user.save()
        res.json({savedReciepes: user.savedReciepes});


    }
    catch(err)
    {
        res.json(err)
    }
})


router.get('/savedReciepe/ids',async(req,res)=>{

    try{
        const user = await userModel.findById(req.body.userID)
        res.json({savedReciepes:user?.savedReciepes})

    } catch (err) {
        res.json(err)
    }
})

router.get('/savedReciepe',async(req,res)=>{

    try{
        const user = await userModel.findById(req.body.userID)
        const savedReciepes = await reciepesModel.find({
            _id: {$in: users.savedReciepe}
        })
        res.json({savedReciepes})

    } catch (err) {
        res.json(err)
    }
})





module.exports={reciepesRouter:router}