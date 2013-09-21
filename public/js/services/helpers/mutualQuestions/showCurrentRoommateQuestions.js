angular.module('rm.mutualQuestions.service', [])
.factory("mutualQuestions", ['$location', function($location) {

  var findRMIndex = function(roommateVars) {
    var roommateFacebookId = Object.keys($location.search())[0];
    //finds the common questions ->mutualRMInfo[rmIndex].qIds 
    //&& RMVars.roommates are symmetical
    rmIndex = -1;
     _.find(roommateVars.roommates, function(rm) {
      rmIndex++;
      return rm.facebook.id === roommateFacebookId;
    });
    return rmIndex;
  };

  var findRMInterest = function(roommateVars) {
    var roommateFacebookId = Object.keys($location.search())[0];
    return _.find(roommateVars.roommates, function(rm) {
      return rm.facebook.id === roommateFacebookId;
    });
  };

  var rmCommonQuestions = function(roommateVars) {
    var rmInterest = findRMInterest(roommateVars);
    var rmIndex = findRMIndex(roommateVars);
    return _.filter(rmInterest.questions, function(rmQA) {
      return _.indexOf(roommateVars.mutualRoommateInfo[rmIndex].questionIds, rmQA.questionId) > -1;
    });
  };

  var userCommonQuestions = function(roommateVars) {
    var rmIndex = findRMIndex(roommateVars);
    return _.filter(roommateVars.user.questions, function(rmQA) {
      return _.indexOf(roommateVars.mutualRoommateInfo[rmIndex].questionIds, rmQA.questionId) > -1;
    });
  };

  return {
    rm: rmCommonQuestions,
    user: userCommonQuestions,
    rmIndex: findRMIndex
  };

}]);