const express = require('express');
const path = require('path');
const router = express.Router();

const argon2 = require('argon2');

const CLIENT_ID = '613277374446-c0gve4793drm7ensis45lgv036m6s503.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const { isAuthenticated } = require('../middleware/auth');
const client = new OAuth2Client(CLIENT_ID);

router.get('/getUser', function(req, res, next) {
    if (req.session.username) {
        if (!req.session.role) {
            req.pool.getConnection(function(err, connection) {
                if (err) {
                    res.sendStatus(500);
                    return;
                }

                var query = 'SELECT B.User_ID, B.Phone_number, B.Email, B.First_name, B.Last_name, B.Username, B.Password, A.Role_name FROM Role AS A INNER JOIN User AS B ON A.RoleID = B.Role_ID WHERE B.Username = ?';

                connection.query(query, [req.session.username], async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(401).send(error);
                    }

                    if (results.length === 0) {
                        return res.status(400).send('User not found');
                    }

                    const user = results[0];
                    req.session.firstname = user.First_name;
                    req.session.lastname = user.Last_name;

                    console.log(req.session.firstname + " " + req.session.lastname);

                    req.session.userID = user.User_ID;
                    req.session.role = user.Role_name;
                    req.session.name = user.First_name + ' ' + user.Last_name; // Assuming you want to set the name in session
                    req.session.phonenum = user.Phone_number;
                    req.session.email = user.Email;
                    req.session.username = user.Username;
                    req.session.password = user.Password;


                    res.status(200).send(JSON.stringify({
                        First_name: req.session.firstname,
                        Last_name: req.session.lastname,
                        Username: req.session.username,
                        Name: req.session.name,
                        Phone_num: req.session.phonenum,
                        Email: req.session.email,
                        Role: req.session.role,
                        Password: req.session.password,
                    }));
                });
            });
        } else {
            res.status(200).send(JSON.stringify({
                First_name: req.session.firstname,
                Last_name: req.session.lastname,
                Username: req.session.username,
                Name: req.session.name,
                Phone_num: req.session.phonenum,
                Email: req.session.email,
                Role: req.session.role,
                Password: req.session.password,

            }));
        }
    } else {
        res.sendStatus(401);
    }
});



router.post('/updateUser', function(req, res, next) {
    if (!req.session.username) {
        return res.sendStatus(401);
    }

    const { First_name, Last_name, Phone_number, Email, Password } = req.body;

    req.pool.getConnection(function(err, connection) {
        if (err) {
        res.sendStatus(500);
        return;
        }

        const query = 'UPDATE User SET First_name = ?, Last_name = ?, Phone_number = ?, Email = ?, Password = ? WHERE Username = ?';
        connection.query(query, [First_name, Last_name, Phone_number, Email, Password, req.session.username], function(error, results) {
        connection.release();
        if (error) {
            return res.status(500).send(error);
        }
        res.sendStatus(200);
        });
    });
});



router.get('/login', (req, res) => {
    if (req.session.username) {
        if (req.session.role == "Administrator") res.redirect("/admin/admin.html");
        else if (req.session.role == "Manager") res.redirect("/manager/Home.html");
        else if (req.session.role == "User") res.redirect("/");
    }
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});





router.post('/signup', function(req,res,next){
    const username = req.body.param1;
    const firstname = req.body.param2;
    const lastname = req.body.param3;
    const phonenum = req.body.param4;
    const su_email = req.body.param5;
    const su_password = req.body.param6;



    req.pool.getConnection(async function(err,connection) {
        if (err) {
        res.sendStatus(500);
        return;
        }
        const hash = await argon2.hash(su_password);

        var query = 'select Username from User where Username = ?';
        connection.query(query, [username], (error, results) => {
            connection.release();
            if (error){
                return res.status(401).send(error);
            }

            if (results.length === 0) {
                req.pool.getConnection(function(err,connection2) {
                    if (err) {
                        console.log("Database connection error" + error);
                        return res.sendStatus(401);
                    }
                    var query2 = `insert into User(Username, First_name, Last_name, Phone_number, Email, Role_ID, Password) values(?, ?, ?, ?, ?, '3', ?)`;
                    connection2.query(query2, [username, firstname, lastname, phonenum, su_email, hash], (error, results) => {
                        connection.release();
                        if (error){
                            console.log("Query error" + error);
                            return res.sendStatus(401);
                        }
                        console.log("Insert new user successfully");
                    });

                    return ;
                });

                return res.sendStatus(200);
            }
            else return res.sendStatus(400);
        });
    });
});

router.post('/login', async function(req, res,next){
    if('client_id' in req.body){
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        // If the request specified a Google Workspace domain:
        // const domain = payload['hd'];


        req.pool.getConnection(function(err,connection) {
            if (err) {
            res.sendStatus(500);
            return;
            }

            var query = 'select B.User_ID, B.Phone_number, B.Email, B.First_Name, B.Last_name, B.Username, B.Password, A.Role_name from Role as A inner join User as B on A.RoleID = B.Role_ID where B.Username = ?';
            connection.query(query, [payload['email']], (error, results) => {
                connection.release();
                if (error){
                    console.log("Query error" + error);
                    return ;
                }

                if (results.length === 0) {
                    req.pool.getConnection(function(err,connection2) {
                        if (err) {
                            console.log("Database connection error" + error);
                            return;
                        }
                        var query2 = `insert into User(Username, First_name, Last_name, Email, Role_ID, Password) values(?, ?, ?, ?, '3', '')`;
                        connection2.query(query2, [payload['email'], payload['given_name'], payload['family_name'], payload['email']], (error, results) => {
                            connection.release();
                            if (error){
                                console.log("Query error" + error);
                                return ;
                            }
                            console.log("Insert new google user successfully");
                        });
                    });
                }


            });
        });


        req.session.name = payload['name'];
        req.session.username = payload['email'];
        console.log(req.session);
        return res.sendStatus(200);
    }


    const username = req.body.param1;
    const password = req.body.param2;

    req.pool.getConnection(function(err,connection) {
        if (err) {
        res.sendStatus(500);
        return;
        }

        var query = 'select B.User_ID, B.Phone_number, B.Email, B.First_name, B.Last_name, B.Username, B.Password, A.Role_name from Role as A inner join User as B on A.RoleID = B.Role_ID where B.Username = ?';
        connection.query(query, [username], async (error, results) => {
            connection.release();
            if (error){
                return res.status(401).send(error);
            }

            if (results.length === 0) {
                return res.status(400).send('User not found');
            }

            const user = results[0];

            if (!await argon2.verify(user.Password, password)) {
                return res.status(400).send('Incorrect password');
            }

            // if (user.Password !== password) {

            // }

            console.log(user.First_name + " " +user.Last_name);

            req.session.firstname = user.First_name;
            req.session.lastname = user.Last_name;

            req.session.userID = user.User_ID;
            req.session.username = user.Username;
            req.session.name = user.First_name + " " + user.Last_name;
            req.session.role = user.Role_name;
            req.session.email = user.Email;
            req.session.phonenum = user.Phone_number;
            console.log(req.session);
            return res.send(req.session.role);
        });
    });

});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;