const mongoose = require('mongoose');

const ForgotPasswordSchema = mongoose.Schema({
  uuid: String,
  userId: mongoose.Schema.Types.ObjectId,

  isActive: Boolean,
});

const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema);

module.exports = ForgotPassword;

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/dataStore');

// const ForgotPassword = sequelize.define('ForgotPassword',{

//     id:{
//        type: Sequelize.STRING,
//        primaryKey:true
//     },
//     userId:Sequelize.INTEGER,
//     isActive:Sequelize.BOOLEAN,
// })
