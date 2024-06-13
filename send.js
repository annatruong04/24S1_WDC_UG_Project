var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
const session = require('express-session');
const nodemailer = require('nodemailer');



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




const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'kieuduc2505@gmail.com' ,
    pass: 'euoj kppd hfpe dxfv',
  },

});

const to = [ "khanhnamld@gmail.com", 'thaotruong090604@gmail.com']

const mailOptions = {
  from: {
    name: "Testing the email nodemailer",
    address: "kieuduc2505@gmail.com"
  },
  to: ["kieuduc2505@gmail.com",
],
  subject: "send email using nodemailder and gmail...",
  text: "hello world why cant i show this",
  html: "<b>hello world pasldfjasdlkf</b>",
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Call the sendMail function
sendMail(transporter, mailOptions);

