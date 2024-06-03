const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');

//route for api

router.get('/read/events', (req, res) => {
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

router.get('/read/events', (req, res) => {
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

router.get('/read/branches',(req, res) => {
  req.pool.getConnection(function(err,connection) {
    if (err) {
    res.sendStatus(500);
    return;
    }

    connection.query(`SELECT * FROM Branch`, (error, results) => {
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
    connection.query(`SELECT u.User_ID, u.Username, u.First_name, u.Last_name, u.Email, R.Role_name, u.Phone_number FROM User u inner join Role R on u.Role_ID = R.RoleID JOIN User_Branch ub ON u.User_ID = ub.User_ID JOIN Branch b ON ub.BranchID = b.BranchID WHERE b.Manager_ID = ?;`, [req.session.userID], (error, results) => {
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
      connection.query(`Delete from User_Branch where User_ID = ?`, [req.body.userID], (error, results) => {
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