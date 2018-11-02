const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const User = require('./models/User');
require('./config/passport');
const passport = require('passport');

mongoose.connect('mongodb://localhost/pasportjs', { useNewUrlParser: true });

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret:'asd'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/' , async (req, res, next) => {
    const responseObject = {};
    responseObject.principal = req.user;
    responseObject.showForms = !!req.user;
    responseObject.users = await User.find({})
    res.render('index', responseObject);
});
app.post('/login', 
    passport.authenticate('local.signin', {failureRedirect: '/'}),
    (req, res, next) => {
        res.redirect('/');
    }
);
app.post('/register', 
    passport.authenticate('local.signup', {failureRedirect: '/'}),
    (req, res, next) => {
        res.redirect('/');
    }
);

app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

app.listen(3000);