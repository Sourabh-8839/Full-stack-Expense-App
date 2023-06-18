
const Sequelize = require('sequelize');

const sequelize = require('../utils/dataStore');

const User = sequelize.define('user',{
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },

    password :{
        type:Sequelize.STRING,
        allowNull:false,

    }
});

module.exports =User;
