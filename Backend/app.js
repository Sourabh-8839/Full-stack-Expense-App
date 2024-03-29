const express = require('express');
const fs = require('fs');


const app = express();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const dotenv = require('dotenv');

dotenv.config();


const sequelize = require('./utils/dataStore');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const Cors = require('cors');

const User = require('./models/userData');
const Expense = require('./models/Expense');
const Order = require('./models/order');
const ForgotPassword = require('./models/ForgotPasswordRequest');


const resetpassword = require('./routes/resetpassword');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'}); 


//PortNumber
const PortNumber = process.env.Port_Number;

app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));

//for decoding data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(Cors());

//Calling Api
app.use(routes);

app.use(resetpassword);

//Joining Table
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);



sequelize.sync().
then(()=>{
    app.listen(PortNumber);
}).
catch(err=>console.log(err));
