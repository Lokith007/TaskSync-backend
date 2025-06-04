const expressAsyncHandler=require('express-async-handler');
const jwt = require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const body_parse=require('body-parser');
const Users = require('./models/user');
const Remainder =require('./models/remainder');
require('dotenv').config();

const setRemainder=expressAsyncHandler(async(req,res)=>{
     const due = req.body.duetime
     const token = req.cookies.token;
     const data=jwt.verify(token,process.env.SECRET_KEY);
     const UserId=token.UserId;
     const user=Users.findOne({UserId:UserId});
     const taskId=req.body.taskId;
     let Subscription;
     Subscription=user.Subscription;
     if(!Subscription){
           return res.send({message:'sn'});
     }
     const remainder=new Remainder({UserId:UserId,dueTime:due,Subscription:Subscription,TaskId:taskId});
     await remainder.save();
     return res.send({message:'s'});
});
 
const subscribe =expressAsyncHandler(async(req,res)=>{
    const sub = req.body.subscription;
    const token=req.cookies.token;
    const data = jwt.verify(token,process.env.SECRET_KEY);
    const UserId=data.UserId;
    const user = Users.findOne({UserId:UserId}); 
    if(user.subscription){
        console.log('user already subscribed');
        return res.send({message:'as'});
    }
    else{
      user.subscription=sub;
      await user.save();
    }
});

module.exports =taskHandler;