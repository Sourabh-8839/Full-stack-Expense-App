
const { where } = require('sequelize');
const expense = require('../models/Expense');
const User = require('../models/userData');


exports.getDetails =async(req,res)=>{

    try {

        const userId= req.user.id;

        const user=await expense.findAll({where:{
            userId:userId
        }});


    res.send(user);

    } catch (error) {
        
        console.log(error);
        res.send(error);
    }
    

}

exports.sentDetails =async(req,res)=>{

    try {
        const {amount,description,category,userId} = req.body;

        
        User.increment(
            {TotalExpense:+amount},
            {where:{
                id:userId
                } })
   const p= await expense.create({
        amount:amount,
        description:description,
        category:category,
        userId:userId
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