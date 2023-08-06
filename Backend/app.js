

const express = require('express');

const app = express();

const sequelize = require('./utils/dataStore');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const Cors = require('cors');

const User = require('./models/userData');
const Expense = require('./models/Expense');
const Order = require('./models/order');
const ForgotPassword = require('./models/ForgotPasswordRequest');


const resetpassword = require('./routes/resetpassword');




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(Cors());

app.use(routes);

app.use(resetpassword);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);



sequelize.sync().
then(()=>{
    app.listen(4000);
}).
catch(err=>console.log(err));
