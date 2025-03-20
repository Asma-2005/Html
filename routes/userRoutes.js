const express=require('express');
const router=express.Router();
const controler=require('../controllers/userControlers');



//POST /signup
const singup=router.post('/singup',controler.signup);

//POST /signin
const signin=router.post('/signin',controler.signin);

//POST /signout
const signout=router.post('/signout',controler.signout);



module.exports=router;
