var mongoose = require('mongoose'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = mongoose.model('User'),
  config = require('./config');


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
      User.findOne({
        'facebook.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          var userProfile = profile._json;
          userProfile['accessToken'] = accessToken;
          userProfile['refreshToken'] = refreshToken;
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            facebook: userProfile
          });
          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};