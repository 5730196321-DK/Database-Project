var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('grade_std', { title: 'Grade Report' });
});

module.exports = router;
