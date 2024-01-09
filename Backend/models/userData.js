const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  isPremiumUser: Boolean,

  TotalExpense: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

// const Sequelize = require('sequelize');

// const sequelize = require('../utils/dataStore');

// const User = sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     Name:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true,

//     },

//     password :{
//         type:Sequelize.STRING,
//         allowNull:false,

//     },
//     isPremiumUser:Sequelize.BOOLEAN,

//     TotalExpense:{
//         type:Sequelize.INTEGER,
//         defaultValue:'0',
//     }
// });
