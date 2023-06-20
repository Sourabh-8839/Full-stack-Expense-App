
const express=require('express');

const router = express.Router();

const controller = require('../controller/authentication');

// router.get('/user/signup',controller.getUser);

router.post('/user/signup',controller.addUser);

router.post('/user/login',controller.loginUser);

module.exports=router;
