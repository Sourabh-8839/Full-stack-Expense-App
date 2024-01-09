const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: String,

  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Expense = mongoose.model('expense', ExpenseSchema);

module.exports = Expense;

// const Sequelize = require('sequelize');

// const sequelize = require('../utils/dataStore');

// const Expense = sequelize.define('expense',{

//     amount:{
//         type:Sequelize.INTEGER,
//         allowNull:false

//     },
//     description:Sequelize.STRING,

//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });
