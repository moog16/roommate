var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('underscore');

module.exports = function(req, res) {
  User.findOne({
    'facebook.id': req.user.facebook.id
  }, function(err, user) {
      if(err) {
        throw err;
      } else if(!user) {
        res.redirect('/signup');
      } else {
        if(req.body.location !== undefined) {
          user.preferences.location = req.body.location;
        }
        if(req.body.durationStay !== undefined) {
          user.preferences.dwellingType = req.body.dwellingType;
        }
        user.preferences.budget = user.preferences.budget && req.body.budget;
        user.preferences.durationStay = user.preferences.durationStay && req.body.durationStay;

        user.save();
        res.send('confirm');
      }
    });
};