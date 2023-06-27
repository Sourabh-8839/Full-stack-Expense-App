
const express=require('express');

const router = express.Router();

const controllerAuthentication = require('../controller/authentication');

const expenseController=require('../controller/expense');

const UserAuthentication = require('../middleware/auth');


// router.get('/user/signup',controller.getUser);

router.post('/user/signup',controllerAuthentication.addUser);

router.post('/user/login',controllerAuthentication.loginUser);

//for Data 
router.get('/expense/getDetails',UserAuthentication.authentication,expenseController.getDetails);

router.post('/expense/sentDetails',UserAuthentication.checkUserIdentiy,expenseController.sentDetails);
router.post('/expense/deleteDetails/:id',expenseController.deleteDetails);

module.exports=router;
