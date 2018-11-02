const passport = require('passport');
const User = require('../models/User');
const LocalStrategies = require('./PassportLocalStrategy');


passport.serializeUser(function (user, done){
    done(null, user._id);
});
passport.deserializeUser(async function (id, done){
    try{
      const user = await User.findById(id);
        done(null, user);
    } catch (e){
        done(e);
    }
});
passport.use('local.signin', LocalStrategies.SignIn);
passport.use('local.signup', LocalStrategies.SignUp);

module.exports = passport;