var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Login-Page',
    style: 'home.css',
    
   });
   
});

module.exports = router;
