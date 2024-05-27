const path = require('path');
const express = require('express');

function serveUserFiles(req, res, next) {
  if (req.session.user && req.session.user.role === 'User') {
    express.static(path.join(__dirname, '../views/user_page'))(req, res, next);
  } else {
    res.status(403).send('Access denied.');
  }
}

function serveAdminFiles(req, res, next) {
  if (req.session.user && req.session.user.role === 'Admin') {
    express.static(path.join(__dirname, '../views/admin_page'))(req, res, next);
  } else {
    res.status(403).send('Access denied.');
  }
}

function serveManagerFiles(req, res, next) {
  if (req.session.user && req.session.user.role === 'Manager') {
    express.static(path.join(__dirname, '../views/manager_page'))(req, res, next);
  } else {
    res.status(403).send('Access denied.');
  }
}

module.exports = { serveUserFiles, serveAdminFiles, serveManagerFiles };
