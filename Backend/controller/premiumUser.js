
const User = require('../models/userData');

const Expense = require('../models/Expense');

const sequelize = require('../utils/dataStore');
const { Sequelize } = require('sequelize');



exports.showLeaderBoard = async(req,res)=>{

    const leaderboardOfUser= await User.findAll({

        attributes:['Name','id',[Sequelize.fn('sum',Sequelize.col('amount')),'total_cost']],
        include:[
            {
                model:Expense,
                attributes:[],
            }
        ]
        ,
        group:['user.id'],
        order:[[Sequelize.col('total_cost'),"DESC"]]

    });

    // const userLeaderBoard=[];
    // Users.forEach((user)=>{

    //     userLeaderBoard.push({Name:user.Name , total_cost:leaderboard[user.id]});

    // })

    // userLeaderBoard.sort((a,b)=>b.total_cost-a.total_cost);

    console.log(leaderboardOfUser);

    res.status(200).json(leaderboardOfUser);

    
    

}