var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');

var app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use (passport.initialize())
app.use (passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/auth' , passport.authenticate('google', { scope:
        [ 'email', 'profile' ]
}));
// Auth Callback
app.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
    }));

// Success
app.get('/auth/callback/success' , (req , res) => {
    if(!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user.email);
});

// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

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


app.get('/', (req, res) => res.send(`Welcome ${req.user.displayName}!`))

const isLoggedIn = require('./Middleware/auth')
app.get('/', isLoggedIn,(req, res) => res.send(`Welcome ${req.user.displayName}!`))
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = app;
