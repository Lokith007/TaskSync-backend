const express=require('express');
const handler=require('../routeHandlers/mainHandler');
const router=express.Router();

router.post('/sign-in',handler.signin);
router.post('/signup',handler.signup);
