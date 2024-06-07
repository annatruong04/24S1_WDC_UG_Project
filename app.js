var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
const session = require('express-session');

const fs = require('fs');
require('dotenv').config();

const cors = require('cors');

var app = express();


// view engine setup
app.use(cors());
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  secure: false
}));

// Create a connection object
const dbConnectionPool = mysql.createPool({
  database: 'volunteer', // the name of the database you want to connect to
});

dbConnectionPool.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("database connected");
});


if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(function (req, res, next) {
  req.pool = dbConnectionPool;
  req.session.firstname = 'a';
    req.session.lastname = 'a';
    req.session.userID = 8; // Simulate user ID
    req.session.username = 'testing';
    req.session.name = 'a a';
    req.session.role = 'User';
    req.session.email = 'k@gmail.com';
    req.session.phonenum = '0';
  next();
});

// Multer configuration

// add branch id into session
app.use(function (req, res, next) {
  if (req.session.username) {
    if (!req.session.BranchID) {
      req.pool.getConnection(function (err, connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT BranchID FROM User_Branch WHERE User_ID = ?;';
        connection.query(query, [req.session.userID], (error, results) => {
          connection.release();
          if (error) {
            return res.status(401).send(error);
          }
          if (results.length === 0) {
            next();
          } else {
            console.log("Add BranchID successfully: " + results[0].BranchID);
            var BranchID_arr = [];
            for (let i = 0; i < results.length; i++) {
              BranchID_arr.push(results[i].BranchID);
            }
            // console.log(BranchID_arr);
            req.session.BranchID = BranchID_arr;
            next();
          }
        });
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


app.use(function (req, res, next) {
  console.log("Current user: " + req.session.name);
  if (req.session.BranchID) console.log("Branch ID: " + req.session.BranchID[0]);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Import routes for auth
const authRoutes = require('./routes/authentication');
const pageRoutes = require('./routes/pages');
const apiRoute = require('./routes/api');

// Use routes for auth
app.use('/', pageRoutes);
app.use('/api', apiRoute);
app.use('/auth', authRoutes);


app.listen(3000, () => {
  console.log("app is listening on http://localhost:3000");
});

module.exports = app;


