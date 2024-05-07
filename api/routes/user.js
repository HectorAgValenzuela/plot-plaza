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

// the singin POST method
router.post('/singin', (req, res) => {
    const { username, password } = req.body;

    dbConnection.query('SELECT username, role FROM USER WHERE username=? AND password=?',
        [username, password],
        (err, rows, fields) => {
            if(!err) {
                console.log(rows);
            } else {
                console.log(err);
            }
        }
    )
})

module.exports = router;