var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('course_prof', { title: 'Courses Manager' });
});

module.exports = router;
