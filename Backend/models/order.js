
const sequelize = require('../utils/dataStore');

const Sequelize = require('sequelize');


const Orders = sequelize.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    Status:Sequelize.STRING,
}
)


module.exports=Orders;


