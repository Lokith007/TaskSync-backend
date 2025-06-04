const expressAsyncHandler=require('express-async-handler');
const bcrypt = reequire('bcrypt');
const body_parse=require('body-parser');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');  
const path=require("path");  
const Users=require('./models/user'); 
const  connection  = require("mongoose"); 
require('dotenv').config();

const signin= expressAsyncHandler(async(req,res)=>{
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

const signup=expressAsyncHandler(async(req,res)=>{
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

module.exports=mainHandler;