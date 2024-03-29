
const express=require('express');

const router = express.Router();

const controllerAuthentication = require('../controller/authentication');

const expenseController=require('../controller/expense');

const orderController= require('../controller/Order');

const UserAuthentication = require('../middleware/auth');

const leaderboard = require('../controller/premiumUser');




//User details 
router.post('/user/signup',controllerAuthentication.addUser);

router.post('/user/login',controllerAuthentication.loginUser);

//Download

router.get('/user/download',UserAuthentication.authentication,expenseController.download);

// paginataion

router.get('products/page?=page',UserAuthentication.authentication,)


//For Expense
router.get(`/expense/getDetails/:Item_Per_Page`,UserAuthentication.authentication,expenseController.getDetails);

router.post('/expense/sentDetails',UserAuthentication.checkUserIdentiy,expenseController.sentDetails);
router.delete('/expense/deleteDetails/:id',expenseController.deleteDetails);

//For Orders
router.get('/purchase/premiummembership',UserAuthentication.authentication,orderController.purchaseMemberShip);
router.post('/purchase/updateTransaction',UserAuthentication.authentication,orderController.updateMember);

//for premiumuser
router.get('/premium/showLeaderboard',UserAuthentication.authentication, leaderboard.showLeaderBoard)


module.exports=router;


