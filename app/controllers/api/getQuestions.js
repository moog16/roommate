var  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Question = mongoose.model('Question');

exports.andAnswers = function(req, res) {
  User.findOne({
    'facebook.id' : req.user.facebook.id
  }, function(err, user) {
    if(err) {
      throw err;
    } else if(!user) {
      res.redirect('/signup');
    } else {
      var questionIds = Object.keys(user.questions)
      Question.find({
        _id: {$nin: questionIds}
      }, function(err, questions) {
        if(err) {
          throw err;
        } else if(!user) {
          res.redirect('/signup');
        } else {
          res.send(questions);
        }
      });
    }
  });
};
