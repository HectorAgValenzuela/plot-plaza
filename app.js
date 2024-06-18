const express = require("express");
const app = express();
// body-parser middleware that allow us to analyze HTTP requests
const bodyParser = require('body-parser');
const cors = require('cors');

// extended: false means that we analyze data from a string or matrix, not an object
app.use(bodyParser.urlencoded({extended: false}));

// add the functionality to analyze JSON bodies
app.use(bodyParser.json());

app.use(cors());

// ROUTES

// Users Route
const userRoute = require('./api/routes/user');
app.use('/user', userRoute);

module.exports = app;
