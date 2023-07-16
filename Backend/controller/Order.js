
const RazorPay = require('razorpay');

const Order = require('../models/order');

require('dotenv').config();

const jwt = require('jsonwebtoken');

// async function generateToken(id,name,isPremiumUser){

//     const secretKey='sourabh@8839'
//     return jwt.sign({userId:id,name:name,isPremiumUser},secretKey);
// }

require('dotenv').config();


exports.purchaseMemberShip = async(req,res)=>{

    
    try {  
      console.log(process.env.RAZORPAY_KEY_ID);
        const rzp = new RazorPay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret :process.env.RAZORPAY_SECRET_KEY
        })


        const amount = 2000;
        const order = await rzp.orders.create({amount,currency:"INR"});
        
        await req.user.createOrder({orderid:order.id,status:'PENDING'});

        return res.status(201).json({order,key_id:rzp.key_id});

    } catch (error) {
        
        console.log(error);
       return res.status(403).json({message:"Something Went wrong"});
        
    }
 
}


exports.updateMember =async(req,res)=>{
   
    try {

        console.log(req.user);
        const userId = req.user.id;
        const{order_id,payment_id} = req.body;

        const order=await Order.findOne({where:{
            orderid:order_id
        }});

        // console.log(order);

        await order.update({paymentid:payment_id,status:'SUCESSFULL'});
    
        req.user.update({isPremiumUser:true});

        
    
        return res.status(202).json({success:true,message:'Transaction Successfull',token:jwt.sign({userId:userId,isPremiumUser: req.user.isPremiumUser},process.env.JWT_SECRETKEY)});
    } 
    catch (error) {
        
        console.log(error);
        res.status(405).json({success:false,message:error});

       
    }
   

}


