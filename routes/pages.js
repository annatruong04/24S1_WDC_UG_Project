const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');
const { serveUserFiles, serveAdminFiles, serveManagerFiles } = require('../middleware/serveStatic');
const { userInfo } = require('os');


// Route for admin page (protected)
router.use('/admin', isAuthenticated, serveAdminFiles);

// Route for manager page (protected)
router.use('/manager', isAuthenticated, serveManagerFiles);
router.use('/manager/event-description.html', isAuthenticated, function(req,res){

});

// Route for user files (protected)
router.use('/user', isAuthenticated, serveUserFiles);

// Route for home page (non-login users)
router.get('/', (req, res) => {
    if(!req.session.username) res.sendFile(path.join(__dirname, '../public', 'landingPage.html'));
    else res.sendFile(path.join(__dirname, '../views/user_page', 'landingPage.html'));
});


module.exports = router;