var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingPage', { title: 'Express' });
});


router.get('/manager.html', function(req,res,next){
  res.sendFile(path.join(__dirname, 'public', 'manager_page', 'Home.html'));
});

router.get('/event-description.html', function(req,res,next){
  res.render('description', {title: 'manager'});
});

router.get('/login.html', function(req,res,next){
  res.render('description', {title: 'login'});
});

router.get('/profile.html', function(req,res,next){
  res.render('description', {title: 'description'});
});

router.get('/admin.html', function(req,res,next){
  res.render('description', {title: 'admin'});
});

router.get('/admin-users.html', function(req,res,next){
  res.render('description', {title: 'admin-user'});
});

router.get('/landingPageForManager.html', function(req,res,next){
  res.render('description', {title: 'manager'});
});

module.exports = router;
