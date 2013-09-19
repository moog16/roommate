var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('underscore');

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
      var answerAccepts = _.uniq(questionReq.accepts);
      user.questions.push({
        questionId: questionReq.questionId,
        answer: questionReq.answer,
        accepts: answerAccepts,
        importance: questionReq.importance
      });
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