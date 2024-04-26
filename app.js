const express = require("express");
const mysql = require("mysql")

const { HOST, USER, PASS, DATABASE, PORT } = require("./config.js");

const app = express();

const db = mysql.createConnection( {
    host: HOST,
    user: USER,
    password: PASS,
    database: DATABASE
} );

db.connect( (error) => {
    if( error ) {
        console.log(error);
    } else {
        console.log("Database Connected")
    }
} );

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});