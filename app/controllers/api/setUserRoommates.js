var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('underscore');

module.exports = function(req, res) {
  var roommate = req.body.roommate;
  User.findOne({
    'facebook.id': req.user.facebook.id
  }, function(err, user) {
      if(err) {
        throw err;
      } else if(!user) {
        res.redirect('/signup');
      } else {
        if(req.body.type === 'roommatesFavorite') {
          if(!_.contains(user.roommatesFavorite, roommate.facebook.id)) {
            user.roommatesFavorite.push(roommate.facebook.id);
          }
        }
        if(req.body.type === 'roommatesSeen' || req.body.type === 'roommatesFavorite') {
          if(!_.contains(user.roommatesSeen, roommate.facebook.id)) {
            user.roommatesSeen.push(roommate.facebook.id);
          }
        }
        user.save();
        res.send('confirm');
      }
    });
};
