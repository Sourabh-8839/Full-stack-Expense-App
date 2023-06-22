
const express=require('express');

const router = express.Router();

const controllerAuthentication = require('../controller/authentication');

const expenseController=require('../controller/expense');

// router.get('/user/signup',controller.getUser);

router.post('/user/signup',controllerAuthentication.addUser);

router.post('/user/login',controllerAuthentication.loginUser);

//for Data 
router.get('/expense/getDetails',expenseController.getDetails);
router.post('/expense/sentDetails',expenseController.sentDeatails);
router.post('/expense/deleteDetails/:id',expenseController.deleteDetails);

module.exports=router;
