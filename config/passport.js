var FacebookStrategy = require('passport-facebook').Strategy,
  insert = require('../app/controllers/insert.js'),
  config = require('./config'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findOne({
        _id: id
      }, function(err, user) {
        done(err, user);
      });
  });

  passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      insert.user(accessToken, refreshToken, profile, done);
    }
  ));
};