const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');

//route for api

router.get('/read/events', isAuthenticated, (req, res) => {
    req.pool.getConnection(function(err,connection) {
      if (err) {
      res.sendStatus(500);
      return;
      }

      connection.query(`SELECT * FROM Event`, (error, results) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.json(results);
      });
    });
});

router.get('/read/users', isAuthenticated, (req, res) => {
req.pool.getConnection(function(err,connection) {
    if (err) {
    res.sendStatus(500);
    return;
    }
    connection.query(`SELECT * FROM User`, (error, results) => {
    if (error) {
        return res.status(500).send(error);
    }
    res.json(results);
    });
});
});


router.post('/create/events', isAuthenticated, (req, res) => {
req.pool.getConnection(function(err,connection) {
    if (err) {
    res.sendStatus(500);
    return;
    }
    const data = req.body;
    console.log(req.body);
    const sql = "INSERT INTO event (name, location, date, description) VALUES (?, ?, ?, ?)";
    connection.query(sql, [data.Name, data.Location, data.Date, data.Description], (error, results, fields) => {
    if (error) throw res.send(res.body);
    res.send('Data inserted');
    });
});
});


router.get('/get/user', isAuthenticated, (req, res) => {
req.pool.getConnection(function(err,connection) {
    if (err) {
    res.sendStatus(500);
    return;
    }
    connection.query(`SELECT * FROM USER`, (error, results) => {
    if (error) {
        return res.status(500).send(error);
    }
    res.json(results);
    });
});
});


module.exports = router;