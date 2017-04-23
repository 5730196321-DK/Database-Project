// !!!!!!!!!!!!!!!!!! Setup mySQL Password Here !!!!!!!!!!!!!!!!!!!!!
var options = {
    host: 'localhost',
    user: 'root',
    password: '12761',
    database: 'DB_Project'
};
exports.options = options;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Authentication
SALT_WORK_FACTOR = 12;
var user = require('./routes/user');
var db = require('./models')
var passport = require('passport')
var passportConfig = require('./config/passport')
var session = require('express-session');
var application = require('./routes/application');
var unauthorized = require('./routes/unauthorized');
var MySQLStore = require('express-mysql-session')(session);

var index = require('./routes/index');
var about = require('./routes/about');
var login_prof_f = require('./routes/login_prof_f');
var login_staff = require('./routes/login_staff')
var login_staff_f = require('./routes/login_staff_f');

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
app.use(session({ key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Session store
var sessionStore = new MySQLStore(options);

// Student Authenticate Checker
app.get('/index_std', application.IsAuthenticated, index_std);
app.get('/profile_std', application.IsAuthenticated, profile_std);
app.get('/grade_std', application.IsAuthenticated, grade_std);
app.get('/enroll_std', application.IsAuthenticated, enroll_std);
app.get('/activity_std', application.IsAuthenticated, activity_std);
app.get('/search_std', application.IsAuthenticated, search_std);
app.get('/intern_std', application.IsAuthenticated, intern_std);

// Professor Authenticate Checker
app.get('/index_prof', application.IsAuthenticated, index_prof);
app.get('/profile_prof', application.IsAuthenticated, profile_prof);
app.get('/course_prof', application.IsAuthenticated, course_prof);
app.get('/course_manage_prof', application.IsAuthenticated, course_manage_prof);
app.get('/advisee_prof', application.IsAuthenticated, advisee_prof);
app.get('/project_prof', application.IsAuthenticated, project_prof);
app.get('/download_prof', application.IsAuthenticated, download_prof);

// Staff Authenticate Checker
app.get('/index_staff', application.IsAuthenticated, index_staff);
app.get('/profile_staff', application.IsAuthenticated, profile_staff);
app.get('/upload_staff', application.IsAuthenticated, upload_staff);
app.get('/download_staff', application.IsAuthenticated, download_staff);
app.get('/monitor_staff', application.IsAuthenticated, monitor_staff);
app.get('/search_staff', application.IsAuthenticated, search_staff);

// Authentication Listener
app.post('/authenticate_prof',
  passport.authenticate('local',{
	successRedirect: '/index_prof',
	failureRedirect: '/login_prof_f',
  })
);

app.post('/authenticate_staff',
  passport.authenticate('local',{
	successRedirect: '/index_staff',
	failureRedirect: '/login_staff_f',
  })
);

// Logout Listener
app.get('/logout', application.destroySession);

app.use('/', index);
app.use('/index', index);
app.use('/user', user);
app.use('/about', about);
app.use('/unauthorized', unauthorized);
app.use('/login_prof_f', login_prof_f);
app.use('/login_staff_f', login_staff_f);

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
app.use('/login_staff', login_staff);

// Crate admin default user
db
  .sequelize
  .sync()
  .complete(function(err){
	if (err) {
		throw err[0]
	} else {
		db.User.find({where: {username: 'PFS'}}).success(function (user){
			if (!user) {
				db.User.build({username: 'PFS', password: 'ggez'}).save();
			};
		});
    db.User.find({where: {username: 'BPF'}}).success(function (user){
			if (!user) {
				db.User.build({username: 'BPF', password: 'ggez'}).save();
			};
		});
    db.User.find({where: {username: '0000000000007'}}).success(function (user){
			if (!user) {
				db.User.build({username: '0000000000007', password: 'ggez'}).save();
			};
		});
	}
})


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
