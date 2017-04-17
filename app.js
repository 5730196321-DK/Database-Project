var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');

var index_std = require('./routes/index_std');
var profile_std = require('./routes/profile_std');
var grade_std = require('./routes/grade_std');
var enroll_std = require('./routes/enroll_std');
var activity_std = require('./routes/activity_std');
var intern_std = require('./routes/intern_std')
var search_std = require('./routes/search_std');

var index_prof = require('./routes/index_prof');
var profile_prof = require('./routes/profile_prof');
var course_prof = require('./routes/course_prof');
var course_manage_prof = require('./routes/course_manage_prof');
var advisee_prof = require('./routes/advisee_prof');
var project_prof = require('./routes/project_prof');
var download_prof = require('./routes/download_prof')

var index_staff = require('./routes/index_staff');
var profile_staff = require('./routes/profile_staff');
var upload_staff = require('./routes/upload_staff');
var download_staff = require('./routes/download_staff');
var monitor_staff = require('./routes/monitor_staff');
var search_staff = require('./routes/search_staff')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/about', about);

app.use('/index_std', index_std);
app.use('/profile_std', profile_std);
app.use('/grade_std', grade_std);
app.use('/enroll_std', enroll_std);
app.use('/activity_std', activity_std);
app.use('/search_std', search_std);
app.use('/intern_std', intern_std);

app.use('/index_prof', index_prof);
app.use('/profile_prof', profile_prof);
app.use('/course_prof', course_prof);
app.use('/course_manage_prof', course_manage_prof);
app.use('/advisee_prof', advisee_prof);
app.use('/project_prof', project_prof);
app.use('/download_prof', download_prof);

app.use('/index_staff', index_staff);
app.use('/profile_staff', profile_staff);
app.use('/upload_staff', upload_staff);
app.use('/download_staff', download_staff);
app.use('/monitor_staff', monitor_staff);
app.use('/search_staff', search_staff);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
