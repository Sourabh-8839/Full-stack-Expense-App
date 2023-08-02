
const expense = require('../models/Expense');
const User = require('../models/userData');

const sequelize = require('../utils/dataStore');


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

    const t = await sequelize.transaction();

    try {
        const {amount,description,category,userId} = req.body;

        
            const p= await expense.create({
                amount:amount,
                description:description,
                category:category,
                userId:userId
            },{transaction:t});
    
             await User.update(
                {TotalExpense:+amount},
                {where:{
                    id:userId},
                transaction:t });

      
                await t.commit();
                res.status(200).json(p);

            }

     catch  (error){

        await t.rollback();
        res.status(500).json(error);
    }
}

    

exports.deleteDetails =async(req,res)=>{
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const {userId} = req.body;

        

    const amount=await expense.destroy({where:{
        id:id
    }},{transaction:t});

    console.log(amount);
     
    await User.update(
        {TotalExpense:-amount},
        {whre:{
            id:userId} });

    await t.commit();
    res.send(amount)
    } catch (error) {
        
        await t.rollback();
        res.send(error);
    }
    

}