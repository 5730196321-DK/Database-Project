var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search_info_prof', { title: 'Search', user_val: req.user.username, notfound_str: '' });
});

module.exports = router;
