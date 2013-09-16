var  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.info = function(req, res) {
  User.findOne({
    'facebook.id' : req.user.facebook.id
  }, function(err, user) {
    if(err) {
      throw err;
    } else if(!user) {
      res.redirect('/signup');
    } else {
      res.send(user.facebook);
    }
  });
};
