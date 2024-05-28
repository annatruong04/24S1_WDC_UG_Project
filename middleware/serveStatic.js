const path = require('path');
const express = require('express');

function serveUserFiles(req, res, next) {
  if (req.session.username && req.session.role === 'User' || req.session.role === 'Administrator') {
    express.static(path.join(__dirname, '../views/user_page'))(req, res, next);
  } else {
    res.status(403).send('Access denied.');
  }
}

function serveAdminFiles(req, res, next) {
  if (req.session.username && req.session.role === 'Administrator') {
    express.static(path.join(__dirname, '../views/admin_page'))(req, res, next);
  } else {
    res.status(403).send('Access denied.');
  }
}

function serveManagerFiles(req, res, next) {
  if (req.session.username && req.session.role === 'Manager' || req.session.role === 'Administrator') {
    express.static(path.join(__dirname, '../views/manager_page'))(req, res, next);
  } else {
    res.status(403).send('Access denied.');
  }
}

module.exports = { serveUserFiles, serveAdminFiles, serveManagerFiles };
