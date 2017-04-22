var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('download_prof', { title: 'Download Doc', user_val: req.user.username });
});

module.exports = router;
