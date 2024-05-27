const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.post('/login', (req, res) => {
    const username = req.body.param1;
    const password = req.body.param2;
    req.pool.getConnection(function(err,connection) {
        if (err) {
        res.sendStatus(500);
        return;
        }
        var query = 'select B.User_ID, B.Username, B.Password, A.Role_name from Role as A inner join User as B on A.RoleID = B.Role_ID where B.Username = ?';
        connection.query(query, [username], (error, results) => {
            if (error){
                return res.status(401).send(error);
            }

            if (results.length === 0) {
                return res.status(400).send('User not found');
              }

            const user = results[0];

            if (user.Password !== password) {
                return res.status(400).send('Incorrect password');
            }

            console.log("Login successful");

            req.session.user = {
                id: user.User_ID,
                username: user.Username,
                role: user.Role_name,
            };
            res.redirect("/");
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;