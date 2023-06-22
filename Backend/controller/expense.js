
const expense = require('../models/Expense');


exports.getDetails =async(req,res)=>{

    try {
        const users=await expense.findAll();

    res.send(users);
    } catch (error) {
        
        res.send(error);
    }
    

}

exports.sentDeatails =async(req,res)=>{

    try {
        const {amount,description,category} = req.body;

   const p= await expense.create({
        amount:amount,
        description:description,
        category:category
    });

    res.send(p);
    } catch (error) {
        
        res.send(error);
    }

}

exports.deleteDetails =async(req,res)=>{

    try {
        const id = req.params.id;

    await expense.destroy({where:{
        id:id
    }})

    res.send('delete Successfully');
    } catch (error) {
        
        res.send(error);
    }
    

}