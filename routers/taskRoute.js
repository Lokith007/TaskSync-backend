const express=require('express');
const taskhandler=require('../routeHandlers/taskHandler');
const taskrouter=express.Router();

taskrouter.post('/setRemainder',taskhandler.setRemainder);
taskrouter.put('/subscribe'.taskhandler.subscribe);