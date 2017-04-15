var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var about = require('./routes/about');
var account = require('./routes/account');
var index_std = require('./routes/index_std');
var account_std = require('./routes/account_std');
var grade_std = require('./routes/grade_std');
var enroll_std = require('./routes/enroll_std');
var activity_std = require('./routes/activity_std');
var search_std = require('./routes/search_std');

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
app.use('/login', login);
app.use('/about', about);
app.use('/account', account);
app.use('/index_std', index_std);
app.use('/account_std', account_std);
app.use('/grade_std', grade_std);
app.use('/enroll_std', enroll_std);
app.use('/activity_std', activity_std);
app.use('/search_std', search_std);

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
