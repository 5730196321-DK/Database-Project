var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile_std', { title: 'Profile Manager' });
});

module.exports = router;
