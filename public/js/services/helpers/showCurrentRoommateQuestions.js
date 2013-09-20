angular.module('rm.mutualQuestions.service', [])
.factory("mutualQuestions", ['$location', function($location) {

  var findRMInterest = function(roommateVars, rtnVal) {
    var roommateFacebookId = Object.keys($location.search())[0];
    //finds the common questions ->mutualRMInfo[rmIndex].qIds 
    //&& RMVars.roommates are symmetical
    var rmIndex = -1;
    var roommate = _.find(roommateVars.roommates, function(rm) {
      rmIndex++;
      return rm.facebook.id === roommateFacebookId;
    });
    if(rtnVal === 'ind') {
      return rmIndex;
    } else if(rtnVal === 'rm') {
      return roommate;
    }
  };

  var rmCommonQuestions = function(roommateVars) {
    var rmInterest = findRMInterest(roommateVars, 'rm');
    var rmIndex = findRMInterest(roommateVars, 'ind');
    return _.filter(rmInterest.questions, function(rmQA) {
      return _.indexOf(roommateVars.mutualRoommateInfo[rmIndex].questionIds, rmQA.questionId) > -1;
    });
  }

  var userCommonQuestions = function(roommateVars) {
    var rmIndex = findRMInterest(roommateVars, 'ind');
    return _.filter(roommateVars.user.questions, function(rmQA) {
      return _.indexOf(roommateVars.mutualRoommateInfo[rmIndex].questionIds, rmQA.questionId) > -1;
    });
  };

  return {
    rm: rmCommonQuestions,
    user: userCommonQuestions
  };

}]);