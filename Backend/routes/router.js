
const express=require('express');

const router = express.Router();

const controller = require('../controller/authentication');

// router.get('/user/signup',controller.getUser);

router.post('/user/signup',controller.addUser);


module.exports=router;
