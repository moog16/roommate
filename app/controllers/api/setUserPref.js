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
        user.preferences.location = req.body.location;
        user.preferences.budget = req.body.budget;
        user.preferences.dwellingType = req.body.dwellingType;
        user.preferences.durationStay = req.body.durationStay;
        user.save();
        res.send('confirm');
      }
    });
};