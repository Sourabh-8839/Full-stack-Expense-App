

const express = require('express');

const app = express();

const sequelize = require('./utils/dataStore');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const Cors = require('cors');



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(Cors());

app.use(routes);



sequelize.sync().
then(()=>{
    app.listen(4000);
}).
catch(err=>console.log(err));
