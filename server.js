const express=require('express');
const bcrypt=require('bcrypt');
const body_parse=require('body-parser');
const cookieParser=require('cookie-parser');
const cors =require('cors');
const jwt=require('jsonwebtoken');
const path=require("path");
const collection = require('./config');
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

app.post('/sign_in',async(req,res)=>{
    const data = {Email:req.body.mail,Password:req.body.pass};
    const user = await collection.findOne({Email:data.Email});
    if(!user){
        console.log("No user found");
        return res.send({message: 'nuf' });
    }
    const saltRound=10;
    const pass= await bcrypt.hash(data.Password,saltRound);
    if(user.Password!=pass){
        console.log("Wrong password");
        return res.send({message:"wp"});
    }
    const token=jwt.sign({Userid:user.UserId,name:user.name,mail:user.Email});
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
  const data={Email:req.body.mail,Password:'',UserId:-1,UserName:req.body.name};
  const user=collection.findOne({Email:data.Email});
  if(user){
    console.log('Account already exits for this Email');
    return res.send({message:'mae'});
  }
  const saltRound=10;
  data.Password= await bcrypt.hash(req.body.pass,saltRound);
  //before saving create and asing the user id to data.UserId.
  const newuser=new collection(data);
  await newuser.save();
  const token=jwt.sign({Userid:data.UserId,name:data.UserName,mail:data.Email}) ;
  res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
       domain: 'localhost'
    });
    return res.send({message:"s"});
});

app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
});