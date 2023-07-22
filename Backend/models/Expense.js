
const Sequelize = require('sequelize');

const sequelize = require('../utils/dataStore');


const Expense = sequelize.define('expense',{

    amount:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    description:Sequelize.STRING,
    
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
});


module.exports= Expense;