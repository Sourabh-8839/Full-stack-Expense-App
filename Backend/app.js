const express = require('express');
const fs = require('fs');


const app = express();

const compression = require('compression');


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

app.use(express.static(path.join(__dirname,`public`)));
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'}); 


//PortNumber
const PortNumber = process.env.Port_Number;


app.use(compression());


//for decoding data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(Cors());

//Calling Api
app.use(routes);

app.use(resetpassword);

// app.use((req,res)=>{
//     res.sendFile(path.join(__dirname,`public/${req.url}`));
// });

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
