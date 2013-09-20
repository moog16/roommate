angular.module('rm.roommateHelpers.service', [])
.factory("intersection", function() {

  var objects = function(array) {
    var slice = Array.prototype.slice; // added this line as a utility
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        //return _.indexOf(other, item) >= 0;
        return _.any(other, function(element) { return _.isEqual(element, item); });
      });
    });
  };

  var question = function(roommate, user) {
    var userQuestionIds = [];
    var roommateQuestionIds = [];
    for(var i=0; i<user.length; i++) {
      userQuestionIds.push(user[i].questionId);
    }
    for(var j=0; j<roommate.length; j++) {
      roommateQuestionIds.push(roommate[j].questionId);
    }
    return _.intersection(userQuestionIds, roommateQuestionIds);
  };

  return {
    objects: objects,
    question: question
  };
});