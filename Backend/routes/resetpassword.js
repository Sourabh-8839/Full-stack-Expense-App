const express=require('express');

const router = express.Router();

const EmailVerification = require('../controller/verification');

//Forgot Password
router.get('/password/resetpassword/:id',EmailVerification.resetpassword);

router.get('/password/updatepassword/:resetId',EmailVerification.updatepassword);

router.use('/password/forgotpassword',EmailVerification.forgotPassword);


module.exports=router;