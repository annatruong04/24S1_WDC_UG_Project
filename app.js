var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
const session = require('express-session');
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
  saveUninitialized: false
}));

// Create a connection object
const dbConnectionPool = mysql.createPool({
  database: 'volunteer', // the name of the database you want to connect to
});

app.use(function(req,res,next){
  req.pool = dbConnectionPool;
  next();
});

app.use(function(req,res,next){
  console.log("Current user: " + req.session.user.username);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Import routes for auth
const authRoutes = require('./routes/authentication');
const pageRoutes = require('./routes/pages');
const apiRoute = require('./routes/api');

// Use routes for auth
app.use('/api', apiRoute);
app.use('/auth', authRoutes);
app.use('/', pageRoutes);


app.listen(3000, () => {
  console.log("app is listening on http://localhost:3000");
});

module.exports = app;


