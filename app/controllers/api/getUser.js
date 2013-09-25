var  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.info = function(req, res) {
  User.findOne({
    'facebook.id' : req.user.facebook.id
  }, function(err, user) {
    if(err) {
      throw err;
    } else {
      res.send(user);
    }
  });
};

exports.userArray = function(req, res) {
  User.find({
   'facebook.id': {$in: req.body}
  }, function(err, users) {
    if(err) {
      throw err;
    } else {
      res.send(users);
    }
  });
};
