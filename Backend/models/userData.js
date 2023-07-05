
const Sequelize = require('sequelize');

const sequelize = require('../utils/dataStore');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
     
    },

    password :{
        type:Sequelize.STRING,
        allowNull:false,

    },
    isPremiumUser:Sequelize.BOOLEAN,
    
});

module.exports =User;
