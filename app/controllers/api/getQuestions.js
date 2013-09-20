var  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Question = mongoose.model('Question'),
  _ = require('underscore');

exports.andAnswers = function(req, res) {
  User.findOne({
    'facebook.id' : req.user.facebook.id
  }, function(err, user) {
    if(err) {
      throw err;
    } else if(!user) {
      res.redirect('/signup');
    } else {
      var questionIds = [];
      for(var i=0; i<user.questions.length; i++) {
        questionIds.push(user.questions[i].questionId);
      }
      questionIds = _.uniq(questionIds);
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

exports.fromUser = function(req, res) {
  // var questionIds = [];
  // for(var i=0; i<req.body.length; i++) {
  //   questionIds.push(req.body[i].questionId);
  // }
  // Question.find({
  //   _id: {$in: questionIds}
  // }, function(err, questions) {
  //   if(err) {
  //     throw err;
  //   } else {
  //     res.send(questions);
  //   }
  // });
};