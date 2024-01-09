const mongoose = require('mongoose');

const Connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/sourabh');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting to the database:', error.message);
  }
};

module.exports = Connection;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER_NAME ,process.env.DB_PASSWORD,
//     {
//         dialect:'mysql',
//         host:process.env.DB_HOST,
//     }
// );

// module.exports =sequelize;
