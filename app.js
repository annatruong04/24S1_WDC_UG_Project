var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
const session = require('express-session');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
  saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landingPage.html'));
});

app.use('/', indexRouter);

app.use('/users', usersRouter);


// Create a connection object
const connection = mysql.createConnection({
  database: 'volunteer', // the name of the database you want to connect to
});

// Connect to the database
connection.connect(error => {
  if (error) {
    console.error('An error occurred while connecting to the database:', error);
    return;
  }

  console.log('Connected to the database successfully.');
});

app.get('/api/read/events', (req, res) => {
  connection.query(`SELECT * FROM Event`, (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('/api/read/users', (req, res) => {
  connection.query(`SELECT * FROM User`, (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});


app.post('/api/create/events', (req, res) => {
  const data = req.body;
  console.log(req.body);
  const sql = "INSERT INTO event (name, location, date, description) VALUES (?, ?, ?, ?)";
  connection.query(sql, [data.Name, data.Location, data.Date, data.Description], (error, results, fields) => {
    if (error) throw res.send(res.body);
    res.send('Data inserted');
  });
});


app.get('/api/get/user', async (req, res) => {
  try {
    connection.query(`SELECT * FROM USER`, (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});



app.listen(3000, () => {
  console.log("app is listening on http://localhost:3000");
});

module.exports = app;


