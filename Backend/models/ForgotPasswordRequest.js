const mongoose = require('mongoose');

const ForgotPasswordSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  uuid: String,
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
