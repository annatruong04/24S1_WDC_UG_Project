var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
const session = require('express-session');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');



const fs = require('fs');
require('dotenv').config();

const cors = require('cors');



var app = express();
// view engine setup
app.use(bodyParser.json());

app.use(cors());
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());






// view engine setup


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  secure: false
}));

// Create a connection object
const dbConnectionPool = mysql.createPool({
  database: 'volunteer', // the name of the database you want to connect to
  multipleStatements: true
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



// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'kieuduc2505@gmail.com',
    pass: 'euoj kppd hfpe dxfv',
  },
});
// Route to send email




app.use(function (req, res, next) {
  req.pool = dbConnectionPool;
  // req.session.firstname = 'duc';
  //   req.session.lastname = 'Kieu';
  //   req.session.userID = 11; // Simulate user ID
  //   req.session.username = 'kieuduc2505@gmail.com';
  //   req.session.name = 'duc Kieu';
  //   req.session.role = 'User';
  //   req.session.email = 'kieuduc2505@gmail.com';
  //   req.session.phonenum = 'NULL';
  next();
});

// Multer configuration

// add branch id into session for manager
app.use(function (req, res, next) {
  if (req.session.username) {
    if (!req.session.BranchID && req.session.role === "Manager") {
      req.pool.getConnection(function (err, connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT BranchID FROM Branch WHERE Manager_ID = ?;';
        connection.query(query, [req.session.userID], (error, results) => {
          connection.release();
          if (error) {
            console.log(error);
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
    } else if (!req.session.BranchID) {
      req.pool.getConnection(function (err, connection) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        var query = 'SELECT BranchID From User_Branch WHERE User_ID = ?';
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
    }
    else next();
  } else {
    next();
  }
});

// app.post('/send-email', (req, res) => {

//   var to = [];
//   req.pool.getConnection(function (err, connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     connection.query(`SELECT u.Email FROM User_Branch ub INNER JOIN User u ON ub.User_ID = u.User_ID WHERE ub.BranchID = ?;
//     `,[req.session.BranchID[0]], (error, results) => {
//         connection.release();
//         if (error) {
//           return res.status(500).send(error);
//         }

// to = results.map(user => user.Email);

//         res.json(results);
//       });
//   });




//   const { Title, Message, Type } = req.body; // Destructure the form data from the request body

//   const mailOptions = {
//     from: {
//       name: "Testing the email nodemailer",
//       address: 'kieuduc2505@gmail.com'
//     },
//     to: to,
//     subject: `${Title}`,
//     text: `Title: ${Title}\nMessage: ${Message}\nType: ${Type}`, // Plain text version
//     html: `<p><strong>Message:</strong> ${Message}</p>` // HTML version
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       return res.status(500).send(error.toString());
//     }
//     res.send('Email sent: ' + info.response);
//   });
// });

app.post('/send-email', (req, res) => {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    connection.query(`SELECT u.Email
    FROM User_Branch ub
    INNER JOIN User u ON ub.User_ID = u.User_ID
    WHERE ub.BranchID = ? AND u.Receive_email = 1;
    `, [req.session.BranchID[0]], (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).send(error);
      }

      // Convert the results array of objects to an array of email strings
      var to = results.map(user => user.Email);

      const { Title, Message, Type } = req.body; // Destructure the form data from the request body

      const mailOptions = {
        from: {
          name: "Testing the email nodemailer",
          address: 'kieuduc2505@gmail.com'
        },
        to: to,
        subject: `${Title}`,
        text: `Title: ${Title}\nMessage: ${Message}\nType: ${Type}`, // Plain text version
        html: `<p><strong>Message:</strong> ${Message}</p>` // HTML version
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
      });
    });
  });
});

//add role for google login user
app.use(function(req,res,next){
  if (req.session.username) {
    if (!req.session.role) {
        req.pool.getConnection(function(err, connection) {
            if (err) {
                console.log("error");
                return;
            }

            var query = 'SELECT B.User_ID, B.Phone_number, B.Email, B.First_name, B.Last_name, B.Username, B.Password,   A.Role_name FROM Role AS A INNER JOIN User AS B ON A.RoleID = B.Role_ID WHERE B.Username = ?';

            connection.query(query, [req.session.username], async (error, results) => {
                connection.release();
                if (error) {
                    console.log("error");
                    return ;
                }

                if (results.length === 0) {
                  console.log("error");
                    return;
                }

                const user = results[0];
                console.log(user);
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
            });
        });
    }
  }
  next();
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
const { reset } = require('nodemon');

// Use routes for auth
app.use('/', pageRoutes);
app.use('/api', apiRoute);
app.use('/auth', authRoutes);


app.listen(3000, () => {
  console.log("app is listening on http://localhost:3000");
});

module.exports = app;


