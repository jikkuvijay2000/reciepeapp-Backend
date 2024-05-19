const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { userRouter } = require('./Routes/Users');
const { reciepesRouter } = require('./Routes/reciepes');




const app = express();
app.use(express.json());
app.use(cors())



mongoose.connect("mongodb+srv://jikkuvijayakumar920:jikku@reciepe.kbnwwq8.mongodb.net/reciepe")


app.use('/auth',userRouter);
app.use('/reciepes',reciepesRouter);


const PORT = 3000 || process.env.PORT

app.listen(PORT,(req,res)=>
{
  console.log(`SERVER STARTED AT ${PORT}`);
})