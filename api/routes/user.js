const { ACCESS_TOKEN } = require("../../config/config");

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const dbConnection = require('../connection/connection');

router.get('/', (req, res) => {
    dbConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });
});

router.post('/signup', (req, res)  => {
    let user = req.body;
    // Creating the query to search if the user exists
    let query = 'SELECT username, email, password, first_name, last_name, role FROM user where email=?';
    dbConnection.query(query, [user.email], 
        (err, results) => {
            // We check if there is any error.
            if( err ) {
                return res.status(500).json(err);
            } 
            // if it finds the user, then we exit
            if( results.length !== 0 ) {
                return res.status(400).json({ message: "The account already exists" });
            } 

            // There is no user, then we create it.
            query = 'INSERT INTO user(username, email, password, first_name, last_name, role) VALUE (?,?,?,?,?,"user")';
            dbConnection.query(query, [user.username, user.email, user.password, user.first_name, user.last_name], 
                (err, results) => {
                    if( err ) {
                        return res.status(400).json( err );
                    }
                    return res.status(200).json({ message: "Account Successfully created!" });
                });     
        });
});

router.post('/login', (req, res) => {
    const user = req.body;

    let query = "SELECT email, password, role FROM user WHERE email=?"
    dbConnection.query(query, [user.email], 
        (err, results) => {
            // We check if there is any error.
            if( err ) {
                return res.status(500).json(err);
            } 
            // Checking if there are results in the query and the password is correct
            if( results.length === 0 || results[0].password !== user.password ) {
                return res.status(401).json({ message: "Incorrect username or password" });
            }

            // We found the user and the password is correct, then we create a token
            try {
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign( response, ACCESS_TOKEN, { expiresIn: '8h' } );
                console.log( accessToken );
                return res.status(200).json({ token: accessToken });
            } catch (e) {
                return res.status(500).json({ e });
            }
        });
});

module.exports = router;