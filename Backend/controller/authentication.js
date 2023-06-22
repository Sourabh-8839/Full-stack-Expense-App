
const bcrypt = require('bcrypt');
const User =require('../models/userData');


function isStringVaild(string){

    if(string==undefined||string.length==0){
        return true;
    }
    else{
        return false;
    }
};




exports.addUser = async(req,res)=>{

try {
    const {Name,email,password}= req.body;

    if(isStringVaild(Name)||isStringVaild(email)||isStringVaild(password)){
        return res.status(400).json({error:'Bad Request , Something is missing'})
    }

    bcrypt.hash(password,10,async(err,hash)=>{

        const p= await  User.create({
            Name:Name,
            email:email,
            password:hash,
    });

    res.status(201).json({message:'Successfully Registerd'});
    })
  
    
} catch (error) {

    res.status(403).json(error)
    
}    
 };


exports.loginUser =async(req,res)=>{

    // console.log(req.body);

    try {
        const {email,password}=req.body;

        const user= await User.findAll({where:{
            email:email,
        }});
    
    
        if(user.length>0){
            
            bcrypt.compare(password,user[0].password,async(err,result)=>{
    
    
                if(err){
                    throw new Error('Something Went Wrong');
                }
    
    
                if(result===true){
                    return  res.status(200).json({msg:'succesfully Login'});
                }
                else{
                    return  res.status(401).json({msg:'incorrect Password'});
                }
              
            })
        }
        else{
            return res.status(404).json({msg:'User Not Exist'});
        }

    } catch (error) {
        res.status(500).json({msg:error,success:false});
    }
   
    
    }
     


 
       

   


