const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const strategies = {};

strategies.SignIn = new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true      
    },
    async function (req, login, password, done) {
        try{
            const principal = await User.findOne({
                login,
                password
            });
            if (principal){
                return done(null, principal);
            }else{
                return done(false);
            }
        }catch (e) {
            return done(e);
        }
    }
);

strategies.SignUp = new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true      
    },
    async function (req, login, password, done) {
        try{
            const alreadyExists = await User.findOne({
                login
            });
            if(alreadyExists){
                return done(false, null)
            }else{
               const user = await User.create(req.body);
               return done(null, user);
            }
        }catch(e){
            return done(e);
        }
    }
);
            



module.exports = strategies;
