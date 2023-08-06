
const Sequelize = require('sequelize');
const sequelize = require('../utils/dataStore');

const ForgotPassword = sequelize.define('ForgotPassword',{

    id:{
       type: Sequelize.STRING,
       primaryKey:true
    },
    userId:Sequelize.INTEGER,
    isActive:Sequelize.BOOLEAN,
})


module.exports=ForgotPassword;