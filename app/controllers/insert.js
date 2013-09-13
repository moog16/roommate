var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  api = require('./api.js');
  
exports.user = function(accessToken, refreshToken, profile, done) {
  User.findOne({
    'facebook.id': profile.id
  }, function(err, user) {
    if (err) {
      return done(err);
    } else {
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
        });
      } 
      api.api(accessToken, refreshToken, profile, done);
      return done(err, user);
    }
  });
};