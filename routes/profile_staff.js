var express = require('express');
var router = express.Router();

// mySQL connection
var app = require('../app');
var mysql = require('mysql');
var connection = mysql.createConnection(app.options);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user.username.length <= 3) { res.redirect('/unauthorized'); return; }
  connection.query('SELECT *,DATE_FORMAT(bdate, \'%d/%m/%Y\') AS bdate2 FROM Staff JOIN Postalcode ON Staff.district = Postalcode.district WHERE ssn = \'' + req.user.username + '\';'  , function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results)
    res.render('profile_staff', {
      title: 'Profile Manager',
      user_val: req.user.username,
      results: results
    });
  })
});

module.exports = router;
