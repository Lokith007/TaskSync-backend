const express=require('express');
const bcrypt=require('bcrypt');
const body_parse=require('body-parser');
const cookieParser=require('cookie-parser');
const cors =require('cors');
const jwt=require('jsonwebtoken');
const path=require("path");
const task=require('./models/task')
const {Users,Organisation}=require('./models/user')
const notify=require('./notify');
const { connection } = require("mongoose");
require('dotenv').config();

const app=express();
const port =4444;
const origin = [ ];

app.use(express.json());
app.use(cookieParser());
notify.start();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

webpush.setVapidDetails(
  'mailto:.........',
   process.env.publicKey,
   process.env.privatekey
  );

app.post('/sign_in',async(req,res)=>{
    const email=req.body.email;
    const pass=req.body.pass;
    const user = await Users.findOne({Email:email});
    if(!user){
        console.log("No user found");
        return res.send({message: 'nuf' });
    }
    const saltRound=10;
    const hashed_pass= await bcrypt.hash(pass,saltRound);
    if(user.Password!=hashed_pass){
        console.log("Wrong password");
        return res.send({message:"wp"});
    }
    const token=jwt.sign({Userid:user.UserId},);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
       domain: 'localhost'
    });
    return res.send({message:"s"});
});

app.post('/sign_up',async(req,res)=>{
  const data={Email:req.body.mail,Password:'',UserId:"-1a",UserName:req.body.name};
  const user=await Users.findOne({Email:data.Email});
  if(user){
    console.log('Account already exits for this Email');
    return res.send({message:'mae'});
  }
  const saltRound=10;
  data.Password= await bcrypt.hash(req.body.pass,saltRound);
  const newuser=new Users(data);
  await newuser.save();
  data.UserId=newuser._id.toString();
  const token=jwt.sign({Userid:data.UserId}) ;
  res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
       domain: 'localhost'
    });
    return res.send({message:"s"});
});

app.post('/set_remainder',async(req,res)=>{
     const time=req.body.time;
     const date=req.body.date;
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
     const remainder=new Remainder({UserId:UserId,Time:time,Date:date,Subscription:Subscription,TaskId:taskId});
     await remainder.save();
     return res.send({message:'s'});
})

app.post('/subscribe',async(req,res)=>{
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

app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
});