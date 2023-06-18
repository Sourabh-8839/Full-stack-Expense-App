

const User =require('../models/userData');

exports.addUser = async(req,res)=>{

try {
    const {Name,email,password}= req.body;
    // console.log(uName);
    const p= await  User.create({
                Name:Name,
                email:email,
                password:password,
        });

        res.send(p);
    
} catch (error) {

    res.send(error);
    
}    
        }
       

   


