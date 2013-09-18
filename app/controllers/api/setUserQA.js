var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(req, res) {
  var questionReq = req.body;

  User.findOne({
    'facebook.id': req.user.facebook.id
  }, function(err, user) {
    if(err) {
      throw err;
    } else if(!user) {
      res.redirect('/signup');
    } else {
      user.name = "not me";
      user.questions[questionReq.questionId] = {
        answer: questionReq.answer,
        accepts: questionReq.accepts,  //unique
        importance: questionReq.importance
      };
      console.log(user.questions);
      console.log(user);
      user.save(function(err,u) {
        if(err) {
          throw err;
        } else {
          // console.log(u);
          res.send('confirmed');
        }
      });
    }
  });
};