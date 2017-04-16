var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload_staff', { title: 'Upload Helper' });
});

module.exports = router;
