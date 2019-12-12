const express = require('express');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = new express();

app.use(express.static(path.join(__dirname,'/public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const signupRouter = require('./src/routes/singupRoutes')();
const loginRouter = require('./src/routes/loginRoutes')();

app.use('/signup',signupRouter);
app.use('/login',loginRouter);

mongoose.connect("mongodb://localhost:27017/FBMS");

app.listen(process.env.PORT || 3000, function() {
    console.log("Listening to" +chalk.blue(" 3000"));
});