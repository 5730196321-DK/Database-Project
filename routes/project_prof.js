var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('project_prof', { title: 'Projects List' });
});

module.exports = router;
