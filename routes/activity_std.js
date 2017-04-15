var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('activity_std', { title: 'Activities List' });
});

module.exports = router;
