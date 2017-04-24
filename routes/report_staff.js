var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('report_staff', { title: 'Report', user_val: req.user.username, notfound_str: '' });
});

module.exports = router;
