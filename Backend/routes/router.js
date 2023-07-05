
const express=require('express');

const router = express.Router();

const controllerAuthentication = require('../controller/authentication');

const expenseController=require('../controller/expense');

const orderController= require('../controller/Order');

const UserAuthentication = require('../middleware/auth');



//User details 
router.post('/user/signup',controllerAuthentication.addUser);

router.post('/user/login',controllerAuthentication.loginUser);

//For Expense
router.get('/expense/getDetails',UserAuthentication.authentication,expenseController.getDetails);

router.post('/expense/sentDetails',UserAuthentication.checkUserIdentiy,expenseController.sentDetails);
router.post('/expense/deleteDetails/:id',expenseController.deleteDetails);

//For Orders
router.get('/purchase/premiummembership',UserAuthentication.authentication,orderController.purchaseMemberShip);
router.post('/purchase/updateTransaction',UserAuthentication.authentication,orderController.updateMember);

module.exports=router;
