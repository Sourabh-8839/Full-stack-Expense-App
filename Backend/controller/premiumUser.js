
const User = require('../models/userData');

const Expense = require('../models/Expense');

const sequelize = require('../utils/dataStore');
const { Sequelize } = require('sequelize');



exports.showLeaderBoard = async(req,res)=>{

    //using Join 
    // const leaderboardOfUser= await User.findAll({

    //     attributes:['Name','id',[Sequelize.fn('sum',Sequelize.col('amount')),'total_cost']],
    //     include:[
    //         {
    //             model:Expense,
    //             attributes:[],
    //         }
    //     ]
    //     ,
    //     group:['user.id'],
    //     order:[[Sequelize.col('total_cost'),"DESC"]]

    // });

    //Optimize method to get leaderboard

    const leaderboardOfUser= await User.findAll(
        {
            attributes:['Name','id','TotalExpense'],
        }
    )
        

    

    console.log(leaderboardOfUser);

    res.status(200).json(leaderboardOfUser);

    
    

}