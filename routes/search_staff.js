var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search_staff', { title: 'Search Student' });
});

module.exports = router;
