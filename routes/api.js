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
        connection.release();
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
      connection.release();
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
      connection.release();
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
      connection.release();
    if (error) {
        return res.status(500).send(error);
    }
    res.json(results);
    });
});
});

router.post('/delete/user', isAuthenticated, (req, res) => {
  req.pool.getConnection(function(err,connection) {
      if (err) {
        console.log(err);
      res.sendStatus(500);
      return;
      }
      connection.query(`SET FOREIGN_KEY_CHECKS = 0; delete from User where Username = ?; SET FOREIGN_KEY_CHECKS = 1;`, [req.body.username], (error, results) => {
        connection.release();
      if (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      res.sendStatus(200);
      });
  });
  });


module.exports = router;