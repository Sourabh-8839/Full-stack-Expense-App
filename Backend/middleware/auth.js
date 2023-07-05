
const jwt=require('jsonwebtoken');
const Users =require('../models/userData');


const authentication = async(req,res,next)=>{

    try {
        const token = req.header('Authorization');

        const userData = await jwt.verify(token,'sourabh@8839');

        const userId =userData.userId;

       const user=await Users.findByPk(userId);

       req.user = user;

       next()

    } catch (error) {
        return res.status(401).json({success:false});
    }
  

}

const checkUserIdentiy =async(req,res,next)=>{
    try {
        const {userId}= req.body;
        const userData = await jwt.verify(userId,'sourabh@8839');

        const userID = userData.userId;
        req.body.userId=userID;
        next();
    } catch (error) {
        
        console.log(error);
    }
}

module.exports = {
    authentication,
    checkUserIdentiy
};