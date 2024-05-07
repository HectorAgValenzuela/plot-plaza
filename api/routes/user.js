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

module.exports = router;