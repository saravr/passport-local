var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var http = require('http');
var morgan = require('morgan');

var app = express();

app.use(express.static(__dirname + '/public'));
//app.use(express.cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan('combined'));

passport.serializeUser(function(user, done) {
    done(null, 'foo');
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    done(null, 'foo');
});

passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        if (username === 'foo' && password === 'bar') {
            done(null, 'foo');
        } else {
            done(null, false, {message : 'Bad username or password'});
        }
    }
));

app.get('/', function(req, res) {
    res.redirect(302, '/login.html');
});

app.post('/login', passport.authenticate('local-login', {
             successRedirect: '/login-success.html',
             failureRedirect: '/login-failure.html'
         }));

var port = 3001;
app.listen(port);
console.log('Listening on port ' + port + ' ...');
