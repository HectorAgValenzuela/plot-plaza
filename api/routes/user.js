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

    // Creando query. Acá se validará si el usuario ya existe
    let query = 'SELECT username, email, password, first_name, last_name, role FROM user where email=?';
    dbConnection.query(query, [user.email], 
        (err, rows, fields) => {
            if( !err ) {
                if( rows.length <= 0 ) {
                    query = 'INSERT INTO user(username, email, password, first_name, last_name, role) VALUE (?,?,?,?,?,"user")';
                    dbConnection.query(query, [user.username, user.email, user.password, user.first_name, user.last_name], 
                        (err, rows, fields) => {
                            if(!err) {
                                return res.status(200).json({ message: "Account Successfully created!"} );
                            }
                            return res.status(400).json( err );
                        });
                } else {
                    return res.status(400).json({ message: "The account already exists" });
                }
            } else {
                return res.status(500).json(err);
            }
    });

} );

module.exports = router;