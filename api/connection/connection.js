const mysql = require("mysql");
const { HOST, USER, PASS, DATABASE } = require("../../config");

const dbConnection = mysql.createConnection( {
    host: HOST,
    user: USER,
    password: PASS,
    database: DATABASE
} );

dbConnection.connect( (error) => {
    if( error ) {
        console.log(error);
    } else {
        console.log("Database Connected")
    }
} );

module.exports = dbConnection;