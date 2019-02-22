var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', {title: 'Admin Page'});
});
router.get('/dashboardlogin', function(req, res, next) {
  res.render('dashboardlogin', {title: 'Login Page'});
});

module.exports = router;
