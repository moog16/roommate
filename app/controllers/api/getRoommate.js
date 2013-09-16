var  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.info = function(req, res) {
  User.find({
    
  }, function(err, users) {
    if(err) {
      throw err;
    } else if(!users) {
      res.redirect('/signup');
    } else {
      res.send(users);
    }
  });
};
