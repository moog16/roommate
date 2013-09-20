var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Question = mongoose.model('Question'),
    _ = require('underscore');

module.exports = function(req, res) {
  var questionReq = req.body;
  if(questionReq.answer !== null && questionReq.importance !== null && questionReq.accepts.length >= 1) {
    User.findOne({
      'facebook.id': req.user.facebook.id
    }, function(err, user) {
      if(err) {
        throw err;
      } else if(!user) {
        res.redirect('/signup');
      } else {
        Question.findOne({
        }, function(err, question) {
          if(err) {
            throw err;
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
      }
    });
  } else {
    res.send('information not filled out');
  }
};