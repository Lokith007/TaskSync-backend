const mongoose=require("mongoose");
const express=require("express");
const { type } = require("os");
const app=express();
app.use(express.json());

const connection=mongoose.connect("mongodb://localhost:27017/TaskSync");

connection.then(()=>{
    console.log("Connected to MongoDB");
}).catch(()=>{
    console.log("Failed to connect to MongoDB");
})


const userSchema=new mongoose.Schema({
    UserId:{
        type:Number,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true
    }
})