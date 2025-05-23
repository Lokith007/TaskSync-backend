const express=require('express');
const bcrypt=require('bcrypt');
const body_parse=require('body-parser');
const cookieParser=require('cookie-parser');
const cors =require('cors');
const jwt=require('jsonwebtoken');
const path=require("path");
const webpush =require('webpush');
const cron = require('cron');
//const collection = require('./config');
const taskdb=require('./models/task')
const {Userdb,Organisationdb}=require('./models/user')

const { connection } = require("mongoose");
require('dotenv').config();

const app=express();
const port =4444;
const origin = [ ];

app.use(express());
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
    const user = await collection.findOne({Email:email});
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
  const user=await collection.findOne({Email:data.Email});
  if(user){
    console.log('Account already exits for this Email');
    return res.send({message:'mae'});
  }
  const saltRound=10;
  data.Password= await bcrypt.hash(req.body.pass,saltRound);
  const newuser=new collection(data);
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

app.post('/subscribe',(req,res)=>{
    
})
app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
});