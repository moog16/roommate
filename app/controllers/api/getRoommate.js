var  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.info = function(req, res) {
  User.findOne({
    'facebook.id': req.user.facebook.id
  }, function(err, currentUser) {
    if(err) {
      throw err;
    } else if(!currentUser) {
      res.redirect('/signup');
    } else {
      User.find({
        'facebook.id': {$nin: currentUser.roommatesSeen}
      }, function(err, roommates) {
        if(err) {
          throw err;
        } else if(!roommates) {
          res.send('so sorry, no one wants to live with you');
        } else{
          res.send(roommates);
        }
      });
    }
  });
};
