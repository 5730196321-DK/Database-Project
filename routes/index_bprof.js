var express = require('express');
var router = express.Router();

// mySQL connection
var app = require('../app');
var mysql = require('mysql');
var connection = mysql.createConnection(app.options);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user.username.length > 3) { res.redirect('/unauthorized'); return; }
  connection.query(
    'SELECT fname AS info FROM Professor WHERE pab=\'' + req.user.username
  + '\' UNION ALL SELECT sname FROM Professor WHERE pab=\'' + req.user.username
  + '\' UNION ALL SELECT Faculty.fname FROM Faculty JOIN Professor ON Professor.fid = Faculty.fid WHERE Professor.pab = \'' + req.user.username
  + '\' UNION ALL SELECT dname FROM Department JOIN Professor ON Professor.did = Department.did WHERE Professor.pab = \'' + req.user.username
  + '\' UNION ALL SELECT COUNT(*) FROM Teach JOIN Course ON Teach.cid = Course.cid  WHERE Teach.pab = \'' + req.user.username
  + '\' UNION ALL SELECT COUNT(*) FROM (Student JOIN Student_Status ON Student.sid = Student_Status.sid) JOIN Advisor ON Advisor.sid = Student.sid WHERE pab = \'' + req.user.username
  + '\' UNION ALL SELECT COUNT(*) FROM (Project JOIN Control_Project ON Project.pjid = Control_Project.pjid) JOIN Undergraduate ON Undergraduate.pjid = Project.pjid WHERE pab = \'' + req.user.username
  + '\' UNION ALL SELECT COUNT(*) FROM Student WHERE syear = 2016 UNION ALL SELECT COUNT(*) FROM Student WHERE syear = 2015 UNION ALL SELECT COUNT(*) FROM Student WHERE syear = 2014 UNION ALL SELECT COUNT(*) FROM Student WHERE syear = 2013 UNION ALL SELECT COUNT(*) FROM Student WHERE syear < 2013'
  + ' UNION ALL SELECT COUNT(*) FROM Student_Status WHERE probation = \'Y\' UNION ALL SELECT COUNT(*) FROM Student_Status WHERE leaving = \'Y\' UNION ALL SELECT COUNT(*) FROM Student_Status WHERE studyabroad = \'Y\'' + 'UNION ALL SELECT COUNT(*) FROM Department_Leader WHERE pab = \''+ req.user.username +'\';',
  function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }
    if (results[15].info < 1) {
      res.redirect('/index_prof'); return;
    }
    res.render('index_bprof', {
      title: 'Home',
      user_val: req.user.username,
      results: results,
      year1: results[7].info,
      year2: results[8].info,
      year3: results[9].info,
      year4: results[10].info,
      year5: results[11].info,
      probation: results[12].info,
      leaving: results[13].info,
      studyabroad: results[14].info
    });
  })
});

module.exports = router;
