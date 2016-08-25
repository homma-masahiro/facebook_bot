var express  = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var fs     = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

passport.use(new Strategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    passport.session.accessToken = accessToken;
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.send(passport.session.accessToken);
  });

app.listen(3000);
