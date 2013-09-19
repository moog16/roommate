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

      user.questions.push({
        questionId: questionReq.questionId,
        answer: questionReq.answer,
        accepts: questionReq.accepts,  //make unique
        importance: questionReq.importance
      });

      console.log(user.questions);
      // console.log(user);
      user.save(function(err,u) {
        if(err) {
          throw err;
        } else {
          res.send('confirmed');
        }
      });
    }
  });
};