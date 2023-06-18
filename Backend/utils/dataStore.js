
const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense','root','Sourabh8839',
    {
        dialect:'mysql',
        host:'localhost',
    }
);

module.exports =sequelize;
