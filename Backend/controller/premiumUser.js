
const User = require('../models/userData');

const Expense = require('../models/Expense');

const sequilize = require('../utils/dataStore')



exports.showLeaderBoard = async(req,res)=>{

    const leaderboard = {}
        
    const Expenses = await Expense.findAll();

    const Users = await User.findAll();

    Expenses.forEach((expense)=>{

        if(leaderboard[expense.userId]){
            leaderboard[expense.userId]=  leaderboard[expense.userId]+ expense.amount;
        }
        else{
            leaderboard[expense.userId]=expense.amount;
        }
        

    })
    const userLeaderBoard=[];
    Users.forEach((user)=>{

        userLeaderBoard.push({Name:user.Name , total_cost:leaderboard[user.id]});

    })

    userLeaderBoard.sort((a,b)=>b.total_cost-a.total_cost);

    console.log(userLeaderBoard);

    res.status(200).json(userLeaderBoard);

    
    

}