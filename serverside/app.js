var createError = require('http-errors');
var hbs = require('express-handlebars');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
//Connecting to Model
var User =  require('./models/user');

//Setup mongoose connection
mongoose.connect('mongodb://olatmm82:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-klo7p.mongodb.net:27017,cluster0-shard-00-01-klo7p.mongodb.net:27017,cluster0-shard-00-02-klo7p.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
{
  useNewUrlParser: true
 
})
.then(()=> console.log('MongoDB is Connected'))
.catch(err =>console.log(err));

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname + '/views/layouts', partialsDir:__dirname + '/views/partials/' }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Setting up static files
app.use(express.static(path.join(__dirname, 'public/bower_components/semantic/dist/')));
app.use(express.static(path.join(__dirname, 'public/bower_components/semantic/dist/components/')));
app.use(express.static(path.join(__dirname, 'public/bower_components/jquery/dist/')));
app.use(express.static(path.join(__dirname, 'public/stylesheets/')));
app.use(express.static(path.join(__dirname, 'public/images/')));
app.use(express.static(path.join(__dirname, 'public/javascripts/')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
